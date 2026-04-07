---
title: '1 Pulse Sequence'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  在MRI成像中，为了填满k space,需要将基本脉冲序列重复几十次甚至上百次，而每一次的“相位编码梯度”（phase encoding gradient)的强度都会改变。
---

## Annotation 的疑问：
在MRI成像中，为了填满k space,需要将基本脉冲序列重复几十次甚至上百次，而每一次的“相位编码梯度”（phase encoding gradient)的强度都会改变。
因此在序列图中我们有两种标注形式：
1. 在梯度轴上画多条线：
	
2. 加括号标注重复次数：
	在序列块的附近画一个横向的长括号，写上序列的重复次数

## Slew Rate
梯度切换率，是梯度场改变的速率：
理想情况下，梯度场是瞬间开启、关闭的，但是物理世界中，梯度场的变化需要时间，在实际序列图中，梯度场往往是梯形而不是矩形。
- slew rate越高，扫描时间越短，图像分辨率越高(能支持更精细的编码)
- 显示世界，slew rate过高会带来生理安全性问题。PNS(peripheral nerve stimulation)，slew rate过高会在人体内感应出电流，导致患者产生肌肉抽动或刺痛。

## Key Parameters
- Flip Angle($\theta$) 翻转角---- RF磁场让静磁感应强度倾斜了多少度
- Echo Time(TE) 回波时间----从RF中心到DAQ中心的采集时间
- Repetition Time(TR) 重复时间----主脉冲序列两次重复之间的时间间隔
- Number of Repetition(N) 重复次数
- Readout Time ($T_{read}$) 读出时间----单词重复中，DAQ的时间
- Active Time($T_{active}$)激活时间----单词重复中，施加射频脉冲和梯度长所需的总时间，这是该序列理论最小重复时间


下一章：2 MRI Signal Equation