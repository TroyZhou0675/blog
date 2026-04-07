---
title: '3 Basic Contrast Mechanisms'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  T1描述的是质子如何将吸收的能量释放给周围的分子结构（lattice),从而回到平衡态。周围分子的运动节奏和质子进动运动越像，T1时间就越短。
---

## T1
T1描述的是质子如何将吸收的能量释放给周围的分子结构（lattice),从而回到平衡态。周围分子的运动节奏和质子进动运动越像，T1时间就越短。
## T2/T2*
T2弛豫是理想情况下的弛豫过程，原子自旋-自旋相互作用。
T2* 弛豫是表观，包含干扰项的，干扰来自于主磁场缺陷， 人体不同组织磁化率差异。
T2* 一定比T2短

## T1 过程如何被采集
T1弛豫是发生在z方向上的弛豫，但是我们需要在xy平面上采集。
**spoiling** （破坏）：为了收集新的信号，我们需要在一个单周期结束时去除Mxy,一般有两种手段：
1. 梯度去相（Gradient Spoiling)
	在下一个TR开始前，施加强度很大，时间很长的额外梯度压力。
2. 射频去相（RF Spoiling)
	改变每次重复中RF激发脉冲的相位，在计算处理时可以利用这种相位差异将残留信号通过数学方式抵消

**RF翻转** ：
1. 翻转角=90°：每次将上一个TR结束的Mz翻转90°
$$S\propto M_0(1-exp(-TR/T1))$$

2. 翻转角<90°：
### 公式推导：
Bloch方程在z轴的形式：
$$\frac{dM_z}{dt}=\frac{M_0-M_z}{T_1}$$
通解为：
$$M_z(t)=M_0(1-E_1) +M_z(0)\cdot E_1$$
其中：                        $E_1 = exp(-t/T1)$

定义变量：
$M_n^-:第n个脉冲施加前的纵向磁化强度$
$M_n^+:第n个脉冲施加结束后瞬间的纵向磁化强度$
$$M_n^+ = M_n^-\cdot cos(\theta)$$
$$M_{n+1}^-=M_n^+\cdot E_1 + M_0\cdot (1-E_1)$$
$$M_n^- = M_{n+1}^-(稳态)$$
最终解得：
$$M_n^- = \frac{M_0\cdot (1-E_1)}{1-E_1cos(\theta)}$$
因此：
$$S\propto M_0 cos\theta \frac{1-E_1}{1-E_1cos(\theta)}$$
$$E_1 = exp(-TR/T1)$$


## 问题：在M0发生倾倒，弛豫时，向量的长度发生变化吗？
答：激发阶段长度基本不变，弛豫阶段长度先变短，后边长
1. 激发阶段：磁化矢量在B1场作用下做旋转运动，矢量总长度|M|不变
2. 弛豫阶段：脉冲结束后，磁化矢量开始恢复，但是这个恢复过程并非原路返回。而是分为：(1）纵向恢复T1 (2)横向衰减 T2 两个过程独立进行。
	而T2通常比T1过程快5-10倍，这导致向量的运动轨迹像一个星形线（旋转参考系）。


<div style="display: flex; gap: 10px;">
  <img src="Pasted image 20260226123948.png" width="350">
  <img src="Pasted image 20260226124135.png" width="350">
</div>

小结：
不同加权和TE,TR的关系：
- T1:短TE,短TR(让Mz不能完全恢复)
- T2:长TE,长TR(排除T1信号)
- PD:短TE,长TR


## Inversion Recovery
**步骤：** step1:180°脉冲->等待恢复（TI Interval)->90°脉冲
**原理：** 这种对比度可以压制某一种组织的信号，TI( Inversion Time)的时间可以决定压制哪种组织。核心概念：**零点** 在恢复过程中`Mz`必然经历一个零点，这个时候打入90°脉冲可以让该组织信号小时，在图像上完全变黑。$TI_{null}\approx 0.693 \times T_1$
**临床常用序列：** 
1. STIR(Short TI Inversion Recovery)----压制脂肪（含水信号变亮），观察骨髓水肿、炎症
2. FLAIR(Fluid Attenuated Inversion Recovery)----压制脑脊液


上一章：2 MRI Signal Equation
下一章：4 In Vivo Contrast Mechanisms