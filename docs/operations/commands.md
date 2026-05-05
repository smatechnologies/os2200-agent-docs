---
sidebar_label: 'Commands'
title: Commands
description: "Console commands for OS 2200 LSAM components: XFRTCP, JORS, communication file utilities, Common Data Bank, and BIS MAM."
---

# Commands

Console commands can be issued to each LSAM component using either the component's reserved keyin or the `II` (Interactivity Interrupt) command. Both forms are equivalent:

| Method | Example |
| ------ | ------- |
| Reserved keyin | `*XFRTCP STATUS` |
| II keyin | `II XFRTCP STATUS` |

The reserved keyins are configured in LSAMCFG. The defaults are `*LSAM`, `*LMAM`, `*XFRTCP`, and `*JORS`.

## XFRTCP Commands

| Command | Effect |
| ------- | ------ |
| `TERM` | Terminates XFRTCP and the associated LSAM, LMAM, and SMAJOR runs |
| `STOP` | Terminates XFRTCP and SMAJOR only — does not notify LSAM or LMAM to terminate |
| `STATUS` | Displays current network status |
| `BRKPT` | Cycles the XFRTCP breakpoint log file |

### TERM

Terminates XFRTCP and the associated LSAM, LMAM, and SMAJOR runs.

### STOP

Terminates XFRTCP and SMAJOR only. The LSAM and LMAM continue running but lose their network connection.

### STATUS

Displays current network status. Output format:

```
HOST: <OS 2200 host name> PORT: 9999
HOST: <BIS host name> PORT: 999
CURRENT CONNECTION: 001.002.003.004: 8888
LAST MSG RECVD: yymmdd, hhmmsstt
MSGS RCVD: 99,999 ACKS SENT: 99,999
MSGS SENT: 99,999 ACKS RCVD: 99,999
MSGS TO SEND: 0
SMAJOR IS ACTIVE AS RUNID SMAJOR
RELEASE LEVEL: xxxxx PROGRAM: XFRTCP/xxxxxx
COMMUNICATIONS INTERFACE: XFERIFxx/xxxxx
```

### BRKPT

Closes the current cycle of the `BKXFRTCP` breakpoint file and opens a new cycle. After the command completes:

- `BKXFRTCP(-1)` — the just-closed cycle, available for viewing or printing
- `BKXFRTCP(-0)` — the new current breakpoint file

:::tip Example

`*XFRTCP BRKPT` closes the current cycle of `<qualifier>*BKXFRTCP` and opens a new cycle.

:::

## JORS Commands

| Command | Effect |
| ------- | ------ |
| `TERM` | Terminates SMAJOR |
| `STOP` | Terminates SMAJOR |
| `STATUS` | Displays current JORS status |
| `BRKPT` | Cycles the JORS breakpoint log file |

:::info Note

For JORS, `TERM` and `STOP` have the same effect — both terminate only the SMAJOR run.

:::

### STATUS

Displays current JORS status. Output format:

```
MSGS RCVD: 999
MSGS SENT: 999 ACKS RCVD: 999
MSGS TO SEND: 0
RELEASE LEVEL: xxxxx PROGRAM: SMAJOR/xxxxxx
COMMUNICATIONS INTERFACE: XFERIFCx/xxxxx
```

### BRKPT

Closes the current cycle of the `BKSMAJOR` breakpoint file and opens a new cycle. After the command completes:

- `BKSMAJOR(-1)` — the just-closed cycle, available for viewing or printing
- `BKSMAJOR(-0)` — the new current breakpoint file

:::tip Example

`*JORS BRKPT` closes the current cycle of `<qualifier>*BKSMAJOR` and opens a new cycle.

:::

## Communications File Commands

The communication file requires no routine maintenance, but two utility programs are available.

### XFRINI

Initializes the job data portion of the communication file.

```
@ADD <LSAM qualifier>*SKDPRG.XFRINI/ECL
```

### XFRPRT

Prints the contents of the communication file.

```
@ADD <LSAM qualifier>*SKDPRG.XFRPRT/ECL
```

#### Remove Octal Format from the XFRPRT Report

By default, the report includes data in octal format. To remove it:

1. Locate the `@XQT XFRPRT` statement in the ECL.
2. Find the parameter statement immediately after it:

   ```
   TIPFILE nnnn O
   ```

   - `nnnn` — the local TIP file number
   - `O` — the octal report option flag

3. Remove the `O` flag:

   ```
   TIPFILE nnnn
   ```

:::info Note

To reactivate the octal report, add the `O` flag back to the parameter statement.

:::

## Common Data Bank Commands

### DUMPCDB

Prints the contents of the Non-configured Common Data Bank to `<qualifier>*DUMPCDB-PRT`. SMA Support uses this report when diagnosing reported problems.

### LOADCDB

Loads the Non-configured Common Data Bank into memory and initializes it for use by other LSAM modules. This runs automatically each time XFRTCP starts.

:::warning

Do not run LOADCDB manually unless directed by SMA Support. Running it while XFRTCP or JORS is active causes those programs to error terminate.

:::

```
@ADD <LSAM qualifier>*SKDPRG.LOADCDB/ECL
```

:::info Note

The user running this command requires the "Reload Common Bank" privilege (`SSRLODCB`).

:::

## MAM Component Commands

### MAMMSG

A BIS background run that reminds the console operator to start MAM (via the `UPMAMx` keyin to LMAM) each time BIS starts. Schedule this run in BIS to execute at each BIS initialization.

### MAMNOT

A callable BIS routine that sends events to OpCon. Any valid OpCon external event can be sent using MAMNOT.

Include the following in the run that will send the event:

```
@LDV <event-to-send>S80='<event syntax>'
@CALL,<c>,<d>,6 1 <event-to-send>
```

