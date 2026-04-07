---
title: '给工程添加新文件（keil的路径添加）'
date: '2025-01-01'
category: '大二上 / 电赛'
excerpt: |
  除了在工程目录中新建，添加以外，还需要关注keil的检索路径
---

除了在工程目录中新建，添加以外，还需要关注keil的检索路径

- 打开 Project → Options for Target → C/C++ 选项卡
    
- 在 "Include Paths" 一栏中，点击右边的 `…`
    
- **添加 `adc.h` 所在文件夹的路径**（例如：`.\HARDWARE\ADC`）
    
- 点击 OK 保存