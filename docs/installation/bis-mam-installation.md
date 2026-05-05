---
sidebar_label: 'BIS/MAM installation'
title: BIS/MAM installation
description: "Installation guide for the optional BIS Activity Monitor (MAM) and Local MAM (LMAM) components for BIS job scheduling with OpCon."
---

# BIS/MAM Installation

The BIS Activity Monitor (MAM) and Local MAM (LMAM) enable OpCon to schedule and monitor BIS background runs. This is an optional component — install it only if your site uses BIS and needs OpCon to manage BIS jobs.

:::info Note

Unisys OS 2200 LMAM version 3R1C requires BIS Level 38 or higher. The BIS Data drawer (Type) must be 132 characters in length.

:::

## Prerequisites

Before installing BIS/MAM, you must have already installed the LSAM (see [New Installation](new-installation) or [Upgrade](upgrade)) with the LMAM option set to **Y** during the INSTALL procedure.

Additionally, complete the following BIS preparation:

### 1. Determine MAM Cabinets and Drawers

Identify the MODE and TYPES (Cabinets and Drawers) to be used by MAM:
- The **Run Type** must have RIDs 1 through 14 available. The Run Type can be 80 characters.
- The **Data Type** must have RIDs 1 through 8 available. The Data Type must be 132 characters long.

### 2. Reserve a BIS Batchport

Verify that one BIS Batchport is available for *dedicated* use by MAM and obtain the name of the Batchport. A unique Batchport is required for each MAM that is installed.

### 3. Identify Error Message Terminal (Optional)

Identify a BIS terminal that may be used to receive error messages for Batchport errors and obtain the BIS station number for this terminal.

### 4. Register a BIS Sign-on

Register a BIS sign-on to be used by MAM to access each department required for starting BIS runs. This sign-on must allow the following functions:
- **During installation:** RET, REP
- **During operation:** ELT, COR, LGL, RS

A unique BIS sign-on and department is required for each MAM installed within a BIS System.

### 5. Register MAM Runs

Register the following runs for MAM's department:

| Name | Background | User | RID | I/O | LLP | Modes |
| ---- | ---------- | ---- | --- | --- | --- | ----- |
| MAM | N | Unique User per MAM | 2 | Unlimited | Unlimited | All |
| MAMSTR | N | Unique User per MAM | 4 | 1000 | 1000 | All |
| MAMSTP | Y | | 5 | 1000 | 1000 | All |
| MAMNOT | Y | | 6 | 1000 | 1000 | All |
| MAMINSTAL | N | Unique User per MAM | 7 | 1000 | 1000 | MAM's mode |
| MAMMSG | Y | | 8 | 1000 | 1000 | MAM's mode |
| MAMTEST1 | Y | | 9 | 1000 | 1000 | MAM's mode |
| MAMTEST2 | Y | | 10 | 1000 | 1000 | MAM's mode |
| MAMTEST3 | Y | | 11 | 1000 | 1000 | MAM's mode |
| MAMFIN | Y | | 12 | 1000 | 1000 | All |
| MAMBACKUP | Y,N* | | 14 | 1000 | 1000 | MAM's mode |
| MAMRESTORE | N | | 13 | 1000 | 1000 | MAM's mode |

:::info Note

SMA recommends MAMBACKUP be registered as both a Background and Foreground run to allow use from a terminal and allow starting by OpCon for regularly scheduled backups.

:::

## Step 1: Generate MAM Modules

Set the LSAM qualifier and run the MAM generation procedure:

```
@QUAL <qualifier>
@ADD *SKDPRG.MAM/GEN
```

The procedure prompts for the following information:

### MAM Site-ID

```
Enter SITE-ID for this MAM <x>:
```

Each MAM must have a unique SITE-ID. This is a single character: 0-9 or A-Z (except T and U). The SITE-ID identifies which MAM BIS jobs are distributed to.

### BIS Data Drawer

```
Enter BIS Drawer for MAM data <x>:
```

Enter the Drawer (Type) letter for MAM's Data Drawer. Valid values: B, C, D, E, F, G, H, or I.

### User-ID Options

```
Use different User-IDs to start runs with <N>?
```

- **N** (default): MAM uses its own User-ID to start all runs.
- **Y**: MAM can start runs using different User-IDs. A RID is used to contain OpCon Job-IDs, User-IDs, and Passwords for specific jobs.

### Run Monitoring Strategy

```
Monitor runs by User/Run-Name/Terminal <Y>?
```

- **Y** (default): Monitor runs by User/Run-Name/Terminal.
- **N**: Monitor by User/Terminal only (allows runs to LNK and RUN other runs). For User/Terminal monitoring, the JOB/USER capability should be used.

### MAMFIN Usage

```
Do you wish to use MAMFIN <N>?
```

- **N** (default): Do not use MAMFIN for run termination notification.
- **Y**: Runs can provide termination notification via MAMFIN. If Y, a follow-up prompt asks:

```
Use only MAMFIN to determine termination status <N>?
```

- **N**: MAM also searches the Accounting Log for termination status when no MAMFIN entry is found (useful when not all runs use MAMFIN).
- **Y**: Only MAMFIN entries determine run termination status.

After completion, the following message is displayed:

```
MAM x IS NOW READY TO BE INSTALLED IN BIS
```

## Step 2: Install MAM in BIS

1. Sign on to BIS using the MAM sign-on.
2. Enter `RET P` and provide the following:

| Field | Value |
| ----- | ----- |
| Qualifier | `<lsam-qualifier>` |
| File Name | `SKDPRG` |
| Element | `MAMINSTAL` |
| BIS Format | `N` |
| Add Headings | `Y` |
| Drawer | `<MAM's Run Drawer (Type)>` |

3. Replace the result into RID 7 of MAM's Run Drawer (Run Type).
4. Enter `MAMINSTAL` and check the terminal for errors.

## Multiple MAMs

Sites using multiple MAMs must repeat the [Generate MAM Modules](#step-1-generate-mam-modules) and [Install MAM in BIS](#step-2-install-mam-in-bis) procedures for each MAM to be installed. Each MAM requires:
- A unique SITE-ID
- A unique BIS Batchport
- A unique BIS sign-on and department

## BIS Run Restrictions

The following restrictions pertain to all BIS runs started by the LMAM:

- The run must be registered as a background run.
- The run is subject to all restrictions of a background run (refer to the Run Designers Reference).
- The run cannot use the RUN command to restart itself.
- The run may use the LNK and RUN commands when the linked-to or started run is not monitored by MAM, or when the "Track Runs by USER/TERMINAL" option is selected during installation.
- If the run uses an RER (Runtime Error Recovery), the RER must put an entry in the Batchport error RID immediately upon branching to the RER routine. Otherwise, the run is considered a normal termination. The entry must be the first thing the RER processes.

:::info Note

When entering error messages in the Error RID, follow standard BIS conventions and include tab characters between fields. Failing to include tabs in the proper locations results in inaccurate error reporting.

:::
