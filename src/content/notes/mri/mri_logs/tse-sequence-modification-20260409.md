---
title: "TSE序列修改日志：梯度衔接问题排查"
date: "2026-04-09"
category: "MRI / 实验日志"
excerpt: "修改TSE序列，添加Spoiler收尾梯度和激发脉冲层选梯度时遇到梯度幅值超限报错，以及波形衔接处出现明显瑕疵的排查过程。"
---

## 修改TSE序列
### 添加Spoiler收尾梯度
操作：
在重复最后添加Gx,Gz方向的梯度

方案：直接使用add.Gradient进行合并
### 添加激发脉冲层选梯度
操作：
尝试将rf_ref从硬脉冲替换成Sinc脉冲，并添加层选梯度

报错：
```
Error using mr.makeTrapezoid (line 142)
Amplitude violation (104%)
```

分析：
为了在 1ms 的时间内实现指定的层厚（3mm）和带宽（TimeBwProduct=4），所需的梯度强度超过了系统限制（30 mT/m）的 104%

解决方案：
将RF的duration调整到3.0ms

现象：
<img src="/images/tse-gradient-waveform-20260409.png" alt="TSE序列梯度波形" style="max-width:100%;border-radius:12px;" />
如图，在梯度的衔接处会有明显的瑕疵

分析原因：
目前的写法（方案A）是将三个独立的梯形梯度（gsp_1, gz_ref1, gsp_2）简单地叠加。虽然时间上对齐了，但由于每个梯形都有自己的上升沿（Ramp-up）和下降沿（Ramp-down），在它们相交的地方，硬件可能无法在极短时间内完成从一个幅值到另一个幅值的平滑过渡，从而产生波形畸变或违规。

解决方案：

> [!NOTE]
> 方案的核心是利用 `mr.makeExtendedTrapezoid` 系列函数，手动构造一个**平滑的、连续的**复合 Z 轴梯度，而不是简单的叠加。
>
> 1. **分块构造 (Extended Trapezoid Area)**：
>     - 使用 `mr.makeExtendedTrapezoidArea` 分别创建"前部"和"后部"。
>     - **前部**：从 00 开始，上升到片选高度 GsliceGslice ，并包含需要的 Spoiler 1 面积。
>     - **后部**：从片选高度 GsliceGslice 开始，下降到 00，并包含需要的 Spoiler 2 面积。
> 2. **物理衔接 (Composite Waveform)**：
>     - 利用 `mr.makeExtendedTrapezoid` 将前部的波形、片选梯度的平坦段（Flat duration）和后部的波形缝合。
>     - 这样产生的梯度在上升到最高点后，会直接保持在片选平台上，结束后再从平台平滑下降，消除了中间多余的下降和再上升过程。
> 3. **精确对齐 RF 中心**：
>     - 因为前部 Spoiler 占据了一定时间，需要重新计算并更新 `rf_ref.delay`，使其精确对齐到复合梯度的平坦段（即片选开始时刻）。
> 4. **修正时间核算**：
>     - 由于复合梯度的形状改变，其总时长和中心点位移会发生变化，需要同步更新 TE/2TE/2 相关的 `Delay` 计算公式。

具体实现：
```
%创建180°重聚焦RF脉冲和复合片选梯度 (使用 Extended Trapezoid 实现平滑连接)

% 计算重聚焦脉冲所需的 Slice Selection 梯度幅值

[~, g_ref_temp] = mr.makeSincPulse(pi, 'system', system, 'Duration', 3e-3, 'SliceThickness', SliceThickness);

g_ref_amp = g_ref_temp.amplitude;




% 180脉冲1的复合梯度

sp_area1 = 4/SliceThickness + gzr.area;

g_ref1_pre = mr.makeExtendedTrapezoidArea('z', 0, g_ref_amp, sp_area1, system);

g_ref1_post = mr.makeExtendedTrapezoidArea('z', g_ref_amp, 0, 4/SliceThickness, system);

gz_ref1_combined = mr.makeExtendedTrapezoid('z', 'times', [g_ref1_pre.tt g_ref1_post.tt + g_ref1_pre.shape_dur + 3e-3], ...

    'amplitudes', [g_ref1_pre.waveform g_ref1_post.waveform], 'system', system);



% 180脉冲2的复合梯度

sp_area2 = 4/SliceThickness;

g_ref2_pre = mr.makeExtendedTrapezoidArea('z', 0, g_ref_amp, sp_area2, system);

g_ref2_post = mr.makeExtendedTrapezoidArea('z', g_ref_amp, 0, 4/SliceThickness, system);

gz_ref2_combined = mr.makeExtendedTrapezoid('z', 'times', [g_ref2_pre.tt g_ref2_post.tt + g_ref2_pre.shape_dur + 3e-3], ...

    'amplitudes', [g_ref2_pre.waveform g_ref2_post.waveform], 'system', system);
```

