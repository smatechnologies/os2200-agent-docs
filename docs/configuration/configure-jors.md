---
sidebar_label: 'Configure JORS'
title: Configure Job Output Retrieval System (JORS)
description: "Configure JORS port, console keyin, privilege level, and file transfer security settings for the OS 2200 LSAM."
tags:
  - Procedural
  - System Administrator
  - Agents
---

# Configure Job Output Retrieval System (JORS)

Item 17 on page two of the configuration contains parameters for the Job Output Retrieval System (JORS) and File Transfer capabilities. The configurable parameters are:

* The JORS Port Number: This value may be the same as the LSAM Port Number (option 9 on the first page of configuration parameters) or it may be different. The default is zero. Setting the JORS Port Number to zero defaults to the LSAM Port Number. This Port Number must match the JORS Port Number defined in the OpCon/xps Enterprise Manager (Menu path: Administration > Machines > Advanced Settings Panel > Communication Settings).

:::info Note

The JORS Port Number must be set in both the LSAM Configuration and the advanced machine setting in the UI. Modifying this parameter requires XFRTCP to be stopped and restarted. For more information, refer to [Configuring Advanced Machine Parameters and Properties](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Configuring-Advanced-Machine-Properties) in the Enterprise Manager online help.

:::

* JORS Console Keyin: This value is the reserved word used for console commands to use the JORS batch run (SMAJOR).
    * The default is `*JORS`.
    * (Optional) Change the installed default from *JORS to any unique eight-character keyin.
* Privilege for Keyin: This value, similar to other console keyins, defines the @@CONS capability required for users to use the JORS keyin. The following are valid values:
    * Console Only = 0
    * BASIC = 1
    * LIMITED = 2
    * FULL = 3
    * DISPLAY = 4
    * RESPONSE = 5

  The default is Console Only.

Enter the number of the corresponding @@CONS capability required of users.

:::tip Example

Enter **0** (zero) to restrict keyins to the system console only.

Enter **1** (one) to allow any user with any @@CONS capability to issue JORS keyins (users with BASIC cons or higher).

Enter **4** (four) to allow any user with DISPLAY or RESPONSE cons to issue JORS keyins.

:::

The configuration parameters of "Restrict to PRINT$ files only" and "Allow File Transfers out" are discussed below to aid in properly setting these parameters to meet site security requirements. By default, **Restrict to PRINT$ files only** is `Y` and **Allow File Transfers out** is `N`.

The Job Output Retrieval System (JORS) allows OpCon/xps users to retrieve and view files created by OpCon/xps jobs queued to a symbiont print queue; these files include PRINT$ files and other files which have been "symmed" to print queues. Retrievable files include files assigned to a symbiont print queue, but not being processed by an output writer program. The JORS batch job (SMAJOR) user-id requires the SSSMOQUE security privilege to accomplish this function.

The JORS system also processes files transferred out of the Unisys OS 2200 system. PRINT$ files can not be transferred. Files which have been "symmed" to symbiont print queues may be transferred only when the file is retrievable through the Master File Directory (MFD), meaning the file must have been "symmed" with the "@SYM,U" ECL command.

Files transferred into the Unisys OS 2200 system are processed by the File Transfer Agent (SMAFTA) program, which is initiated by starting an OpCon/xps File Transfer job identifying the Unisys OS 2200 system as the destination of the transferred file.

JORS and File Transfer capabilities may present some security concerns. The following table identifies combinations of JORS and File Transfer functions supported and provides the proper configuration parameters for each combination. The most secure configuration is to disallow both JORS and File Transfer.

## JORS Functions and Parameters

The table columns identify the following functions:

