---
title: 'FFT输入输出'
date: '2025-01-01'
category: '大二上 / 电赛'
excerpt: |
  设多项式为：
---

# FFT 输入输出含义（多项式视角）

## 输入
设多项式为：
$$
A(x) = a_0 + a_1 x + \cdots + a_{n-1}x^{n-1}
$$
FFT 的输入是系数数组：
$$
[a_0, a_1, \dots, a_{n-1}]
$$

## 输出
FFT 输出为：
$$
[A(\omega_n^0), A(\omega_n^1), \dots, A(\omega_n^{n-1})]
$$
其中 $\omega_n = e^{-2\pi i / n}$ 是 $n$ 次单位根。

## 应用
将多项式转为点值表示后：
- 可快速实现多项式乘法（逐点相乘 + 逆FFT）
- 信号频域分析