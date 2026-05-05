---
sidebar_label: 'Overview'
title: Configuration overview
description: "Overview of OS 2200 LSAM configuration, covering the configuration program, critical settings, and optional feature setup."
---

# Configuration Overview

## What is it?

The configuration section covers all parameters that control how the OS 2200 LSAM operates: its connection to OpCon, security credentials, job limits, console message behavior, and optional features such as JORS and BIS. The LSAM configuration file contains information needed to set the correct options for the LSAM's communication with SMANetCom and to activate optional features. Configuration must be reviewed and set before the LSAM is started for the first time, and must be updated whenever network settings, credentials, or optional features change.

All configuration changes are made through the `LSAMCFG/ECL` configuration program, which stores values in the LSAM TIP communications file.

## Critical settings

The following parameters *must* be correct before starting the LSAM for the first time:

| Parameter | Purpose |
| --------- | ------- |
| RSI User-ID | Provides the user-ID and password for the LSAM to establish a DEMAND session. The absence of a valid user-ID/password diminishes the LSAM's job starting and monitoring capabilities. |
| Default User-ID for ST keyin | Provides a default user-ID used by the LSAM when issuing a console ST command for jobs that do not have user-IDs. |
| Default Account for ST keyin | Provides a default account used by the LSAM when issuing a console ST command for jobs that do not have an account. The Default User-ID must be valid for the Default Account. |
| TSU Process Name and Password | Provides the information needed to establish network communications through either CMS-1100 or CpComm. Invalid or missing Process name or password causes the LSAM and associated programs to terminate. |
| Host Machine Name | Defines the batch job machine. Must match the Host Name on the [Machines screen](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Managing-Machines) of the Enterprise Manager. |
| Host Machine Max Jobs | Determines the maximum number of jobs the LSAM is allowed to process concurrently. |
| Port Number | Defines the port for communication between the LSAM and SMANetCom. |

## Run the Configuration Program

1. Set the LSAM file qualifier: `@QUAL [LSAM-qualifier]`
2. Start the configuration procedure. From a DEMAND session, enter:
   `@ADD *SKDPRG.LSAMCFG/ECL`
3. At the prompt, enter the line number for the configuration value to change. Refer to the [Configuration Settings](configuration-settings.md) tables for help with setting the values.
4. Transmit the screen.
5. Enter the new value for the selected item.
6. Transmit the screen.
7. Repeat steps 3–6 as necessary to set all values for the local configuration.
8. After all desired updates have been entered, transmit a blank entry.
9. A prompt of `UPDATE OR CANCEL (UPD TO UPDATE, XMIT TO CANCEL)` is presented. Enter `UPD` and transmit to save the changes. Transmitting a blank entry does *not* save the changes.

## In this section

- [Configuration Settings](configuration-settings.md) — complete list of all configuration parameters and valid values
- [Page One Settings](page-one-settings.md) — primary LSAM configuration parameters
- [Page Two Settings](page-two-settings.md) — secondary LSAM configuration parameters
- [Console Message Display Level](console-message-display-level.md) — controls which job status messages appear on the system console
- [Configure BIS](configure-bis.md) — BIS/MAM-specific configuration parameters
- [Configure JORS](configure-jors.md) — Job Output Retrieval System configuration
- [Additional Settings](additional-settings.md) — advanced configuration options

## Frequently Asked Questions

**When do I need to re-run LSAMCFG?**

Run `LSAMCFG/ECL` any time a critical network or security parameter changes: the OpCon server address, port number, machine name, RSI user-ID or password, or CpComm/CMS process credentials. Optional features such as JORS or SMAMSC also require configuration changes to enable.

**Do configuration changes take effect immediately?**

No. Configuration changes are written to the TIP file and take effect the next time the LSAM is started. The LSAM must be stopped and restarted for changes to apply.

**Can I back up and restore configuration parameters?**

Yes. The LSAM provides `LPARMINI/ECL` to initialize the Configuration Parameters Backup file and `LPARMRES/ECL` to restore saved configuration values. SMA recommends running a configuration update immediately after initializing the Backup file to establish a known-good baseline. See [Additional Features](../additional-features.md) for details.
