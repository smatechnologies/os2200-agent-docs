---
sidebar_label: 'Release notes'
title: OS 2200 Agent release notes
description: "Version history and change details for the OS 2200 LSAM and BIS LMAM, including new features, improvements, and bug fixes."
tags:
  - Reference
  - System Administrator
  - Agents
---

# OS 2200 Agent release notes

## 22

### 22R1A

2022

### What's new

:eight_spoked_asterisk: Support for TDATE$ changes.

## 19

### 19R1A

### What's new

:eight_spoked_asterisk: Option to create uniquely named ECL files for started jobs. Temporary ECL files are normally created with the OpCon job name. With this option, the files are created with the OpCon JobID, allowing for more than 32 concurrent instances.

:eight_spoked_asterisk: Pass long schedule name to SAMNOT via ECL card.

:eight_spoked_asterisk: Send job start statement to OpCon core.

:eight_spoked_asterisk: Improved failure detection.

:eight_spoked_asterisk: Support for longer job output records (888 characters, up from 132).

:eight_spoked_asterisk: TCP/IP improvements:

- Improved support for IPv6
- Support for TLS in the application, not just through the CPCOMM settings
- Fix for MSGPOOL filling up, resulting in lost messages

:eight_spoked_asterisk: Various performance and stability improvements.
