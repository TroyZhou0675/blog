---
title: 'Learning TSE'
date: '2025-01-01'
category: '科研 / 序列设计'
excerpt: |
  TEL: echo train length (turbo factor)这个参数代表一个重复中有多少个回波
---

TEL: echo train length (turbo factor)这个参数代表一个重复中有多少个回波

编程思路：
```
%1.定义系统性能约束+创建对象

%2.定义参数：fov,Nx,Ny,necho,Nslice,sliceThickness,rflip,TE,TR,TEeff,

%3.

```
### CPMG条件
要求：激发脉冲和后续重聚焦脉冲的相位差必须是90°
原因：翻转角不是完美的180°，这样设计相位可以最大程度地减缓这种缺陷带来的信号衰减。