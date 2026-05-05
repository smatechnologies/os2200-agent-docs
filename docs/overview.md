---
sidebar_label: 'OS2200 Agent'
title: OS 2200 Agent overview
description: "Overview of the OS 2200 LSAM and BIS LMAM OpCon agents for scheduling OS 2200 and BIS jobs within a Unisys environment."
---

# OS 2200 Agent

## What is it?

The OS 2200 LSAM (Local Schedule Activity Monitor) and BIS LMAM are OpCon agents that connect a Unisys OS 2200 system to OpCon for automated job scheduling and monitoring. The agents allow OpCon to start, track, and report on OS 2200 batch jobs and BIS jobs from a central schedule.

The agent suite includes several components that work together:

- **LSAM** — the core agent that communicates with OpCon and manages OS 2200 batch job execution
- **XFRTCP** — the TCP/IP communications program that handles network traffic between the OS 2200 and OpCon's SMANetCom
- **SMAJOR (JORS)** — the Job Output Retrieval System component that makes job output viewable from the OpCon interface
- **LMAM / BIS MAM** — *(optional)* supports scheduling and monitoring of BIS jobs

:::info Note

**Windows File Names**

Some systems will not allow long file names (e.g., `C:\Program Files\OpConxps\`). To work around this, revert to method 8.3. In this method, the 7th character becomes a tilde followed by a 1 (e.g., `C:\Progra~1\OpConxps\`).

:::

## Frequently Asked Questions

**What Unisys platforms does the OS 2200 Agent support?**

The OS 2200 LSAM and BIS LMAM support Unisys OS 2200 and BIS environments. The agent communicates with OpCon via TCP/IP using either CMS-1100 or CpComm network services.

**Is BIS/MAM support required?**

No. BIS/MAM support is optional. You can install the LSAM without the LMAM/MAM components if you only need to schedule OS 2200 batch jobs.

**What is the maximum number of concurrent jobs?**

The maximum number of concurrent jobs is configured via the LSAM configuration parameter "Host Machine Max Jobs." The appropriate value depends on your system capacity and is set during initial configuration.

**Can the LSAM transfer files to and from other systems?**

Yes. The OS 2200 LSAM includes an SMA File Transfer feature (SMAJOR/SMAFTA) for both inbound and outbound file transfers in ASCII format. A separate FTP interface (FTPAPI) is also available for transfers using Unisys CpFTP. See [File Transfer](./file-transfer) and [FTPAPI](./ftpapi) for details.

**What happens to running jobs if the LSAM is stopped?**

Jobs that are actively running continue to execute on the OS 2200 system. When the LSAM is restarted, it reports the final status of those jobs back to OpCon. SMA recommends holding or completing schedules before stopping the LSAM to avoid jobs being left in a "running" state in OpCon.

**Where are the LSAM log files?**

Each LSAM component writes to a breakpoint file:
- `<qualifier>*BKLSAM` — LSAM log
- `<qualifier>*BKLMAM` — LMAM log
- `<qualifier>*BKXFRTCP` — XFRTCP log
- `<qualifier>*BKSMAJOR` — JORS/SMAJOR log

Log files cycle nightly at midnight. Use the `BRKPT` console command to manually cycle a log file.

## Glossary

| Term | Definition |
| ---- | ---------- |
| **LSAM** | Local Schedule Activity Monitor. The core OS 2200 agent program that communicates with OpCon and manages batch job execution. |
| **LMAM** | Local MAM (Monitor Activity Module). The optional LSAM component that provides BIS job scheduling support. |
| **MAM** | Monitor Activity Module. The BIS-side component that monitors BIS runs on behalf of LMAM. |
| **XFRTCP** | The TCP/IP communications program that manages the network connection between the OS 2200 and OpCon's SMANetCom. |
| **SMAJOR** | The JORS (Job Output Retrieval System) component. Manages job output retrieval and file transfer requests. |
| **SMAFTA** | SMA File Transfer Agent. The OS 2200 module that receives files transferred from other systems. |
| **SMAMSC** | SMA Monitor Services Connector. An optional component that interfaces with Unisys Monitor Services (MSCP) for enhanced job monitoring. |
| **FTPAPI** | SMA File Transfer Protocol Interface. Uses Unisys CpFTP to transfer files between OS 2200 and remote hosts. |
| **BIS** | Burroughs Information System. The BIS environment supported by LMAM/MAM. |
| **OpCon** | SMA Technologies' enterprise workload automation platform. The LSAM connects the OS 2200 to OpCon for centralized scheduling. |
| **SMANetCom** | The OpCon network communications component that the LSAM connects to via TCP/IP. |
| **TIP file** | The inter-process communication file used by the LSAM and XFRTCP to exchange job data on the OS 2200. |
| **JORS** | Job Output Retrieval System. Provides the ability to view OS 2200 job output from the OpCon Enterprise Manager interface. |
| **ECL** | Executive Control Language. The OS 2200 equivalent of a job stream or script. |
| **SKDPRG** | The program file that contains all LSAM executable elements and runstreams (e.g., `LSAM*SKDPRG`). |
