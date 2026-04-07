---
title: '05 Radial & Spiral'
date: '2025-01-01'
category: 'MRI / MRI Seq'
excerpt: |
  
---

## Cartesian SE
```
grPre = mr.makeTrapezoid('x',system,'Area',gr.area/2+deltak/2,'Duration',grPredur);
```
gx的准备梯度面积采用了`gr.area/2+deltak/2`，在这里加上`deltak/2`是为了让采样点和$k_x=0$的位置对齐，保证采样点正好落在$k_x=0$上