| Parameter | Description |
| --------- | ----------- |
| `<event-to-send>` | String variable (max 80 characters) containing the event to send |
| `<event syntax>` | Any valid OpCon event. Use `&` in place of commas due to BIS restrictions — for example, `$JOB:HOLD&<schedule name>&<schedule date>&<job name>` instead of `$JOB:HOLD,<schedule name>,<schedule date>,<job name>` |
| `<c>` | Cabinet (Mode) where MAM modules are installed and registered |
| `<d>` | Run Drawer (Type) where MAM runs are installed and registered |

The OpCon user-ID and password used by MAMNOT are stored in the MAM Configuration Report (RID 3, variable V074). Update this variable whenever credentials change.

Refer to [Introduction](https://help.smatechnologies.com/opcon/core/events/introduction) in the OpCon Events online help for valid event syntax.

### MAMFIN

A callable BIS routine that reports run termination status to MAM. When called, MAMFIN logs an entry in the MAMFIN Log Report (MAM's Data Drawer, RID 8). MAM uses this log to determine whether a run ended normally or in error.

There are two ways to call MAMFIN:

#### Option 1: @CALL

Include this statement immediately before run termination:

```
@CALL,<c>,<d>,12 1
```

| Parameter | Description |
| --------- | ----------- |
| `<c>` | Cabinet (Mode) where MAM modules are installed |
| `<d>` | Drawer (Type) where MAM runs are installed |

:::tip Example

```
@CALL,8,I,12 1
```

:::

#### Option 2: @LNK

The MAMFIN module can also be called with a link instruction:

```
@LNK,<errlbl> MAMFIN
```

| Parameter | Description |
| --------- | ----------- |
| `<errlbl>` | Run label to execute if MAMFIN cannot be linked to |

If MAMFIN errors during an `@LNK` call, the error routine (RER) returns:

```
STAT1$ = 1
STAT2$ = the contents of XERR$ at the time of the error
STAT3$ = the contents of XLINE$ where the error occurred
```

:::info Note

When using `@LNK`, the MAM installation configuration should track runs by **User/Terminal**. If MAM is configured to track by **User/Run Name/Terminal**, the `@LNK` call may appear to MAM as a run termination and could be reported as an error.

:::

### MAMBACKUP

A BIS module that saves all MAM BIS RIDs to an EXEC file. SMA recommends saving RID 5 (Job/User RID) after any modifications.

MAMBACKUP saves all run RIDs except RID 14 (the MAMBACKUP run control RID — BIS cannot save a RID containing an active run). RID 14 can be retrieved manually with the `ELT` command, or from the `*SKDPRG` file.

SMA recommends registering MAMBACKUP as both a Background and Foreground run so it can be used manually or scheduled automatically.

### MAMRESTORE

A BIS run that restores MAM RIDs from the EXEC file created by MAMBACKUP.

Do not restore RID 13 (MAMRESTORE) or RID 14 (MAMBACKUP) — both can be retrieved manually from `*MAM-x-BACKUP.R13` or from `*SKDPRG.MAMRESTORE` (or `MAMBACKUP`) as needed.

## Starting BIS Runs with a Specific User-ID

MAM can start BIS runs using a specific BIS User-ID rather than MAM's own user-ID. This feature must have been enabled during installation by responding **Y** to the prompt "Use different User-IDs to start runs with?". See [Prerequisites](../installation/preparing-the-installation#account-and-user-ids).

If MAM is already installed and you want to enable this feature, update MAM's Configuration Report (RID) directly.

### Enable Job-Specific User-IDs After Installation

1. In MAM's Run Drawer (Type), modify RID 3 to change variable V072 from `0` to `5`:

   :::tip Example

   Assuming MAM's Run Drawer is `C`, modify report `3C`:

   Before:
   ```
   @LDV,P  V072I5=0 . - RID FOR USERID/PASSWORD INFO (VER 8.00)
   ```

   After:
   ```
   @LDV,P  V072I5=5 . - RID FOR USERID/PASSWORD INFO (VER 8.00)
   ```

   :::

2. In MAM's Data Drawer (Type), update RID 5 (User-ID/Password report) to list the BIS User-IDs and passwords for each OpCon job that needs a specific user:

   ```
   *JOBNAME            USER-ID     PASSWORD    RESERVED FOR FUTURE USE
   *===============    ========    ==========  ======================================
   >>OpConJob-ID       >>BISUser   >>passwd    >>
   ```

   | Field | Description |
   | ----- | ----------- |
   | `OpConJob-ID` | 12-character OpCon job identifier (must be sorted alphabetically) |
   | `BISUser` | BIS User-ID to use when starting the run (max 10 characters) |
   | `passwd` | Password for the BIS User-ID (max 6 characters) |
   | `>>` | Represents a tab character |

   :::tip Example

   ```
   *JOBNAME            USER-ID     PASSWORD    RESERVED FOR FUTURE USE
   *===============    ========    ==========  ======================================
   >>ANALYSIS-A        >>BILLW     >>XYYZ1     >>
   >>BIG-REPORT        >>SALLY     >>SIMPLE    >>
   >>HOLIDAY           >>JOESMITH  >>JSTWO     >>
   >>JOB01             >>BATCHUSER >>BATCH     >>
   ```

   :::

   :::info Note

   This report must be kept in sorted order by Job Name. MAM searches it alphabetically when looking up a job-ID.

   :::

### Considerations

- This report contains passwords and must be protected accordingly. MAM's user-ID must have access.
- Local site personnel are responsible for maintaining sorted order and updating credentials when they change.
- Back up RID 5 after any updates using MAMBACKUP, local procedures, or manual ELT/RET. SMA recommends scheduling MAMBACKUP regularly with OpCon.
