---
title: '02 MRI Signal Equation'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  1. 离共振（off resonance)：质子的进动频率偏离了MRI系统设定的中心频率。离共振有很多原因，而化学位移是其中最重要的一个。
---

## Off Resonance和 Chemical Shift的区别
1. 离共振（off resonance)：质子的进动频率偏离了MRI系统设定的中心频率。离共振有很多原因，而化学位移是其中最重要的一个。
2. 化学位移（chemical shift)：由于电子云外部的**屏蔽效应**，导致不同化学环境中的同种原子核受到的实际磁场强度不同，产生频率差异。

## 公式推导
1. 横向磁场表达式
$$m(\vec r) = M_{XY}(\vec r, t = TE)$$
$$s(t)=\int m(\vec r)d\vec r$$
2. 加入弛豫
$$s(t)=\int m(\vec r) e^{-t/T_2(\vec r)}d\vec r$$
注：这里的t是从回波中心开始计时的
在理想化过程中，采集的时间非常短，所以我们只关心空间编码，而不会把采集过程中的衰减考虑进去。
但是，非理想情况下，这种衰减会带来伪影。
3. 加入离共振
				磁场不均匀：$\Delta f_r(\vec r ) = \overline{\gamma}\Delta B_0(\vec r)$
				化学位移：$\Delta f_{cs}$
$$\Delta f(\vec r) = \Delta f_{cs} + \Delta f_r(\vec r ) $$
$$\int m(\vec r)e^{-i2\pi \Delta f(\vec r)t}d\vec r$$
注：此过程将基准旋转的高频部分：$e^{-i2\pi f_0 t}$抵消，只保留相对中心频率的变化
4. 加入梯度场
重要概念：在研究梯度场时，我们一般只研究和主磁场同方向的磁场。
$$\overrightarrow{G}=(G_x,G_y,G_z)$$
这个表达式并不表示磁场强度的空间分布，而是梯度场和B0叠加后沿Y轴的磁场强度随空间的变化率。
$$\vec B = B_0 + G_xx+G_yy+G_zz$$
$$\vec B(\vec r,t) = B_0 + \vec G(t)\cdot \vec r$$
解调后的空间角频率：
$$\omega(\vec r, t) = \gamma \vec G(t)\cdot \vec r$$
$$\Phi(\vec r ,t) = \gamma\int_{0}^{t}\vec G(\tau)\cdot\vec rd\tau$$
5. 加入RF线圈灵敏度：$C_n(\vec r)$
6. 完整的信号方程：
$$s_n(t) = \int m(\vec r )C_n(\vec r)e^{-i2\pi \Delta f_{cs}t}e^{-i2\pi \Delta f_r(\vec r)t}exp(-i\gamma\int_0^t\vec G(\vec t)\cdot \vec r d\tau) dr$$

