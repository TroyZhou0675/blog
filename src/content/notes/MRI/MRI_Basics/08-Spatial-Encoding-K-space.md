---

title: '08 Spatial Encoding & K-space'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  Gy(n) = -G{yp} + (n-1)G{yi}
---

## 变量定义

- $n$：重复次数索引
- $G_y(n)$：第 $n$ 次重复的相位编码梯度
- $G_{yp}$：相位编码梯度的最大幅值
- $G_{yi}$：梯度变化的步长
- $\phi(n)$：相位编码引入的相位
- $\gamma$：磁旋比
- $\vec G(\tau)$：$\tau$ 时刻的梯度场向量
- $\vec r$：空间位置向量
- $s(t)$：采集的信号
- $f(\vec r)$：空间位置的图像函数
- $\vec k$：空间频率向量

## 梯度编码表达式

$$G_y(n) = -G_{yp} + (n-1) G_{yi}$$

$$\phi(n) = \gamma G_y(n) t_y y$$

其中，$n$ 表示第 $n$ 个重复，$G_{yi}$ 是梯度变化的步长，一般从 $-G_{yp}$ 变换到 $+G_{yp}$。

## 成像原理推导

$$\Delta B_z = \vec G(\tau) \cdot \vec r$$

$$\Delta \omega = \gamma \Delta B_z = \gamma \vec G(\tau) \cdot \vec r$$

$$\phi(t) = \int_0^t \Delta \omega = \gamma \int_0^t \vec G(\tau) \cdot \vec r d\tau$$

$$s(t) = \int f(\vec r) \exp(-2\pi i \phi(t)) d\vec r$$

$f(\vec r)$ 的傅里叶形式：

$$\mathcal{F}\{f(\vec r)\} = \int f(\vec r) \exp(-2\pi i \vec k \cdot \vec r) d\vec r$$

令两者相等，得到**空间频率等于梯度对时间的积分**：

$$\vec k = \gamma \int_0^t \vec G(\tau) d\tau$$

最终得到：

$$s(t) = M(\vec k) = \mathcal{F}\{f(\vec r)\}$$

因此，我们只要通过设计序列，在 k-space 上收集足够多的数据，就可以通过反向傅里叶得到原图像。
