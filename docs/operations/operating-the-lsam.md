# Operating the LSAM 

## Starting the LSAM/LMAM

### Start the LSAM/LMAM

1. If the ```*SKDPRG.START-UP/ECL element was copied to SYS$LIB$*RUN$``` during the installation, the LSAM and/or LMAM can be started with the console command:
```ST< START-UP/ECL element in RUN$>```

:::tip Example 

ST LSAM

:::

- or -

2. A DEMAND user with adequate privileges can enter:

```@ADD LSAM*SKDPRG.START-UP/ECL```

:::info note 

Due to specific Account/User requirements, the user starting these runs from DEMAND must have the equivalent Account/User privileges.

:::

- or -

3. SMA recommends these runs be started from the console, or via an @@CONS ST command, as follows:

a. ```ST LSAM*SKDPRG.XFRTCP/ECL,,,<acct/user>```

b. ```ST LSAM*SKDPRG.LSAM-RUN/ECL,,,<acct/user>```
* ```ST LSAM*SKDPRG.LMAM-RUN/ECL,,,<acct/user>```

### Start JORS

If the ```*SKDPRG.STSMAJOR/ECL``` element was copied to ```SYS$LIB$*RUN$ ```during the installation, JORS can be started with the console command:
```ST < STSMAJOR/ECL``` element in ```RUN$>```

:::tip Example 

ST JORS

:::

- or -

The run can be started from the console, or via an @@CONS ST command, as follows:

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

Control MAM Status

### Bring Up a BIS Site

1. ```Enter II LMAM UPMAM<site id>``` 

- or -

2. With the ```*LMAM``` console keyin, enter the command ```*LMAM UPMAM<site id>```.

### Bring Down a BIS Site

1. ```Enter II LMAM DNMAM<site id>``` 

- or -

2. With the ```*LMAM``` console keyin, enter the command ```*LMAM DNMAM<site id>```.


## Checking LSAM/LMAM Status

### Check LSAM Status

1. Enter ```II LSAM STATUS``` to list the status of the LSAM and the version numbers of the LSAM and XFRTCP 

- or -

2. Using the console keyword defined in the configuration, enter ```*LSAM STATUS```.

### Check LMAM Status

1. Enter ```II LMAM STATUS``` to list the status of the LMAM and the version numbers of the LMAM and XFRTCP 

- or -

2. Using the console keyword defined in the configuration, enter *LMAM STATUS.

## Stopping the LSAM/LMAM

Stopping an LSAM or an LMAM leaves the communication program (XFRTCP) in contact with the SAM so that the remaining components continue to process.

SMA suggests processes **not** be stopped unless all OpCon/xps schedules requiring these processes are complete, or in a "Held" state. When either component is stopped while jobs are being executed, the jobs remain in a "running" state according to SAM. When the component is brought back up, SAM is notified of the status of the job. This can be avoided by insuring the schedules are complete, or placed in a "HOLD" status, prior to shutting down a component.

### Stop an Individual LSAM

1. Issue the console keyin II LSAM STOP 

- or -

2. Issue the console keyin *LSAM STOP.

### Stop an Individual LMAM

When an LMAM is stopped, all associated MAMs are also stopped.

1. Issue the console keyin II LMAM STOP 

- or -

2. Issue the console keyin ```*LMAM STOP```.

## Terminating an LSAM/LMAM

Terminating All LSAM/LMAM Runs

1. Use the console command II ```<run-id>``` TERM 

- or -

2. Use the console ```<keyword> TERM``` (e.g., ```*LSAM TERM``` or ```*LMAM TERM```) command.

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



