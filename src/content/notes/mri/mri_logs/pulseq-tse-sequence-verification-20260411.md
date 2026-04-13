---
title: "实验设计："
date: "2026-04-11"
category: "MRI / 实验日志"
excerpt: "配置西门子pulseq环境，采用多种TSE序列进行重建实验，记录了相位编码重排与TR过短导致Aliasing问题的排查过程。"
---

实验设计：
1. 配置西门子pulseq环境
2. 采用两种水模运行如下序列
	1. TSE_Baseline
	2. TSE_Centric
	3. TSE_Manual_Centric
	4. TSE_Manual_Interleaved
	5. TSE_Manual_Sequential

实验记录：
1. Pulseq不具有实时重建功能
2. 通用重建算法重建遇到如下现象：
	- TSE_Manual_Sequential重建成功，经学长核对证明出现经典Artifact (具体叫什么我还不清楚，需查阅资料研究)
	- 其他序列均重建失败，从重建结果可以推测：可能是重建算法和pulseq导出的.dat文件不完全适配，需要后续对相位编码采样顺序进行重排

重建：
1. 解决重建失败问题：
		猜测是PE方向排列顺序问题，增加重排代码
```
def reorder_kspace(kspace, reorder_index):
    """
    对 K 空间矩阵的行 (n_line) 进行重排。
    参数:
        kspace: 4D numpy 数组 [n_part, n_channel, n_line, n_column]
                目前是按采集时间先后排列的。
        reorder_index: 一维数组/列表。
                       索引 (t): 代表采集时间的第 n 次。
                       数值 (s): 代表在空间中从上往下数的第几行位置。
    返回:
        reordered_kspace: 4D numpy 数组，行已放置到正确的几何位置。
    """

    n_part, n_channel, n_line, n_column = kspace.shape
    reordered_kspace = np.zeros_like(kspace)

    # 验证索引长度是否匹配行数
    if len(reorder_index) != n_line:
        raise ValueError(f"索引长度 ({len(reorder_index)}) 必须与 K 空间行数 ({n_line}) 一致")
  
    for t, s in enumerate(reorder_index):
        # 将第 t 次采集到的行放置到空间的第 s 个物理位置
        reordered_kspace[:, :, s, :] = kspace[:, :, t, :]

    return reordered_kspace
```
- 设计思路：只要把pulseq程序设计中生成的采样顺序数组输入这个函数就可以对k-sapce进行PE方向重排。

验证：使用TSE_Centric进行验证，重建成功，证明猜想正确

2. 记录重建结果
	1. TSE_Baseline（圆柱水模）
		![[26.4.11-验证Pulseq_TSE序列-1776080630938.webp|260]]
		<img src="/images/pulseq-20260411/pulseq-20260411-03.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	2. TSE_Centric（圆柱水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-06.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-10.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	3. TSE_Manual_Centric（圆柱水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-11.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-12.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
	4. TSE_Manual_Interleaved（圆柱水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-15.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-16.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	5. TSE_Manual_Sequential（圆柱水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-19.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-22.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	6. TSE_Baseline（球形水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-04.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-05.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
	7. TSE_Centric（球形水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-07.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-09.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	8. TSE_Manual_Centric（球形水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-13.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-14.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		
	9. TSE_Manual_Interleaved（球形水模））
		<img src="/images/pulseq-20260411/pulseq-20260411-17.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-18.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
	10. TSE_Manual_Sequential（球形水模）
		<img src="/images/pulseq-20260411/pulseq-20260411-20.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
		<img src="/images/pulseq-20260411/pulseq-20260411-21.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />

现象总结：Manual序列的扫描结果出现严重的`Aliasing`
分析：检查序列参数和设计，发现Manual序列存在如下几个问题：
1. `TR`过短+`Dummy Scan`缺失（核心问题！）：在`Manual`代码中，设置`TR = 200e-3`,水膜的T1弛豫时间通常在`1000ms-3000ms`,这导致第一个rf打出的回波链信号极其强烈，而后续回波链强度则断崖式下降。`Dummy Scan`的缺失导致原子核在前几次扫描并没有处于稳定的状态。
	假设T1过短是主要原因，结合不同填充现象分析：
	- `Interleaved`由于填充顺序打乱，将信号强度极大的行穿插在信号较小行的中间，产生强烈的周期性幅度调制，很可能产生N重鬼影
	- `Centric`虽然把信号最强的8行（TR1）放在了kspace的中间，但是TR2紧挨TR1，依旧产生了剧烈的跳变，相当于在kspace乘上低通滤波器，容易出现严重的拖影。
	- `Sequential`将强信号（TR1）置于kspace的边缘，低频部分由稳态的弱TR填充，主题图像勉强可见，但是出现了明显的高频条纹。
2. Readout梯度和adc配合问题：在检查pulseq时序图像时发现，运行adc结束的几个采样点时，gx已经将为0。应当学习模块化设计的思想，在adc两侧设置梯度冗余
3. 缺失Gx方向的Spoiler:虽然我在z方向施加了Spoiler梯度，但是在Gx方向没有施加，由于180°重聚焦不完美产生的受激回波也可能影响图像质量。

验证猜想1：
如果是TR1信号过短导致的Aliasing,那么只要在PE方向重排之前，给TR1的信号加上一个0.3的权重，削弱第一个重复的信号强度，理论上这种现象就会得到改善。
方法：
```
    Ny = 128
    necho = 8

    reorder_idx = get_tse_centric_reorder_index(Ny, necho)
    #reorder_idx = get_tse_baseline_reorder_index(Ny, necho)
    #reorder_idx = get_tse_interleaved_reorder_index(Ny, necho)
    print(reorder_idx)

    kspace[:, :, :8, :] *= 0.3
    kspace = reorder_kspace(kspace, reorder_idx)

    # kspace[:, :, :48] = 0 + 0j
    imshow(np.abs(np.squeeze(kspace[0, 1])))
    print(kspace.shape)
    image = ifft2d(kspace)
```
现象对比：
1. Manual_Centric
- 加权之前：
<img src="/images/pulseq-20260411/pulseq-20260411-25.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-26.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />

- 加权之后：
<img src="/images/pulseq-20260411/pulseq-20260411-23.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-24.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />

2. Interleaved
- 加权之前：
<img src="/images/pulseq-20260411/pulseq-20260411-27.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-30.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
- 加权之后：
<img src="/images/pulseq-20260411/pulseq-20260411-28.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-29.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />

3. Sequential
- 加权之前：
<img src="/images/pulseq-20260411/pulseq-20260411-33.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-34.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
- 加权之后：
<img src="/images/pulseq-20260411/pulseq-20260411-35.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />
<img src="/images/pulseq-20260411/pulseq-20260411-36.webp" alt="实验图像" style="max-width:100%;border-radius:12px;" />

总结：通过给TR1信号加权抑制，Centric和Interleaved重建图像质量明显改善，Centric图像质量最佳。通过此实验可以验证猜想1是正确的，TR过短+PE重排导致的周期幅度调制是造成Aliasing的主要原因。

Idea:是否能够基于上述实验现象机器学习的手段训练一种对kspace的滤波函数，压缩TR时间为传统TSE的1/10，重建出相同效果的图像？训练集构建可以尝试用短TRkspace做输入传统长TRkspace做输出。

后续验证：调整Manual序列,上机验证
- 增加TR时间
- 增加Dummy
- 修正Greadout
