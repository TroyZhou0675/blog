---
title: '6 RF Pulses'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  <div style='display: flex; gap: 10px;'>
---

## sinc函数：

<div style="display: flex; gap: 10px;">
  <img src="Pasted image 20260226172439.png" width="350">
  <img src="Pasted image 20260226172612.png" width="350">
</div>
带宽： $BW = \Delta f=1/zerospacing$
sinc函数的带宽积为定值，可以用过零点数量来估算

## SAR (specific absorption rate)
衡量人体组织吸收能量的多少，过高的SAR对人体有害，无法通过FDA
$$SAR \propto \int_0^{T_{rf}}|b_1(\tau)|^2d\tau$$

## 为什么选择Sinc(shaped pulse)而非Hard pulse
用sic片选边界十分清晰，因为函数的频域是一个矩形，让一个频率范围内的质子都能充分翻转。而hardpulse虽然在时域上规整，在频域上却不规则，然片选的边界十分模糊。


## Frequency Profile :频率响应图
横轴是频率，纵轴是翻转角度，在翻转角较小时，这个图像和sic函数的傅里叶变换图像十分接近，但是在翻转角很大(90°)，一般用SLR变换研究。


