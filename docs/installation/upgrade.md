---
sidebar_label: 'Upgrade'
title: Upgrade
description: "Step-by-step guide for upgrading an existing OS 2200 LSAM to a new release."
---

# Upgrade

This guide walks through upgrading an existing OS 2200 LSAM to a new release. If you are installing the LSAM for the first time, refer to the [New Installation](new-installation) guide instead.

## Before You Begin

1. Review the installation parameters (`INSTALL/SGS`) for your current installation. Note the option settings and file placement of all system files.
2. Enter `@PRT,F` for each system file to identify the current file specifications (especially device types). The new installation should match these specifications.
3. Review any special instructions provided with the new release. New modules may require additional preparation.
4. Complete the [Installation Parameters Worksheet](installation-parameters-worksheet) with your current values and any planned changes.

## Step 1: Stop the LSAM/LMAM

1. Terminate communications between the OpCon server and the OS 2200 LSAM. In the OpCon Enterprise Manager, stop the machine communication. Refer to [Adjusting Stop/Start Communication with Machines](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Adjusting-Stop_Start-Communication) for details.

2. From a DEMAND terminal with console keyin privileges (or from the system console), issue one of the following commands to terminate the LSAM:

```
@@CONS *LSAM TERM
```

or:

```
@@CONS II LSAM TERM
```

:::info Note

The exact keyin may differ based on local configuration. The `*LSAM` console keyin may have been customized, and the `II LSAM TERM` command requires the current Run-ID of the LSAM (e.g., `II LSAMA TERM`).

:::

3. Confirm all LSAM components (LSAM, XFRTCP, LMAM, SMAJOR) have terminated before proceeding.

## Step 2: Upload the New LSAM File

Transfer the new LSAM file from the OpCon installation media to the OS 2200 system via FTP.

From a Windows command prompt:

```
E:
CD "INSTALL\LSAM\Unisys OS 2200 LSAM\<LSAM-VERSION>"
FTP <TCP/IP address of OS 2200 system>
```

Sign on with a valid userid/password, then transfer the file:

```
BIN
PUT LSAM <lsam-qualifier>*<LSAM-VERSION>
BYE
```

:::info Note

When using the CPFTP program, enter `QUOTE SITE TASC` before the PUT command. If errors occur or zero bytes are transferred, repeat the FTP procedure.

:::

## Step 3: Catalog SKDPRG and Copy Elements

From a DEMAND terminal on the OS 2200 system:

1. Catalog a new cycle of the SKDPRG program file:

```
@CAT,PV <lsam-qualifier>*SKDPRG(+1).,<device-specifications>
```

:::caution

The device specifications **must match** the existing SKDPRG file specifications.

:::

2. Copy the elements from the uploaded file to the new SKDPRG cycle:

```
@COPY,P <lsam-qualifier>*<LSAM-VERSION>.,<lsam-qualifier>*SKDPRG.
```

## Step 4: Run the INSTALL Procedure

Set the LSAM qualifier and launch the interactive installation:

```
@QUAL <qualifier>
@ADD *SKDPRG.INSTALL
```

When the installer detects a previous installation, it displays:

```
Installation Parameters for Release xxxx found,
Do you want to use those parameters as defaults? (Y,N)
```

Respond **Y** to use your existing parameters as defaults. Each prompt will display the prior value — press Enter to accept it, or enter a new value to change it.

:::info Note

To abort the installation at any prompt, enter `@EOF`.

:::

The procedure prompts for the same four parameter groups as a new installation (system parameters, installation options, compile/collection parameters, and file placement). For details on each prompt, refer to [New Installation - Step 3](new-installation#step-3-run-the-install-procedure).

## Step 5: Execute the Installation

Run the generated installation runstream:

```
@ADD *SKDPRG.INSTALL/ECL
```

Review the LSAM-PRINT file for any errors. If errors occur, correct the issue and re-run the procedure.

## Step 6: Initialize Files and Runstreams

```
@QUAL <qualifier>
@ADD *SKDPRG.INITIALIZE
```

Review the INIT-PRINT file to ensure there are no errors.

## Step 7: Initialize the TIP File

For an upgrade, use `XFRINI/ECL` to initialize the job communication portion of the TIP file while **preserving your existing configuration data**:

```
@QUAL <lsam-qualifier>
@ADD *SKDPRG.XFRINI/ECL
```

:::info Note

Only use `TIPREG/ECL` (or `FTIPREG/ECL`) if you are changing the file placement information or the TIP file number. Otherwise, `XFRINI/ECL` is sufficient and preserves your configuration.

:::

## Step 8: Review Runstreams

Review the generated runstreams (START-UP/ECL, XFRTCP/ECL, LSAM-RUN/ECL) and verify they still reflect your site requirements. If a new release introduces changes to the runstream templates, you may need to re-apply any local customizations.

For details on runstream modifications, refer to [New Installation - Step 8](new-installation#step-8-modify-runstreams).

## Step 9: Update BIS/MAM (Optional)

If you use BIS/MAM and the new release includes MAM updates, refer to [BIS/MAM Installation](bis-mam-installation) to regenerate and reinstall the MAM modules.

## Step 10: Restart the LSAM

Start all LSAM components:

```
ST LSAM
```

Re-enable communications between the OpCon server and the OS 2200 LSAM in the Enterprise Manager. Verify the LSAM connects successfully by checking the console messages.
