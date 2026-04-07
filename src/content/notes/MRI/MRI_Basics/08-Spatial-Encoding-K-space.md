---
title: '08 Spatial Encoding & K-space'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  Gy(n) = -G{yp} + (n-1)G{yi}
---

## 梯度编码表达式
$$G_y(n) = -G_{yp} + (n-1)G_{yi}$$
$$\phi(n) = \gamma G_y(n) t_y y$$
其中，n表示第n个重复，G_yi是梯度变化的步长，一般从-G_yp变换到+G_yp

## 成像原理推导：
$$\Delta B_z = \vec G(\tau)\cdot \vec r$$
$$\Delta \omega = \overline \gamma \Delta B_z=\overline \gamma \vec G(\tau)\cdot \vec r$$
$$\phi(t) = \int_0^t \Delta \omega=\overline \gamma \int_0^t\vec G(\tau)\cdot \vec r d\tau$$
$$s(t) = \int f(\vec r ) exp(-2\pi i \phi(t)) d\vec r$$
$f(\vec r)$的傅里叶形式：
$$\mathcal{F}\{f(\vec r )\} = \int f(\vec r)exp(-2\pi i  \vec k \cdot \vec r) d\vec r$$
令两者相等：(**空间频率等于梯度对时间的积分**)
$$\vec k = \overline \gamma \int_0^t\vec G(\tau)\cdot \vec r d\tau$$
最终得到：
$$s(t) = M(\vec k ) = \mathcal{F}\{f(\vec r )\}$$

因此：我们只要通过设计序列，在k-space上收集足够多的数据，就可以通过反向傅里叶得到原图像。

