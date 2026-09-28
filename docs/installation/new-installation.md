---
sidebar_label: 'New installation'
title: New installation
description: "Step-by-step guide for a first-time installation of the OS 2200 LSAM: uploading files, running INSTALL, initializing, registering TIP, and configuring."
tags:
  - Procedural
  - System Administrator
  - Agents
---

# New Installation

This guide walks through a first-time installation of the OS 2200 LSAM. If you are upgrading an existing LSAM, refer to the [Upgrade](upgrade.md) guide instead.

## Before You Begin

1. Complete all [Prerequisites](preparing-the-installation.md) and fill out the [Installation Parameters Worksheet](installation-parameters-worksheet.md).
2. Ensure the CMS or CpComm PROCESS for the LSAM has been defined and activated.
3. Confirm the TIP file number has been designated for LSAM use.

## Step 1: Upload the LSAM File

Transfer the LSAM file from the OpCon installation media to the OS 2200 system via FTP.

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

:::tip Example

```
PUT LSAM LSAM*22R1A
```

:::

:::info Note

When using the CPFTP program, enter `QUOTE SITE TASC` before the PUT command. If errors occur or zero bytes are transferred, repeat the FTP procedure.

:::

## Step 2: Catalog SKDPRG and Copy Elements

From a DEMAND terminal on the OS 2200 system:

1. Catalog the SKDPRG program file. The minimum file size is 400 tracks; recommended maximum is 1024 tracks.

```
@CAT,PV <lsam-qualifier>*SKDPRG(+1).,FMD/400/TRK/1024,<packid>
```

2. Copy the elements from the uploaded file to the new SKDPRG cycle:

```
@COPY,P <lsam-qualifier>*<LSAM-VERSION>.,<lsam-qualifier>*SKDPRG.
```

## Step 3: Run the INSTALL Procedure

Set the LSAM qualifier and start the interactive installation:

```
@QUAL <qualifier>
@ADD *SKDPRG.INSTALL
```

:::info Note

To abort the installation at any prompt, enter `@EOF`. This produces an SSG error message and terminates the process.

:::

The procedure prompts for parameters in four groups. Respond to each prompt or press Enter/transmit to accept the displayed default.

### System Parameters

| Prompt | Description |
| ------ | ----------- |
| `Enter account/userid to use for LSAM runs` | Account code and userid for LSAM batch runs |
| `Enter Project Id to use for LSAM runs` | Project identifier stored in `INSTALL/SGS` (default: `LSAM`). The generated runstreams use the LSAM qualifier as the project ID on their `@RUN` statements. |

### Installation Options

| Prompt | Description |
| ------ | ----------- |
| `Do you want to install LSAM? (Y,N) <Y>` | **Y** to install the new release. N to recompile only. |
| `Do you want to install the Auto-Action Message System (AMS)? (Y/N)` | Y to install AMS. The default is N. |
| `Do you want to install the Standard AMS or IRS AMS? (STD,IRS)` | Displayed only when you install AMS. Enter STD for the standard AMS or IRS for the IRS AMS. The default is STD. |
| `Do you want to install the Media Allocation Subsystem? (Y,N)` | Y to install the Media Allocation Subsystem (MASS). The default is N. |
| `Do you want to install the LSAM Mapper feature? (Y,N)` | Y to generate LMAM/MAM modules. N to skip BIS support. |
| `Enter LSAM TIP file number (4 digits)` | Local TIP file number dedicated to LSAM (default: 0021). The value must be 4 digits and greater than 0; otherwise the installer displays `LSAM TIP file number MUST BE 4 DIGITS & > 0` and prompts again. |
| `Enter the local name for the LSAM NCCB data bank` | Name for the non-configured common bank (default: `<qualifier>CDB`) |
| `Enter the local NCCB file for the LSAM data bank` | Exec file (without qualifier) containing the NCCB template |

### Compile/Collection Parameters