* Allow JORS PRINT$ Files: provides the capability of viewing PRINT$ files created by jobs queued to a symbiont print queue.
* Allow JORS All Files: provides the capability of viewing any file created by jobs that are queued to a symbiont print queue.
* Allow File Transfer In: provides the capability of transferring files into the Unisys OS 2200 system.
* Allow File Transfer Out: provides the capability of transferring files out of the Unisys OS 2200 system.
* LSAM Configuration Parameters (LSAMCFG): provides the setting of the Job Output Retrieval System configuration parameters to support the combination of JORS and File Transfer capabilities; these parameters are modified with the use of LSAMCFG/ECL.
* Additional Actions: actions, in addition to setting configuration parameters, required to properly support the JORS and File Transfer capabilities.

| Allow JORS PRINT$ Files | Allow JORS All Files | Allow File Transfer In | Allow File Transfer Out | LSAM Configuration Parameters (LSAMCFG) | Additional Actions |
| ------- | ------- | -------- | -------- | --------- | -------- |
| Yes | Yes | Yes | Yes | Configure JORS: <br></br> - Restrict to PRINT$ files = N <br></br> - Allow File Transfers Out = Y | Provide SSSMOQUE privilege for the SMAJOR batch job |
| Yes | Yes | Yes | No | Configure JORS: <br></br> - Restrict to PRINT$ files = N <br></br> - Allow File Transfers Out = N | Provide SSSMOQUE privilege for the SMAJOR batch job |
| Yes | Yes | No | Yes | Configure JORS: <br></br> - Restrict to PRINT$ files = N <br></br> - Allow File Transfers Out = Y | - Provide SSSMOQUE privilege for the SMAJOR batch job <br></br> - Remove SMAFTA absolute from *ABS file |
| Yes | Yes | No | No | Configure JORS: <br></br> - Restrict to PRINT$ files = N <br></br> - Allow File Transfers Out = N | - Provide SSSMOQUE privilege for the SMAJOR batch job <br></br> - Remove SMAFTA absolute from *ABS file |
| Yes | No | Yes | Yes |Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = Y | Provide SSSMOQUE privilege for the SMAJOR batch job |
| Yes | No | No | Yes | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = Y | - Provide SSSMOQUE privilege for the SMAJOR batch job <br></br> - Remove SMAFTA absolute from *ABS file |
| Yes | No | No | No | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = N | - Provide SSSMOQUE privilege for the SMAJOR batch job <br></br> - Remove SMAFTA absolute from *ABS file |
| No | No | Yes | Yes | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = Y | Remove SSSMOQUE privilege for the SMAJOR batch job |
| No | No | No | Yes | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = Y | - Remove SSSMOQUE privilege for the SMAJOR batch job <br></br> - Remove SMAFTA absolute from *ABS file |
| No | No | Yes | No | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = N | Remove SMAJOR absolute from *ABS file |
| No | No | No | No | Configure JORS: <br></br> - Restrict to PRINT$ files = Y <br></br> - Allow File Transfers Out = N | - Remove SMAJOR absolute from \*ABS file <br></br> - Remove SMAFTA absolute from \*ABS file |

When the "Allow File Transfers Out" parameter is "Yes", the network message packet size may be configured to optimize File Transfer messages for the local network. Allowed values are 0 (zero) and 1024 through 32768 characters. 

Entering zero will cause the message packet size to be calculated automatically from the network configuration data provided by the Communications Platform software as File Transfer sessions are initiated.

## File transfer TLS settings

When **16 - Use Network Security (TLS)** on page one is set to Yes, the JORS configuration screen shows two additional options:

* **6. Require SSL/TLS for File Transfers**: Enter `Y` to require TLS for file transfers, or `N` to allow file transfers that do not use TLS. The prompt is **Require SSL/TLS for File Transfers (Y/N)?**. Any value other than `Y` is stored as `N`. When this option is first initialized, it is set to `Y` if page one TLS is set to Yes.
* **7. File Transfer non-TLS Port**: This option is shown only when option 6 is set to `N`. At the **Enter the non-TLS Port number for File Transfers:** prompt, enter the port number to use for file transfers that do not use TLS. The default is zero.
