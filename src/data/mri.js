// MRI专区数据
export const mriNotes = [
  {
    slug: 't1-t2-weighted-imaging',
    title: 'T1加权成像与T2加权成像详解',
    date: '2026-03-01',
    tags: ['序列原理', 'T1', 'T2', '信号基础'],
    views: 2134,
    excerpt: 'T1WI和T2WI是最基础也是最重要的两种MRI加权成像方式。理解它们的对比机制，是正确阅片和设计实验的基础。',
  },
  {
    slug: 'fmri-bold-principle',
    title: 'fMRI与BOLD信号的物理学原理',
    date: '2026-02-15',
    tags: ['fMRI', 'BOLD', '神经影像'],
    views: 986,
    excerpt: 'BOLD信号的产生与血氧饱和度变化密切相关。本文梳理从神经元活动到血氧代谢再到MRI信号变化的完整链路。',
  },
  {
    slug: 'dwi-b-value-adc',
    title: '扩散成像：b值选择与ADC图解读',
    date: '2026-01-25',
    tags: ['DWI', 'b值', 'ADC', '扩散成像'],
    views: 3012,
    excerpt: 'b值的选择直接影响DWI的灵敏度和对水分子扩散的权重。ADC图消除了T2透过效应，是定量分析扩散的基础。',
  },
  {
    slug: 'sequence-diagram-reading',
    title: '如何读懂MRI脉冲序列图',
    date: '2025-12-20',
    tags: ['序列设计', '脉冲序列', '入门'],
    views: 756,
    excerpt: '脉冲序列图是理解MRI序列的钥匙。本文从最基础的SE序列出发，解读图中RF脉冲、切片选择梯度、相位编码梯度的含义。',
  },
  {
    slug: 'mri-safety-sar-pdn',
    title: 'MRI安全规范：SAR与FDA管理标准',
    date: '2025-11-30',
    tags: ['安全', 'SAR', '规范'],
    views: 687,
    excerpt: 'MRI虽然没有电离辐射，但SAR（射频能量吸收）和梯度场安全风险不容忽视。本文梳理FDA和IEC的现行安全标准。',
  },
];

export const mriLogs = [];
