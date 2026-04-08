---

title: '09 Image Characteristics'
date: '2026-03-03'
category: 'MRI / MRI基础'
excerpt: |
  视野（FOV) 由采样的步长决定，采样的步长越大，看到的视野越广：
---

## 变量定义

- $FOV$：视野（Field of View）
- $\Delta k$：k 空间采样步长
- $\delta$：空间分辨率
- $k_{max}$：k 空间最大频率
- $k_{xmax}, k_{ymax}$：$x$、$y$ 方向的 k 空间最大频率
- $N_{matrix}$：矩阵大小
- $N_{readout}$：读出方向采样点数
- $BW$：带宽
- $T_{read}$：读出时间
- $T_{meas}$：总测量时间
- $T_{seq}$：序列周期
- $f_{seq}$：序列相关因子（与横向磁化强度相关）
- $VoxelVolume$：体素体积

## FOV & Resolution

**视野（FOV）** 由采样的步长决定，采样的步长越大，看到的视野越广：

$$FOV = \frac{1}{\Delta k}$$

**分辨率（Resolution）** 由 $k_{max}$ 决定：

$$\delta = \frac{1}{2k_{max}}$$

问题：$k$ 不是矢量吗，怎么可以表示一个标量呢？

实际上在传统的笛卡尔坐标系下的 k-space，我们一般分为两个方向表示分辨率：

$$\delta_x = \frac{1}{2k_{xmax}}$$

$$\delta_y = \frac{1}{k_{ymax}}$$

## 扫描时间和信噪比（SNR）

**sequence downtime**：一个周期中除了采集外的所有时间。

$T_{read}$：一个周期中传感线圈打开的时间。

$T_{meas} = N_{TR} \cdot T_{read}$

最终的表达式：

$$SNR \propto f_{seq} \cdot VoxelVolume \cdot \sqrt{T_{meas}}$$

其中 $f_{seq}$ 是横向磁场强度，在 GRE 和 SE 一章有详细分析。

## 可调参数相关的表达式

**公式 1**

$$FOV = \delta \cdot N_{matrix}$$

推导：

$$2k_{max} = \Delta k \cdot N_{matrix}$$

$$FOV = \frac{1}{\Delta k} = \frac{N_{matrix}}{2k_{max}} = \delta \cdot N_{matrix}$$

**公式 2**

$$T_{read} = \frac{N_{readout}}{BW} = \frac{N_{readout}}{2BW_{one-sided}} = \frac{1}{BW/pixel}$$

解释：这里 $BW = 1/\Delta t$ 表示采样时间间隔的倒数。

高分辨率带来低信噪比，需要通过降采样到目标分辨率来提高信噪比，但是这种操作的信噪比往往不如直接采样目标分辨率来的好（体素越大，信噪比越高，高分辨率体素小）。