### 添加Spoil梯度收尾
操作：添加spoil梯度收尾，重新核算TR延迟计算

### 找出翻转脉冲没有完全对齐的原因
问题1：rf+gz时间描述不严谨（后被验证不是主要原因）
原代码：
```
Delay_TE0 = TE/2 - rf_ex.center - rf_ex.ringdownTime - rf_ref1.delay - rf_ref1.center;
```
这里假设 90° 脉冲块在 `rf_ex.center + rf_ex.ringdownTime` 之后立即结束。但实际上，`seq.addBlock(rf_ex, gz)` 的持续时间是 `max(rf_ex.duration + rf_ex.ringdownTime, gz.duration)`

修改代码：
```
excitation_duration = mr.calcDuration(rf_ex, gz);

Delay_TE0 = TE/2 - (excitation_duration - rf_ex.center) - rf_ref1.delay - rf_ref1.center;
```

### 验算时序关系
验算公式：
```
% 时序关系验证计算

fprintf('\n--- 序列时序验算结果 ---\n');

% 1. rfex-rfref = rfref-adc (第一回波对称性)
T1 = (excitation_duration - (rf_ex.delay + rf_ex.center)) + mr.calcDuration(gx_pre, delay_TE0) + (rf_ref1.delay + rf_ref1.center);

T2 = (mr.calcDuration(rf_ref1, gz_ref1_combined, delay_TE1, gy_pre) - (rf_ref1.delay + rf_ref1.center)) + ...

     (adc.delay + adc.dwell * Nx / 2);

fprintf('1. 第一回波对称性:\n   rfex -> rfref: %.6f s (目标: %.6f s)\n   rfref -> adc中心: %.6f s (目标: %.6f s)\n', T1, TE/2, T2, TE/2);

% 2. adc-rfref = rfref-adc (回波间对称性)
T3 = (mr.calcDuration(gx_ref, adc, delay_TE3, gy_post) - (adc.delay + adc.dwell * Nx / 2)) + ...

     (rf_ref2.delay + rf_ref2.center);

T4 = (mr.calcDuration(rf_ref2, gz_ref2_combined, delay_TE2, gy_pre) - (rf_ref2.delay + rf_ref2.center)) + ...

     (adc.delay + adc.dwell * Nx / 2);

fprintf('2. 回波对对称性:\n   adc中心 -> 下一rfref: %.6f s (目标: %.6f s)\n   rfref -> 下一adc中心: %.6f s (目标: %.6f s)\n', T3, TE/2, T4, TE/2);

% 3. rfex-rfex = TR (重复时间验证)
% 计算一个完整周期的总时间
total_tr_time = excitation_duration + mr.calcDuration(gx_pre, delay_TE0) + ...

                 mr.calcDuration(rf_ref1, gz_ref1_combined, delay_TE1, gy_pre) + ...

                 mr.calcDuration(gx_ref, adc, delay_TE3, gy_post) + ...

                 (necho-1) * (mr.calcDuration(rf_ref2, gz_ref2_combined, delay_TE2, gy_pre) + ...

                             mr.calcDuration(gx_ref, adc, delay_TE3, gy_post)) + ...
                 spoil_duration + Delay_TR;
fprintf('3. TR 验证:\n   总周期时长: %.6f s (目标 TR: %.6f s)\n', total_tr_time, TR);
```

