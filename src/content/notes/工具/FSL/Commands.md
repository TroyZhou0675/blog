---
title: 'Commands'
date: '2025-01-01'
category: '工具 / FSL'
excerpt: |
  1. deepbrain extractor
---

1. deepbrain extractor
	deepbrain-extractor -i ~/CVDC_demo/Data/BIDS/sub-001/anat/sub-001_T1w.nii.gz -o ~/CVDC_demo/test/     #注意目录必须以/结尾
2. fix
		[1] 文件夹要求：
		- filtered_func_data.nii.gz
		- filtered_func_data.ica/
		- mc/prefiltered_func_data_mcf.par
		- reg/highres.nii.gz
		- mask.nii.gz
		- mean_func.nii.gz
		
		[2] 命令
		fix <melodic.ica> <model> <threshold> [cleanup options]
		model = Standard

3. fslchfiletype NIFTI_GZ mask.nii #格式转换
4. fsl_regfilt:
```
	fsl_regfilt -i filtered_func_data -o denoised_data -d filtered_func_data.ica/melodic_mix -f "2,5,9"
```