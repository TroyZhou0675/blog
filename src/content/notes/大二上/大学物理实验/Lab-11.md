---
title: 'Lab 11'
date: '2025-01-01'
category: '大二上 / 大学物理实验'
excerpt: |
  
---

$$
\textbf{1.\ A类不确定度}\\[4pt]
U_A \approx 0.284\ \text{mV}
$$
$$
\textbf{2.\ B类不确定度}\\[4pt]
U_B = \frac{0.1}{\sqrt{3}} \approx 0.0577\ \text{mV}
$$

$$
\textbf{3.\ 合成不确定度}\\[4pt]
U_{\Delta V}
=\sqrt{U_A^2+U_B^2}
\approx \sqrt{0.284^2+0.0577^2}
\approx 0.290\ \text{mV}
$$
$$
\textbf{4.\ 转换系数}\ K\ \text{的不确定度}\\[4pt]
U_K=\frac{U_{\Delta V}\,K}{\overline{\Delta V}}
= \frac{0.290\times 1.27\times10^{-4}}{154.0}
\approx 2.39\times10^{-7}\ \text{N/mV}
$$
$$
\textbf{5.\ 最终结果（保留三位有效数字）}\\[6pt]
K = (1.27 \pm 0.00024)\times10^{-4}\ \text{N/mV}
$$
$$

\overline{\Delta V}
= \frac{154.4+153.4+154.6+153.7}{4}
= 154.025\ \text{mV}
$$


$s^2=\frac{1}{n-1}\sum_{i=1}^n(\Delta V_i-\overline{\Delta V})^2=\frac{0.3225}{1}=0.3225$

$s=\sqrt{0.3225}=0.568\ \text{mV}$

$U_A=\frac{s}{\sqrt{n}}=\frac{0.5678908}{2}=0.2839\ \text{mV}$

---

$$

U_B=\frac{0.1\ \text{mV}}{\sqrt{3}}
=0.0577\ \text{mV}
$$

---

$$

U_{\Delta V}
=\sqrt{U_A^2+U_B^2}
=\sqrt{0.2839454^2+0.0577350^2}
=0.2897\ \text{mV}
$$

---

$$
\textbf{4.\ 转换系数}\ K\ \text{的不确定度}\\[6pt]
\frac{U_K}{K}=\frac{U_{\Delta V}}{\overline{\Delta V}}
$$

$$
U_K=\frac{U_{\Delta V}\times K}{\overline{\Delta V}}
=\frac{0.2897556\times 1.271\times10^{-4}}{154.025}
\approx 0.239\times10^{-6}\ \text{N/mV}
$$

---

$$
\textbf{5.\ 最终结果}\\[4pt]
K=(1.2710\pm 0.0024)\times 10^{-4}\ \text{N/mV}
$$

$$
\begin{align*}
% 第一部分：18.8度的情况
\textbf{1. 水温 } \mathbf{18.8^\circ C} \textbf{ 时：} \\
\text{平均值 } \overline{\Delta V}_1 &= 108.5 \, \text{mV} \\
\text{贝塞尔公式计算 A 类不确定度：} & \\
U_{A1} &= \sqrt{\frac{\sum_{i=1}^{6} (\Delta V_i - \overline{\Delta V}_1)^2}{n(n-1)}} \approx 0.455 \, \text{mV}  \\[20pt]

% 第二部分：38.8度的情况
\textbf{2. 水温 } \mathbf{38.8^\circ C} \textbf{ 时：} \\
\text{平均值 } \overline{\Delta V}_2 &= 90.8 \, \text{mV} \\
\text{同理计算：} & \\
U_{A2} &= \sqrt{\frac{\sum_{i=1}^{6} (\Delta V_i - \overline{\Delta V}_2)^2}{n(n-1)}} \approx 0.517 \, \text{mV} 
\end{align*}
$$
$$\begin{align*}
\text{<2> B 类不确定度} & \\
U_B (V) &= \frac{0.1 \text{mV}}{\sqrt{3}} = 0.0577 \text{mV} \\[15pt]

