---
title: 'Lecture 1 Math Basics'
date: '2025-01-01'
category: 'MRI / MRI Reconstruction'
excerpt: |
  Conjugate Symmetry(共轭对称性)
---

### 傅里叶变换的重要性质
**Conjugate Symmetry(共轭对称性)**

$$\mathcal {F}\{s^*(r)\}=S^*(-k)$$
翻译以下：原图像的共轭(如果纯实数还是原图像)的变换，等于原图像变换左右颠倒然后相位方向上下颠倒。
利用这个数学性质可以节省扫描时间。

**Scaling（缩放性质）**
总结：时域/空间域越挤，频域越宽；时域/空间域越宽，频域越窄。
$$\mathcal {F}\{s(ar)\} = \frac 1{|a|}S(\frac{k}{a})$$
**Shifting(时/空间移动）**
总结：信号在时间轴/空间移动，频域会绕着k轴旋转，而且离原点越远，转的角度越大。

**Modulation(调制)**
频域上的移动对应时域/空间域上的缩放+旋转
$$\mathcal{F}\{e^{j2\pi k_0r}s(r)\} = S(k-k_0)$$

**Parseval’s formula(帕塞瓦尔定理）**
本质上是能量守恒
$$\int s_1(r)s_2^*(r)dr = \int S_1(k)S_2^*(k)dk$$
$$\int |s(r)|^2dr = \int |S(k)|^2 dk$$
**Convolution & Multiplication**
$$\mathcal {F}\{s_1(r)*s_2(r) \}= S_1(k)S_2(k)$$
$$\mathcal {F}\{s_1(r)s_2(r) \}= S_1(k)*S_2(k)$$