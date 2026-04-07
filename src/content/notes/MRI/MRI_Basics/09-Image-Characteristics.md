---
title: '09 Image Characteristics'
date: '2025-01-01'
category: 'MRI / MRI基础'
excerpt: |
  视野（FOV) 由采样的步长决定，采样的步长越大，看到的视野越广：
---

## FOV & Resolution 
**视野（FOV)** 由采样的步长决定，采样的步长越大，看到的视野越广：
$$FOV = \frac{1}{\Delta k }$$
**分辨率(resolution):** 分辨率由kmax决定：
$$\delta = \frac1{2k_{max}}$$

问题：k不是矢量吗，怎么可以表示一个标量呢？
实际上在传统的笛卡尔坐标系下的k-space,我们一般分为两个方向表示分辨率：
$$\delta _x = \frac 1{2k_{xmax}}$$
$$\delta_y = \frac 1{k_{ymax}}$$
## 扫描时间和信噪比(SNR)
**sequence downtime** 一个周期中除了采集外的所有时间。
$T_{read}$:一个周期中传感线圈打开的时间
$T_{means}=N_{TR}T_{read}$

最终的表达式：
$$SNR \propto f_{seq}Voxel \ Volume\sqrt{T_{meas}}$$
其中$f_{seq}$是横向磁场强度，在gre和se一章有详细分析


## 可调参数相关的表达
**公式1**
$$  FOV = \delta N_{matrix}$$
推导：

$$
2k_{max} = \Delta k \cdot N_{matrix}
$$
$$FOV = \frac1{\Delta k} =\frac{N_{matrix}}{2k_{max}}=\delta N_{matrix}
$$
**公式2**
$$
T_{read} = \frac{N_{readout}}{BW} = \frac{N_{readout}}{2BW_{one-sided}} = \frac 1 {BW/pixel}
$$
解释：
这里$BW = \frac 1 {\Delta t}$表示采样时间间隔的倒数

高分辨率带来低信噪比，需要通过降采样到目标分辨率来提高信噪比，但是这种操作的信噪比往往不如直接采样目标分辨率来的好。（体素越大，信噪比越高，高分辨率体素小）