\text{<3> 合成不确定度} & \\
U_1 (T=18.8^\circ\text{C}) &= \sqrt{U_{A1}^2 + U_B^2} = \sqrt{0.455^2 + 0.0577^2} \approx 0.459 \text{mV} \\[10pt]
U_2 (T=38.8^\circ\text{C}) &= \sqrt{U_{A2}^2 + U_B^2} = \sqrt{0.517^2 + 0.0577^2} \approx 0.520 \text{mV}
\end{align*}$$
$$\text{内径：} \bar{D}_{in} = 32.96 \text{mm} \ u_{A,\text{内径}} = \sqrt{ \frac{1}{6 \times 5} \sum_{i=1}^{6} (D_{in} - \bar{D}_{in})^2 } = \sqrt{ \frac{1}{30} \times 0.0008 } \approx 0.00516 \text{mm}$$
$$\text{外径：} \bar{D}_{out} \approx 34.783 \text{mm} \\ u_{A,\text{外径}} = \sqrt{ \frac{1}{6 \times 5} \sum_{i=1}^{6} (D_{out} - \bar{D}_{out})^2 } = \sqrt{ \frac{1}{30} \times 0.001133 } \approx 0.00614 \text{mm}$$

$$
U_B(D) = \frac{0.02}{\sqrt{3}} = 0.0115 mm \nonumber
$$
$$U_{\text{内}} = \sqrt{U^2_{\text{内径}} (D) + U^2_B (D)} = \sqrt{0.00516^2 + 0.0115^2} = 0.0127 mm$$
$$U_{\text{外}} = \sqrt{U^2_{\text{外径}} (D) + U^2_B (D)} = \sqrt{0.00614^2 + 0.0115^2} = 0.0131 mm$$
### <1> 水温 18.8°C

$$
\begin{aligned}
\frac{\Delta \alpha}{\alpha} &= \sqrt{ \left(\frac{U_k}{k}\right)^2 + \left(\frac{U_1(V)}{\Delta V}\right)^2 + \left(\frac{U_{\text{内}}}{L}\right)^2 + \left(\frac{U_{\text{外}}}{L}\right)^2 } \\
&= \sqrt{ \left(\frac{0.239}{142.102}\right)^2 + \left(\frac{0.459}{108.5}\right)^2 + \left(\frac{0.0127}{212.81}\right)^2 + \left(\frac{0.0131}{212.81}\right)^2 } \\
&= 4.55 \times 10^{-3}
\end{aligned}
$$

计算绝对不确定度：
$$
\Delta \alpha (T=18.8^\circ \text{C}) = \alpha \times 4.55 \times 10^{-3} = 0.33 \times 10^{-3} \text{ N/m}
$$

得到最终结果：
$$
\alpha (T=18.8^\circ \text{C}) = (72.45 \pm 0.33) \times 10^{-3} \text{ N/m}
$$

---

### <2> 水温 38.8°C

$$
\begin{aligned}
\frac{\Delta \alpha}{\alpha} &= \sqrt{ \left(\frac{U_k}{k}\right)^2 + \left(\frac{U_2(V)}{\Delta V}\right)^2 + \left(\frac{U_{\text{内}}}{L}\right)^2 + \left(\frac{U_{\text{外}}}{L}\right)^2 } \\
&= \sqrt{ \left(\frac{0.239}{142.102}\right)^2 + \left(\frac{0.520}{90.8}\right)^2 + \left(\frac{0.0127}{212.81}\right)^2 + \left(\frac{0.0131}{212.81}\right)^2 } \\
&= 5.97 \times 10^{-3}
\end{aligned}
$$

计算绝对不确定度：
$$
\Delta \alpha (T=38.8^\circ \text{C}) = \alpha \times 5.97 \times 10^{-3} = 0.36 \times 10^{-3} \text{ N/m}
$$

得到最终结果：
$$
\alpha (T=38.8^\circ \text{C}) = (60.63 \pm 0.36) \times 10^{-3} \text{ N/m}
$$