验算结果：
```
--- 序列时序验算结果 ---
1. 第一回波对称性:
   rfex -> rfref: 0.010000 s (目标: 0.010000 s)
   rfref -> adc中心: 0.010540 s (目标: 0.010000 s)
2. 回波对对称性:
   adc中心 -> 下一rfref: 0.010000 s (目标: 0.010000 s)
   rfref -> 下一adc中心: 0.010000 s (目标: 0.010000 s)
3. TR 验证:
   总周期时长: 0.200540 s (目标 TR: 0.200000 s)
```
发现0.5ms的误差仍然没有得到解决，由此得出问题1：rf+gz时间描述不严谨并不是导致时间误差的主要原因。

### 寻找0.5ms误差的原因
猜想：计算delay漏掉了adc.delay
方法：添加adc.delay,运行。查看Matlab中间变量，查看物理量
```
adc.dwell: 0.0000390625 s
gx_ref.riseTime: 0.0000200000 s
adc.delay (基于 riseTime): 0.0000200000 s
```
分析：这几个值的数量级太小，排除adc未加延迟。

猜想：gy靠右对齐导致block延迟
代码：
```
gy_pre = mr.makeTrapezoid('y','Area',phase_area(i*necho+j+1),'Duration',pe_duration,'Delay',mr.calcDuration(Delay_TE1)-pe_duration,'system',system);
...中间代码略...
seq.addBlock(rf_ref1,gz_ref1_combined,delay_TE1,gy_pre);
```
理论上，gy_pre应该和Delay_TE1同时结束,可能由于pulseq某种对齐机制导致gy_pre的时间比Delay_TE1略长，导致延迟了0.5ms.

验证：
修改代码：
```
gy_pre = mr.makeTrapezoid('y','Area',phase_area(i*necho+j+1),'Duration',pe_duration,'Delay',mr.calcDuration(Delay_TE1)-pe_duration-6e-4,'system',system);
```
验算输出：
```
--- 序列时序验算结果 ---
1. 第一回波对称性:
   rfex -> rfref: 0.010000 s (目标: 0.010000 s)
   rfref -> adc中心: 0.010000 s (目标: 0.010000 s)
2. 回波对对称性:
   adc中心 -> 下一rfref: 0.010000 s (目标: 0.010000 s)
   rfref -> 下一adc中心: 0.010000 s (目标: 0.010000 s)
3. TR 验证:
   总周期时长: 0.200000 s (目标 TR: 0.200000 s)
```
假设成立，问题解决
**0.5ms误差的原因是gy_pre在右对齐时序设计时，gy_pre的时间超过delay_TE1导致的**

### 核算dephase梯度和Spoiler组合梯度面积
操作：核算`gz+g_ref1_pre`严格等于`g_ref1_post`
计算代码：
```
printf('\n--- 梯度面积与时长核算 ---\n');
% 核算 gz 后半段重相梯度与 g_ref1_pre 的总和是否等于 g_ref1_post
% 为了精确核算包含上升沿、平顶、下降沿的任意形状梯度面积：
% Pulseq 的梯形梯度 (Trapezoid) 属性包含 .riseTime, .flatTime, .fallTime
% 下面计算激发中心之后的面积

t_gz_center = rf_ex.delay + rf_ex.center;
gz_duration = mr.calcDuration(gz);

% 计算激发中心之后的时长

t_after_center = gz_duration - t_gz_center;
gz_rewinder_area = gz.amplitude * (gz.flatTime/2 + gz.fallTime/2);
fprintf('gz 重相面积 (激发中心到结束，含下降沿): %.6f 1/m\n', gz_rewinder_area);
fprintf('g_ref1_pre 面积: %.6f 1/m\n', g_ref1_pre.area);
fprintf('总预置面积 (gz_rewinder + g_ref1_pre): %.6f 1/m\n', gz_rewinder_area + g_ref1_pre.area);
fprintf('g_ref1_post 面积: %.6f 1/m\n', g_ref1_post.area);
fprintf('面积差值: %.10f 1/m\n', (gz_rewinder_area + g_ref1_pre.area) - g_ref1_post.area);
```

现象：
```
--- 梯度面积与时长核算 ---
gz 重相面积 (激发中心到结束，含下降沿): 682.222222 1/m
g_ref1_pre 面积: 651.111111 1/m
总预置面积 (gz_rewinder + g_ref1_pre): 1333.333333 1/m
g_ref1_post 面积: 1333.333333 1/m
面积差值: -0.0000000296 1/m
```
分析：两部分面积在当前精度下完全相等
