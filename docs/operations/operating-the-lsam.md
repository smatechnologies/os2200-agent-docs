---
sidebar_label: 'Operating the LSAM'
title: Operating the LSAM
description: "Day-to-day OS 2200 LSAM operations: starting and stopping components, checking status, controlling BIS MAM sites, and cycling breakpoint logs."
---

# Operating the LSAM

## What is it?

This page covers the day-to-day operations of the OS 2200 LSAM: starting and stopping components, checking status, controlling BIS MAM sites, and cycling breakpoint log files.

## Starting the LSAM/LMAM

### Start the LSAM/LMAM

Use one of the following methods to start the LSAM and/or LMAM:

1. If `*SKDPRG.START-UP/ECL` was copied to `SYS$LIB$*RUN$` during installation, start all components with a single console command:

   ```ST LSAM```

2. A DEMAND user with adequate privileges can enter:

   ```@ADD LSAM*SKDPRG.START-UP/ECL```

   :::info Note

   Due to specific Account/User requirements, the user starting these runs from DEMAND must have equivalent Account/User privileges.

   :::

3. Start each component individually from the console or via an @@CONS ST command:

   ```ST LSAM*SKDPRG.XFRTCP/ECL,,,<acct/user>```

   ```ST LSAM*SKDPRG.LSAM-RUN/ECL,,,<acct/user>```

   ```ST LSAM*SKDPRG.LMAM-RUN/ECL,,,<acct/user>```

### Start JORS

Use one of the following methods to start JORS:

1. If `*SKDPRG.STSMAJOR/ECL` was copied to `SYS$LIB$*RUN$` during installation:

   ```ST JORS```

2. Start the run directly from the console or via an @@CONS ST command:

```

ST LSAM*SKDPRG.SMAJOR/ECL,,,<acct/user>

```

:::warning 

The XFRTCP run must be active before starting JORS. 

When XFRTCP is started while JORS is running, the JORS run will error terminate with a Common Bank Reload Error status. 

To terminate JORS, use the Console Keyin "*JORS STOP".

JORS can be restarted after XFRTCP has initialized the LSAM Common Data Bank.

:::

## Controlling MAM Status

### Bring Up a BIS Site

Enter one of the following:

- `II LMAM UPMAM<site id>`
- `*LMAM UPMAM<site id>` (using the `*LMAM` console keyin)

### Bring Down a BIS Site

Enter one of the following:

- `II LMAM DNMAM<site id>`
- `*LMAM DNMAM<site id>` (using the `*LMAM` console keyin)


## Checking LSAM/LMAM Status

### Check LSAM Status

Enter one of the following:

- `II LSAM STATUS` — lists LSAM status and version numbers for LSAM and XFRTCP
- `*LSAM STATUS` — using the console keyword defined in configuration

### Check LMAM Status

Enter one of the following:

- `II LMAM STATUS` — lists LMAM status and version numbers for LMAM and XFRTCP
- `*LMAM STATUS` — using the console keyword defined in configuration

## Stopping the LSAM/LMAM

Stopping an LSAM or an LMAM leaves the communication program (XFRTCP) in contact with the SAM so that the remaining components continue to process.

SMA suggests processes **not** be stopped unless all OpCon/xps schedules requiring these processes are complete, or in a "Held" state. When either component is stopped while jobs are being executed, the jobs remain in a "running" state according to SAM. When the component is brought back up, SAM is notified of the status of the job. This can be avoided by insuring the schedules are complete, or placed in a "HOLD" status, prior to shutting down a component.

### Stop an Individual LSAM

Enter one of the following:

- `II LSAM STOP`
- `*LSAM STOP`

### Stop an Individual LMAM

When an LMAM is stopped, all associated MAMs are also stopped. Enter one of the following:

- `II LMAM STOP`
- `*LMAM STOP`

## Terminating an LSAM/LMAM

Enter one of the following to terminate all LSAM/LMAM runs:

- `II <run-id> TERM`
- `*LSAM TERM` or `*LMAM TERM` (using the configured console keyword)

This terminates LMAM, LSAM, XFRTCP, SMAJOR, and MAM. When either LSAM/LMAM or XFRTCP or SMAJOR does not terminate, an "E" command may be used. Once all have terminated, the above start statements may be used to restart the runs.

Each time LSAM/LMAM, XFRTCP, and SMAJOR are started, a new cycle of the breakpoint files are cataloged. 

These files are named: ```<LSAM qualifier>*BKLSAM```, ```<LSAM qualifier>*BKLMAM```, ```<LSAM qualifier>*BKXFRTCP```, and ```<LSAM qualifier>*BKSMAJOR``` respectively. 

Also, each night at midnight, the breakpoint files are closed and a new cycle of the files created and opened for use; this allows past days of breakpoint files to be viewed without terminating LSAM or LMAM (refer to the BRKPT command below for viewing current day breakpoint files). 

## Cycling the Breaking Points

The breakpoint files for the LSAM, the LMAM, XFRTCP, and SMAJOR can be cycled with the BRKPT command. 

The BRKPT command closes the current cycle of the ```BKxxxx``` file and opens a new cycle of the breakpoint file. 

Once this command completes, the ```BKxxxx(-1)``` file is the one just closed and may be viewed or printed; the``` BKxxxx(-0)``` file is the current breakpoint file in use.

:::tip Example

The following examples show how to close current cycles and open new cycles of the LSAM breakpoint files:

```*LSAM BRKPT``` closes the current cycle of the ```<LSAM qualifier> *BKLSAM``` file, and creates and opens a new cycle of the file.

```*LMAM BRKPT``` closes the current cycle of the ```<LSAM qualifier> *BKLMAM``` file, and creates and opens a new cycle of the file.

:::