| Prompt | Description |
| ------ | ----------- |
| `Are you using the Flagging COBOL compiler? (Y,N)` | Y for Flagging compiler with standard ANSI conventions |
| `Is the LSAM communications PROCESS defined in CMS? (Y/<N>)` | Y for CMS, N for CpComm. The default is N. If you enter Y, the installer asks `Use Default CMS Library? (Y/N) <Y>`; enter N to supply a CMS library file name. If you enter N, the installer requests the CpComm library file name. |
| `Enter file name containing TIP relocatable library` | File with TIP relocatables (default: `TIP$*TIPLIB$`) |
| `Enter file name containing TIP absolutes` | File with TFUR/TREG absolutes (default: `TIP$*TIPRUN$`) |
| `Enter COBOL I-Bank start address at your site` | Use `022000` for common-banked (recommended) or `01000` for non-common-banked. See [Non-Common Banked Program Collection](installation-reference.md#non-common-banked-program-collection) for details on 01000. |
| `Enter ACOB DML Library file name` | File with CBEP$$ACOB element (default: `SYS$LIB$*ACOB-DML`). Displayed only when the I-Bank start address is not `01000`. |

### File Placement Parameters

For each system file, the installer prompts:

```
Enter the device type,pack for the <file-name> file: <type,pack>
```

The displayed default is the file's device type and pack, for example `<F,FIX>` or `<FMD,FIX>`. In the pack field, `FIX` means that no pack-ID is used when the file is cataloged.

Respond with:
- A device type and Pack-ID (e.g., `FMD,PACK01`)
- A device type and `FIX` (e.g., `F,FIX`) to catalog the file without a pack
- Press Enter to accept the displayed default
- `ALL` to apply the last entered device/pack to all remaining files

For a description of each file, refer to the [Installation Reference](installation-reference.md#lsam-system-files).

## Step 4: Run the Installation

When the setup completes, the installer displays the command to run. Run the generated installation runstream from a DEMAND terminal:

```
@ADD,L *SKDPRG.INSTALL/ECL
```

Review the LSAM-PRINT file for any errors. If errors occur, correct the issue and re-run the procedure.

:::info Note

After completion, the parameters you entered are stored in the `INSTALL/SGS` element for future reference and upgrades.

:::

## Step 5: Initialize Files and Runstreams

```
@QUAL <qualifier>
@ADD *SKDPRG.INITIALIZE
```

Review the INIT-PRINT file to ensure there are no errors. If errors are found, correct them and re-run the initialization.

## Step 6: Create and Register the TIP File

The LSAM uses a TIP file to communicate with the XFRTCP batch run. It must be registered to TIP before starting the LSAM.

For **TFUR/TREG** users:

```
@QUAL <lsam-qualifier>
@ADD *SKDPRG.TIPREG/ECL
```

For **FREIPS** users:

```
@QUAL <lsam-qualifier>
@ADD *SKDPRG.FTIPREG/ECL
```

When prompted:
- **TIP COMM File name** — enter the file name (default: `LSAMCOMM`)
- **Device Pack-ID** — enter the device specification (e.g., `F` or `F70M,PAK001`)

## Step 7: Configure the LSAM

Run the configuration procedure to set runtime parameters (machine name, port number, CpComm/CMS process name, console keyins, etc.):

```
@QUAL <lsam-qualifier>
@ADD *SKDPRG.LSAMCFG/ECL
```

For details on each configuration parameter, refer to [Configuration Overview](../configuration/overview.md).

:::caution

You must configure the LSAM before starting it for the first time.

:::

## Step 8: Modify Runstreams

Review and modify the generated ECL runstreams for your site requirements. Modifications are required when:
- The LSAM account does not allow Real-Time priority
- Real-Time is not to be used
- A Real-Time priority level other than 35 is desired

### START-UP/ECL

The START-UP/ECL runstream provides a convenient way to start all LSAM components with a single command.

For an LSAM-only installation:
```
@RUN STLSAM,acct/user,<qualifier>
@QUAL <qualifier>
@START *SKDPRG.LSAM-RUN/ECL
@START *SKDPRG.XFRTCP/ECL
@FIN
```

For an LSAM + LMAM installation:
```
@RUN STLSAM,acct/user,<qualifier>
@QUAL <qualifier>
@START *SKDPRG.LSAM-RUN/ECL
@START *SKDPRG.XFRTCP/ECL
@START *SKDPRG.LMAM-RUN/ECL
@FIN
```

Copy the START-UP/ECL element to `SYS$LIB$*RUN$` with a short name (e.g., `LSAM`) so you can start all runs with a single console command: `ST LSAM`.

### XFRTCP/ECL

- To disable Real-Time, remove the `R` option from `@XQT,CHR XFRTCP` (resulting in `@XQT,CH XFRTCP`).
- To change the Real-Time priority, modify the `TIPFILE <TIP-file-number> 35` parameter to use the desired priority (valid values: 02-35).

### LSAM-RUN/ECL and LMAM-RUN/ECL

- To disable Real-Time, remove the `R` option from `@XQT,R LSAM` (or `@XQT,R LMAM`).
- To change the Real-Time priority, modify the parameter line that follows the `@XQT` statement. In these runstreams, the line contains the TIP file number and the priority, with no `TIPFILE` keyword (for example, `<TIP-file-number> 35`).

### STSMAJOR/ECL (JORS)

The JORS batch account requires the SSSMOQUE security attribute.

1. Edit the `@RUN` statement in STSMAJOR/ECL to use the appropriate account and userid:

```
@RUN SMAJOR,<account>/<userid>,<qualifier>
```

2. Copy to `SYS$LIB$*RUN$` for easy console access:

```
@COPY,S *SKDPRG.STSMAJOR/ECL,SYS$LIB$*RUN$.SMAJOR
```

## Step 9: Install BIS/MAM (Optional)

If you need BIS job scheduling support, proceed to [BIS/MAM Installation](bis-mam-installation.md).

## Step 10: Start the LSAM

Start all LSAM components using the START-UP/ECL runstream:

```
ST LSAM
```

Or start each component individually using the `@START` commands listed in your START-UP/ECL.

Verify the LSAM connects to OpCon by checking the console messages and enabling communications in the OpCon Enterprise Manager. Refer to [Operating the LSAM](../operations/operating-the-lsam.md) for ongoing operations guidance.
