---
title: 'FIX文件结构要求'
date: '2025-01-01'
category: '工具 / FSL'
excerpt: |
  sub-001func.output
---

sub-001_func.output
	-filtered_func_data.ica
	-mc
		-prefiltered_func_data_mcf_conf_hp_clean.nii.gz
		-prefiltered_func_data_mcf.par
		-prefiltered_func_data_mcf.nii.gz
	-motion_params
		-prefiltered_func_data_fd.txt
		-prefiltered_func_data_outliers_mask
	-reg
		-example_func2highres.mat
		-highres.nii.gz
		-highres2example_func.mat
	-reorient
		-prefiltered_func_data_std.nii.gz
	-roi
		-prefiltered_func_data_roi.nii.gz
	-warped
		-filtered_func_data_warped.nii.gz
	filterred_func_data.nii.gz(滤波，未配准)
	mask.nii.gz
	example_func.nii.gz

- 输出文件：filtered_func_data_clean.nii.gz是否配准？