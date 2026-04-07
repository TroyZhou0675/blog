---

title: '02 MRI Signal Equation'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  1. 离共振（off resonance)：质子的进动频率偏离了MRI系统设定的中心频率。离共振有很多原因，而化学位移是其中最重要的一个。
---

## Off Resonance 和 Chemical Shift 的区别

1. 离共振（off resonance)：质子的进动频率偏离了 MRI 系统设定的中心频率。离共振有很多原因，而化学位移是其中最重要的一个。
2. 化学位移（chemical shift)：由于电子云外部的**屏蔽效应**，导致不同化学环境中的同种原子核受到的实际磁场强度不同，产生频率差异。

## 变量定义

- $\vec r$：空间位置向量
- $m(\vec r)$：空间 $\vec r$ 处的横向磁化强度
- $M_{XY}(\vec r, t)$：$\vec r$ 处 $t$ 时刻的横向磁化
- $s(t)$：采集的信号
- $T_2(\vec r)$：$\vec r$ 处的 T2 弛豫时间
- $\Delta f_r(\vec r)$：由磁场不均匀引起的频率偏移
- $\Delta f_{cs}$：化学位移引起的频率偏移
- $\Delta f(\vec r)$：总频率偏移
- $\gamma$：磁旋比
- $\vec G$：梯度场向量 $(G_x, G_y, G_z)$
- $B_0$：主磁场强度
- $C_n(\vec r)$：第 $n$ 个 RF 线圈的灵敏度
- $TE$：回波时间

## 公式推导

**横向磁化表达式**

$$m(\vec r) = M_{XY}(\vec r, t = TE)$$

$$s(t) = \int m(\vec r) d\vec r$$

**加入弛豫**

$$s(t) = \int m(\vec r) e^{-t/T_2(\vec r)} d\vec r$$

注：这里的 $t$ 是从回波中心开始计时的。在理想化过程中，采集的时间非常短，所以我们只关心空间编码，而不会把采集过程中的衰减考虑进去。但是，非理想情况下，这种衰减会带来伪影。

**加入离共振**

$$\Delta f_r(\vec r) = \gamma \Delta B_0(\vec r)$$

$$\Delta f_{cs}$$

$$\Delta f(\vec r) = \Delta f_{cs} + \Delta f_r(\vec r)$$

$$\int m(\vec r) e^{-i2\pi \Delta f(\vec r) t} d\vec r$$

注：此过程将基准旋转的高频部分 $e^{-i2\pi f_0 t}$ 抵消，只保留相对中心频率的变化。

**加入梯度场**

重要概念：在研究梯度场时，我们一般只研究和主磁场同方向的磁场。

$$\vec G = (G_x, G_y, G_z)$$

这个表达式并不表示磁场强度的空间分布，而是梯度场和 $B_0$ 叠加后沿 $Y$ 轴的磁场强度随空间的变化率。

$$\vec B = B_0 + G_x x + G_y y + G_z z$$

$$\vec B(\vec r, t) = B_0 + \vec G(t) \cdot \vec r$$

解调后的空间角频率：

$$\omega(\vec r, t) = \gamma \vec G(t) \cdot \vec r$$

$$\Phi(\vec r, t) = \gamma \int_0^t \vec G(\tau) \cdot \vec r d\tau$$

**加入 RF 线圈灵敏度**

$s_n(t) = \int m(\vec r) C_n(\vec r) e^{-i2\pi \Delta f_{cs} t} e^{-i2\pi \Delta f_r(\vec r) t} \exp\left(-i\gamma \int_0^t \vec G(t) \cdot \vec r d\tau\right) d\vec r$

**完整的信号方程**

$$s_n(t) = \int m(\vec r) C_n(\vec r) e^{-i2\pi \Delta f_{cs} t} e^{-i2\pi \Delta f_r(\vec r) t} \exp\left(-i\gamma \int_0^t \vec G(t) \cdot \vec r d\tau\right) d\vec r$$
