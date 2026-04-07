---
title: '05 Gradient and Spin Echo Pulse Sequence'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  梯度场差异会导致空间自选速度差异，施加反向梯度场可以纠正这种差异，让相位重新聚焦。
---

## GRE（Gradient Echo）梯度回波

梯度场差异会导致空间自选速度差异，施加反向梯度场可以纠正这种差异，让相位重新聚焦。

## SE（Spin Echo）自旋回波

这个脉冲序列可以解决 off-resonance 的问题：

通过在 $TE/2$ 的时刻施加 $180^\circ$ 翻转脉冲，让原本领先 $\phi$ 的原子落后 $-\phi$ 个相位，最终在 $TE$ 时刻汇聚到一起。
