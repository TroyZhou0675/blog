---
title: '01 FID & SE'
date: '2025-01-01'
category: 'MRI / MRI Seq'
excerpt: |
  FID全称：Free Induction Decay 也就是自由感应衰减，是核磁共振成像中最基础的信号。
---

## 什么是 FID？

FID 全称：Free Induction Decay，也就是自由感应衰减，是核磁共振成像中最基础的信号。

- **Free**：表示 RF 脉冲停止以后，原子核不受外加磁场驱动，做自由进动运动
- **Induction**：表示变化磁场激发感应线圈电流的物理过程
- **Decay**：表示弛豫现象和失相带来的信号衰减

## Spin Echo

SE 序列最显著的特征是 $180^\circ$ 的重聚焦脉冲。在经典的 SE 序列中，重聚焦脉冲位于时间轴上 RF 激发脉冲和 ADC 采样中心点的中点。在激发后，横向平面的信号会因为离共振自然衰减，到重聚焦脉冲中心，这种相位积累为 $\Phi$。此时施加重聚焦脉冲，可以让相位变成 $-\Phi$。然后经过相同时间，在 ADC 的中点，相位积累刚好为 $\Phi_{ADC} = -\Phi + \Phi = 0$，从而避免了离共振带来的信号损失。

## Spoil Gradient

**为什么需要 Spoil Gradient？**

RF 脉冲在现实中并不完美，$180^\circ$ 脉冲可能会让某些位置的磁化矢量翻转 $160^\circ$、$190^\circ$ 等角度。这样会让原本位于 $z$ 轴的磁化矢量翻转到横向平面，进而产生新的回波。这种回波也被称为虚假回波。

**Spoil Gradient 原理**

Spoil Gradient 对称分布在重聚焦脉冲两侧，左右面积相等。待测信号在经过第一个梯度后，沿梯度方向产生相位差，可以表示为 $\Phi + \Phi_{gradient}$。经过重聚焦脉冲后，相位变成 $-\Phi - \Phi_{gradient}$。然后经过面积相等的梯度场和 $TE/2$，相位累计则变成 $\Phi_{ADC} = -\Phi - \Phi_{gradient} + \Phi + \Phi_{gradient} = 0$。由于 $180^\circ$ 脉冲产生的虚假回波只经过了第二个梯度，则会因为梯度带来的相位差迅速衰减。
