---
sidebar_label: 'Overview'
title: Installation overview
description: "Overview of the OS 2200 LSAM installation, including prerequisites, new installation, upgrade, and BIS/MAM options."
---

# Installation Overview

## What is it?

The installation section covers everything needed to get the OS 2200 LSAM running on a Unisys system. The Unisys OS 2200 LSAM (Local Schedule Activity Monitor) connects your OS 2200 system to OpCon for automated job scheduling and monitoring. The installation includes:

- **LSAM** — the core agent that communicates with OpCon and manages batch job execution
- **XFRTCP** — the TCP/IP communications program
- **SMAJOR** — the Job Output Retrieval System (JORS) component
- **LMAM/BIS MAM** — *(optional)* BIS job scheduling support

Installation files reside on the OpCon installation media and must be transferred to the OS 2200 system via FTP. The estimated installation time is 15 to 20 minutes.

## Choose Your Path

| Scenario | Guide |
| -------- | ----- |
| First-time installation of the LSAM on this OS 2200 system | [New Installation](new-installation.md) |
| Upgrading an existing LSAM to a new release | [Upgrade](upgrade.md) |
| Adding or updating BIS/MAM support (optional) | [BIS/MAM Installation](bis-mam-installation.md) |

## Before You Begin

Regardless of your installation path, complete the [Prerequisites](preparing-the-installation.md) first. Use the [Installation Parameters Worksheet](installation-parameters-worksheet.md) to gather and record the required values before starting.

For detailed information about system files, advanced configuration options, and special installation scenarios, refer to the [Installation Reference](installation-reference.md).

## In this section

- [Prerequisites](preparing-the-installation.md) — accounts, user-IDs, TIP parameters, CMS/CpComm requirements
- [New Installation](new-installation.md) — step-by-step first-time installation
- [Upgrade](upgrade.md) — step-by-step upgrade from a prior release
- [BIS/MAM Installation](bis-mam-installation.md) — optional BIS job scheduling support
- [Installation Reference](installation-reference.md) — system files, multiple LSAMs, INSTALL/SGS customization
- [Installation Parameters Worksheet](installation-parameters-worksheet.md) — reference sheet for recording required values

## Frequently Asked Questions

**How long does the installation take?**

The estimated installation time is 15 to 20 minutes, not counting prerequisite setup (accounts, user-IDs, CMS/CpComm configuration, TIP file assignment).

**Can I run multiple LSAMs on the same OS 2200 system?**

Yes. Multiple LSAMs can be installed within the same OS 2200 partition as long as each has a unique file qualifier, TIP file number, CDB name, CpComm/CMS process name, OpCon machine name, console keyins, and port number. See [Installation Reference](installation-reference.md) for details.

**What is the difference between XFRINI and TIPREG during an upgrade?**

`XFRINI/ECL` initializes the job communication portion of the TIP file while preserving existing configuration data. It is the correct choice for most upgrades. `TIPREG/ECL` (or `FTIPREG/ECL`) fully re-registers the TIP file and is only needed when changing the file placement or TIP file number.

**Is the BIS/MAM component required?**

No. BIS/MAM (LMAM) is optional and only needed if you need to schedule and monitor BIS jobs. The core LSAM and XFRTCP are sufficient for OS 2200 batch job scheduling.
