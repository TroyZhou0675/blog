---
title: '07 RF Pulse Design'
date: '2026-03-01'
category: 'MRI / MRI基础'
excerpt: |
  概述 ：RF Pulse在翻转角小于60°时使用傅里叶变换作为工具，在翻转角为90°，180°时使用SLR(Shinnar-Le Roux)作为工具
---

**概述** ：RF Pulse在翻转角小于60°时使用傅里叶变换作为工具，在翻转角为90°，180°时使用SLR(Shinnar-Le Roux)作为工具

## 问题1：有限的持续时间
有限的时间会让频率轮廓有更多的波动，通过叠加窗函数可以解决：
### 理解仿真程序
```
import numpy as np
import matplotlib.pyplot as plt
import sys

sys.path.append('../Physics/')  
from bloch_rotate import bloch_rotate

# parameters
gammabar = 42.58  # kHz/mT
M0 = 1.0
M_equilibrium = np.array([0.0, 0.0, M0])
dt = 0.1  # ms
flip = 60.0

tmax = 6.0
N = int(tmax / dt)
t = (np.arange(-N//2, N//2) * dt).astype(float)

BW = 1.0  # kHz
df = np.linspace(-BW, BW)

# side-by-side plots for Sinc and Windowed Sinc pulses
fig, axs = plt.subplots(2, 2, figsize=(12, 6))

# Sinc pulse
RF_sinc = np.sinc(t)
RF_sinc = (flip * np.pi / 180.0) * RF_sinc / np.sum(RF_sinc) / (2 * np.pi * gammabar * dt)

M_sinc = np.tile(M_equilibrium[:, None], (1, len(df)))
for n_idx in range(len(t)):
    for f_idx in range(len(df)):
        B = [np.real(RF_sinc[n_idx]), np.imag(RF_sinc[n_idx]), df[f_idx] / gammabar]
        M_sinc[:, f_idx] = bloch_rotate(M_sinc[:, f_idx], dt, B)

axs[0, 0].plot(t, RF_sinc)
axs[0, 0].set_xlabel('time (ms)')
axs[0, 0].set_ylabel('RF (mT)')
axs[0, 0].set_ylim(-0.001, 0.004)
axs[0, 0].set_title('Sinc Pulse')

axs[1, 0].plot(df, np.sqrt(M_sinc[0, :]**2 + M_sinc[1, :]**2), label=r'$|M_{XY}|$')
axs[1, 0].plot(df, M_sinc[2, :], label=r'$M_{Z}$')
axs[1, 0].set_title('Frequency profile')
axs[1, 0].set_xlabel('frequency (kHz)')
axs[1, 0].legend()

# Windowed Sinc Pulse
RF_win = np.hamming(N) * np.sinc(t)
RF_win = (flip * np.pi / 180.0) * RF_win / np.sum(RF_win) / (2 * np.pi * gammabar * dt)

M_win = np.tile(M_equilibrium[:, None], (1, len(df)))
for n_idx in range(len(t)):
    for f_idx in range(len(df)):
        B = [np.real(RF_win[n_idx]), np.imag(RF_win[n_idx]), df[f_idx] / gammabar]
        M_win[:, f_idx] = bloch_rotate(M_win[:, f_idx], dt, B)

axs[0, 1].plot(t, RF_win)
axs[0, 1].set_xlabel('time (ms)')
axs[0, 1].set_ylabel('RF (mT)')
axs[0, 1].set_ylim(-0.001, 0.004)
axs[0, 1].set_title('Windowed Sinc Pulse')

axs[1, 1].plot(df, np.sqrt(M_win[0, :]**2 + M_win[1, :]**2), label=r'$|M_{XY}|$')
axs[1, 1].plot(df, M_win[2, :], label=r'$M_{Z}$')
axs[1, 1].set_title('Frequency profile')
axs[1, 1].set_xlabel('frequency (kHz)')
axs[1, 1].legend()

fig.tight_layout()
plt.show()
```
问题：` B = [np.real(RF_win[n_idx]), np.imag(RF_win[n_idx]), df[f_idx] / gammabar]`
旋转系下的磁场：
	由于旋转参考系会产生和惯性力（internal force)十分相似的“假磁场”（fictitious magnetic field),如果旋转角频率和共振周期相同，那么这个磁场会和主磁场刚好抵消。
	如果两者频率有差异，在轴向就会产生代码中的`df[f_idx] / gammabar`
总结：B是旋转参考系下的磁感应强度

问题：M_sinc是什么？
3* 50矩阵，横轴表示频率偏移量，表示某一时刻信息，随时间迭代。

### Hamming Window
为了解决截断效应引入的经典函数：
**场景：** 非整周期采样、无限周期信号
Sinc脉冲如果直接截断（相当于乘矩形窗），在频域内会产生吉布斯震荡，表现为毛刺，涟漪。
窗函数可以将这种毛刺涟漪压低，使切片轮廓更加平整。
窗函数在图形上类似于钟形曲线，在pulse应用中，hamming的宽度和截断宽度相同。


### TBW 时间带宽积
这是一个衡量pulse的指标，一般来说，更大的TBW频率范围越宽，频谱的边缘更加陡，片选性更好。



## 大翻转角的序列设计

**问题：** 教程中描述的大翻转角失去线性性，无法使用傅里叶变换来设计是什么意思？

脉冲设计中，使用ft的理论依据是**小翻转角近似**。下面是推导：

旋转参考系，忽略弛豫现象：

$$\frac{dM(t)}{dt}= \gamma M(t)\times B_{eff}(t)$$

矩阵形式：

$$\frac{d}{dt}\begin{bmatrix}M_x\\ M_y\\ M_z\end{bmatrix}=\gamma\begin{bmatrix}0&\Delta B_z&-B_{1y}\\ -\Delta B_z&0&B_{1x}\\ B_{1y}&-B_{1x}&0\end{bmatrix}\begin{bmatrix}M_x\\ M_y\\ M_z\end{bmatrix}$$

其中 $\Delta B_z=\Delta\omega /\gamma$ 是由离共振造成的纵向等效磁感应强度

将 tranverse 的平面用复数表达：

$$B_1(t) = B_{1x}(t) + iB_{1y}(t)$$
$$M_+(t) = M_x(t) + iM_y(t)$$

用复数改写方程：

$$\frac{dM_+}{dt} = i\gamma B_1 M_z - i\Delta\omega M_+ \quad \text{(Eq.1)}$$

$$\frac{dM_z}{dt}=i\frac{\gamma}{2}(\overline{B_1}M_+-B_1\overline{M_+}) = -\gamma \mathrm{Im}(\overline{B_1}M_+) \quad \text{(Eq.2)}$$

**在翻转角度较小时，采用近似：** $M_z = M_0$

$$Eq.1:\quad \frac{dM_+}{dt} = i\gamma B_1 M_0 - i\Delta\omega M_+$$

解得：

$$M_+(\Delta \omega) = i\gamma M_0 e^{-i\Delta\omega t}\int_0^t B_1(\tau)e^{-i\Delta\omega\tau}d\tau$$

而右边这个积分式，正好是 $B_1(t)$ 经过傅里叶变换后的形式，所以得到：

$$M_+(\Delta\omega) \propto \mathcal{F}\{B_1(t)\}$$

下面是 180° 翻转角两种设计的效果对比


