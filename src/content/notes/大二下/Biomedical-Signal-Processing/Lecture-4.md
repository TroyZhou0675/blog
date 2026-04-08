---
title: 'Lecture 4'
date: '2026-03-31'
category: '大二下 / 生物医学信号处理'
excerpt: |
  求阶跃/冲激响应：默认是零状态响应
---

求阶跃/冲激响应：默认是零状态响应
卷积三要素：反转、点乘、滑动

**推导LTI重要公式：**

$$y(t) = x(t)*h(t)$$

根据单位冲激函数的筛选性：

$$x(t) = \int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau$$

$$y(t) = T\{x(t)\}=T\{\int_{-\infty}^{\infty}x(\tau)\delta(t-\tau)d\tau\}$$

根据：LTI的性质：

$$y(t)=\int_{-\infty}^{\infty}x(\tau)T\{\delta(t-\tau)\}d\tau$$
d
$$y(t) = \int_{-\infty}^{\infty}x(\tau)h(t-\tau)d\tau=x(t)*h(t)$$

