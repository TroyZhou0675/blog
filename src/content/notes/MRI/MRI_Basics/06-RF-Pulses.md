---

title: '06 RF Pulses'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: 'sinc函数的带宽与时间带宽积TBW的关系，以及SAR指标说明。'
---

## sinc 函数

带宽：$BW = \Delta f = 1/\text{zerospacing}$

sinc 函数的带宽积为定值，可以通过过零点数量来估算。

## SAR（Specific Absorption Rate）

衡量人体组织吸收能量的多少，过高的 SAR 对人体有害，无法通过 FDA。

$$SAR \propto \int_0^{T_{rf}} |b_1(\tau)|^2 d\tau$$

## 为什么选择 Sinc（shaped pulse）而非 Hard pulse

用 sinc 做片选边界十分清晰，因为函数的频域是一个矩形，让一个频率范围内的质子都能充分翻转。而 hard pulse 虽然在时域上规整，在频域上却不规则，使得片选的边界十分模糊。

## Frequency Profile：频率响应图

横轴是频率，纵轴是翻转角度。在翻转角较小时，这个图像和 sinc 函数的傅里叶变换图像十分接近；但在翻转角很大（$90^\circ$）时，一般用 SLR 变换研究。
