---
sidebar_label: 'New installation'
title: New installation
description: "Step-by-step guide for a first-time installation of the OS 2200 LSAM: uploading files, running INSTALL, initializing, registering TIP, and configuring."
---

# New Installation

This guide walks through a first-time installation of the OS 2200 LSAM. If you are upgrading an existing LSAM, refer to the [Upgrade](upgrade) guide instead.

## Before You Begin

1. Complete all [Prerequisites](preparing-the-installation) and fill out the [Installation Parameters Worksheet](installation-parameters-worksheet).
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

Set the LSAM qualifier and launch the interactive installation:

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
| `Enter account/Userid to use for LSAM runs` | Account code and userid for LSAM batch runs |
| `Enter Project ID to be used for LSAM runs` | Project identifier for LSAM runstreams |

### Installation Options

| Prompt | Description |
| ------ | ----------- |
| `Do you want to install LSAM? (Y,N)` | **Y** to install the new release. N to recompile only. |
| `Do you want to install the LSAM BIS feature (LMAM)? (Y,N)` | Y to generate LMAM/MAM modules. N to skip BIS support. |
| `Enter the LSAM TIP communication file number (4 digits)` | Local TIP file number dedicated to LSAM (default: 0021) |
| `Enter the local name for the LSAM NCCB data bank` | Name for the non-configured common bank (default: `<qualifier>CDB`) |
| `Enter the local NCCB file for the LSAM data bank` | Exec file (without qualifier) containing the NCCB template |

### Compile/Collection Parameters

| Prompt | Description |
| ------ | ----------- |
| `Are you using the Flagging COBOL compiler? (Y,N)` | Y for Flagging compiler with standard ANSI conventions |
| `Is the LSAM communications PROCESS defined in CMS?` | Y for CMS, N for CpComm. Follow-up prompts request the library file name. |
| `Enter file name containing TIP relocatable library` | File with TIP relocatables (default: `TIP$*TIPLIB$`) |
| `Enter file name containing TIP absolutes` | File with TFUR/TREG absolutes (default: `TIP$*TIPRUN$`) |
| `Enter COBOL I-Bank start address at your site` | Use `022000` for common-banked (recommended) or `01000` for non-common-banked. See [Non-Common Banked Program Collection](installation-reference#non-common-banked-program-collection) for details on 01000. |
| `Enter ACOB DML Library file name` | File with CBEP$$ACOB element (default: `SYS$LIB$*ACOB-DML`) |

### File Placement Parameters

For each system file, the installer prompts:

```
Enter the device, type pack for the <file-name> file: <F,FIX>
```

Respond with:
- A device type and Pack-ID (e.g., `FMD,PACK01`)
- `FIX` for fixed mass storage
- Press Enter to accept the displayed default
- `ALL` to apply the last entered device/pack to all remaining files

For a description of each file, refer to the [Installation Reference](installation-reference#lsam-system-files).

## Step 4: Execute the Installation

Run the generated installation runstream:

```
@ADD *SKDPRG.INSTALL/ECL
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
@RUN STLSAM,acct/user,projid
@QUAL <qualifier>
@START *SKDPRG.LSAM-RUN/ECL
@START *SKDPRG.XFRTCP/ECL
@FIN
```

For an LSAM + LMAM installation:
```
@RUN STLSAM,acct/user,projid
@QUAL <qualifier>
@START *SKDPRG.LSAM-RUN/ECL
@START *SKDPRG.XFRTCP/ECL
@START *SKDPRG.LMAM-RUN/ECL
@FIN
```

Copy the START-UP/ECL element to `SYS$LIB$*RUN$` with a short name (e.g., `LSAM`) so you can start all runs with a single console command: `ST LSAM`.

### XFRTCP/ECL

- To disable Real-Time, remove the `R` option from `@XQT,R XFRTCP` (resulting in `@XQT XFRTCP`).
- To change the Real-Time priority, modify the `TIPFILE <TIP-file-number> 35` parameter to use the desired priority (valid values: 02-35).

### LSAM-RUN/ECL

- Same Real-Time modifications as XFRTCP/ECL apply to `@XQT,R LSAM` and its TIPFILE parameter.

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

If you need BIS job scheduling support, proceed to [BIS/MAM Installation](bis-mam-installation).

## Step 10: Start the LSAM

Start all LSAM components using the START-UP/ECL runstream:

```
ST LSAM
```

Or start each component individually using the `@START` commands listed in your START-UP/ECL.

Verify the LSAM connects to OpCon by checking the console messages and enabling communications in the OpCon Enterprise Manager. Refer to [Operating the LSAM](../operations/operating-the-lsam) for ongoing operations guidance.
