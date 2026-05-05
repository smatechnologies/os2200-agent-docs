---
sidebar_label: 'Overview'
title: Operations overview
description: "Overview of day-to-day OS 2200 LSAM operations: starting, stopping, status checking, and log management."
---

# Operations Overview

## What is it?

The operations section covers day-to-day management of the OS 2200 LSAM: starting and stopping components, checking status, controlling BIS MAM sites, cycling breakpoint log files, and issuing console commands to the LSAM, LMAM, XFRTCP, and JORS processes.

## In this section

- [Components](components.md) — complete list of all LSAM/LMAM modules and their functions
- [Operating the LSAM](operating-the-lsam.md) — procedures for starting, stopping, checking status, and cycling logs
- [Commands](commands.md) — console commands accepted by XFRTCP, JORS, and BIS MAM components

## Starting and stopping

The LSAM suite is designed to run continuously. SMA recommends stopping the LSAM only when all OpCon schedules requiring it are complete or placed in a Held state.

| Action | Command |
| ------ | ------- |
| Start all LSAM components | `ST LSAM` (from console, using START-UP/ECL in RUN$) |
| Stop LSAM gracefully | `*LSAM STOP` or `II LSAM STOP` |
| Terminate all LSAM runs | `*LSAM TERM` or `II LSAM TERM` |
| Check LSAM status | `*LSAM STATUS` or `II LSAM STATUS` |

## Log files

Each LSAM component writes to a breakpoint file that cycles nightly at midnight. Use the `BRKPT` command to manually cycle a log.

| Component | Log file |
| --------- | -------- |
| LSAM | `<qualifier>*BKLSAM` |
| LMAM | `<qualifier>*BKLMAM` |
| XFRTCP | `<qualifier>*BKXFRTCP` |
| SMAJOR (JORS) | `<qualifier>*BKSMAJOR` |

## Frequently Asked Questions

**What happens to running jobs when the LSAM is stopped?**

Jobs that are already executing on the OS 2200 continue to run. When the LSAM is restarted, it reports the final status of those jobs back to OpCon. To avoid jobs being left in a "running" state in OpCon, SMA recommends that all LSAM-started jobs be allowed to complete before stopping the LSAM.

**In what order should the LSAM components be started?**

XFRTCP must be started before JORS (SMAJOR). The LSAM and LMAM can be started in any order relative to each other, but XFRTCP must be active first. The `START-UP/ECL` runstream handles the correct start order automatically.

**How do I view a component's log while it is still running?**

Issue a `BRKPT` command to close the current cycle and open a new one (e.g., `*LSAM BRKPT`). The just-closed cycle (`BKxxxx(-1)`) can then be viewed or printed without stopping the LSAM.
