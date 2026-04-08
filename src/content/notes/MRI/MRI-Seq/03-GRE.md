---

title: '03 GRE'
date: '2026-03-26'
category: 'MRI / MRI Seq'
excerpt: |
  在正式Gx梯度之前，我们会施加一个面积为Gx一半的反向梯度。通过这个梯度，我们可以让回波中心正好位于ADC的中心。
---

### 01. Gx准备梯度
在正式$G_x$梯度之前，我们会施加一个面积为$G_x$一半的反向梯度。通过这个梯度，我们可以让回波中心正好位于ADC的中心。


### 02.设计时序
在主程序之前，我们会定义`delayTE`和`delayTR`，这两个延迟是根据预设的TE,TR和信号之间的关系计算出来的。
由于这两个值可能不是机器时间最小单位的整数倍，我们需要进行一个对齐的操作，具体操作如下：
```
time = round(time/seq.gradRasterTime)*seq.gradRasterTime
```

### 03. Spoiler梯度
GRE序列有TR比较短的特点，一般一个重复结束以后横向磁化矢量没有完全衰减。如果不对此处理则会带来对比度混杂和伪影的问题。因此需要通过Spoiler收尾结合RF相位变化联合解决
**设计细节：**
1. x,z方向：一般采取整数倍原梯度场的面积，将k-space轨迹“往外推”
2. y方向：采用和相位编码梯度面积相等、方向相反的梯度，让轨迹在y方向上回到原点
**为什么这么设计：**
为了保证每次观测的初始状态相同。在每次重复中，x,z方向的梯度积分是不变的。但是y方向由于相位编码，面积本身随重复次数改变，因此必须在最后施加反向梯度，这样才能保证y方向梯度积分不变，这样每次重复观测的物理状态才是一致的。




### 04.RF相位变化
在讲解正题之前先补充几个概念：
**什么是RF/ADC的相位**：RF的相位是指在旋转参考系下，我们从哪个角度推磁化矢量。ADC是指在旋转参考系下，我们从哪个角度去收听信号。一般来说，两个的相位是相互配合的，一般情况下相等。
**伪随机**：我们使用伪随机的手段生成一组数，这些数看上去像是随机数，但实际上是按照某种规定的，完全确定的规律分布的。这种分布的好处在于过程可控，在实验中具有很好的可复现性。
**设计细节**：我们让RF的相位满足如下分布：
$$\Phi_i = mod(117\degree(i^2+i+2),360\degree)$$
**为什么这么设计**：117°是黄金分割角，配合i的二次表达式可以让角度以一种看似随机的方式均匀地分散到圆的每一个方向，不产生重叠。其次需要注意，我们一般不让$\Phi_i$为0，所以会+2。

在代码实现上，我们会在每一次重复当中定义一个新的RF脉冲：
```
for i=1:Ny
    % Vary RF phase quasi-randomly
    rand_phase = mod(117*(i^2 + i + 2), 360)*pi/180;
    [rf, gz] = mr.makeSincPulse(alpha*pi/180, 'Duration', 4e-3,...
                                'SliceThickness', 5e-3, ...
                                'apodization', 0.5, ...
                                'timeBwProduct', 4, ...
                                'system', sys, ...
                                'phaseOffset', rand_phase, ...
                                'use', 'excitation');

    seq.addBlock(rf, gz);
    gyPre = mr.makeTrapezoid('y', 'Area', phaseAreas(i), 'Duration', 2e-3);
    seq.addBlock(gxPre, gyPre, gzReph);
    seq.addBlock(mr.makeDelay(delayTE));
    seq.addBlock(gx, adc);
    gyPost = mr.makeTrapezoid('y', 'Area', -gyPre.area, 'Duration', 2e-3);
    % Add spoilers in read and slice and may be in phase
    seq.addBlock(gxPost, gyPost, gzPost);
    seq.addBlock(mr.makeDelay(delayTR));
end
```

### 05.伪扫描（dummy scan）
这是一种在前几个重复只施加磁场，但是不打开ADC的“预热”操作。
根据之前提到的重要前提：mri成像需要保证每次观测的初始状态相同，在前几次重复中分子并没有达到稳态，因此物理性质和后续的重复后一定差异，可能会造成伪影和对比度的问题。因此需要dummycan来进行热机。
**代码实现**
我们通过定义负数的索引来区分实际扫描和伪扫描：
```
for i=-30:Ny % dummy scans
    if (i>0) % negative or zero index -- dummy scans

        gyPre = mr.makeTrapezoid('y', 'Area', phaseAreas(i), 'Duration', 2e-3);

    else

        gyPre = mr.makeTrapezoid('y', 'Area', 0, 'Duration', 2e-3);

    end
end
```

### 06.整体程序设计思路
1. 参数定义，主要包括：fov,slicethickness,Nx,Ny,TE,TR,alpha
2. 定义系统极限，定义系统
3. 定义重要梯度的面积，时长，形状，ADC的时长，PhaseArea
4. 根据时序要求定义DelayTE,DelayTR
5. 主程序循环
- 在遇到不确定的地方，可以使用断言函数，确保运作正确

