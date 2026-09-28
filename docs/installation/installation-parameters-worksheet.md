---
sidebar_label: 'Parameters worksheet'
title: Installation parameters worksheet
description: "Reference worksheet for recording all required OS 2200 LSAM installation parameters before starting the installation."
tags:
  - Reference
  - System Administrator
  - Agents
---

# Installation Parameters Worksheet

| | |
| --- | --- |
| Company: | Date: |
| SYSTEM PARAMETERS | | 
| Qualifier: | Account:|
| User ID: | Password: | 
| TSU Name (default: `LSAM`): | TSU Password (default: `LSAMPWD`): | 
| IP Address: | Port Number (default: `3100`): |
| TIP File Number: | TIP File Name: |
| NCCB Name: | NCCB File: |
 

| FILE PARAMETERS | | |
| ---- | ---- | ---- |
| SYSTEM FILES | DEVICE	| PACK-ID |
| *SKDPRG | | |
| *ABS | Same as SKDPRG | Same as SKDPRG |
| LSAM-LOCK | | |
| SMAJOR-LOCK | | |
| SMAMSC-LOCK | | |
| XFRTCP-LOCK | | |
| BKLSAM | | |
| BKSMAFTA | | |
| BKSMAJOR | | |
| BKSMAMSC | | |
| BKXFRTCP | | |
| BKXFRPRT | | |
| DUMPCDB-PRT | | |
| LSAMPARMBKP | | |
| XFRPRT-PRT | | |


| Following Files Required Only When LMAM/MAM is Installed: |
| --- |
| LMAM-LOCK |
| SAM-MAM-LOCK |
| BKLMAM |
| MAM-x-LOG |
| MAM-x-FINLOG |
| MAM-x-BACKUP |

| Following Files Required Only When the Media Allocation Subsystem (MASS) is Installed: |
| --- |
| MFTF-SV |
| MSCP-SV |
| TUPS-SV |
| CONF-SV |
| OPCTMS-LOCK |
| OPCRCV-LOCK |
| OPCTAC-LOCK |
| BKOPCTMS |
| BKOPCORG |
| BKOPCTAC |
| BKOPCRCV |
| OPCRCV-PRT |
| OPCTAPE |
| OPCMASTER |
| LOADRM-PRT |
| LOADTP-PRT |
| SOLAR-ELTS |

| LIBRARY NAMES | | 
| ---- | ---- |
| TIP Library: | TIP$*TIPLIB$ |
| TIP Absolutes: | TIP$*TIPRUN$ |
| Collector Processor: | MAP |
| BIS MAM Parameters | |
| MAM Department: | Cabinet (Mode): |
| Data Drawer (Type):	| Run Drawer (Type): | 
| Batchport Name: | Station Number (Error Messages): |
| BIS Sign-on: | | 