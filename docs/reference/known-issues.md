# Known Issues

## Use of @FREEM na @FREEALL in ECL

The use of @FREEM and @FREEALL is not recommended in LSAM started jobs. These commands release all files from the run, including the tracking file monitored by the LSAM to determine when a job error terminates without executing the LSAM Notification Step. 

When there are many runs using these commands, an alternative to changing the runs is to use an Alternate Qualifier for LSAM Tracking Files of "SYS$". @FREEM and @FREEALL do not release files qualified with SYS$. 

This configuration parameter can be set by using LSAMCFG/ECL and selecting Advanced Options (item 12), then the Alternate Qualifier option (item 14), and entering SYS$ for the qualifier.

## JORS Print File Retrieval Limited to 5 Files

When selecting the "View Job Output" option in Enterprise Manager Operation for an OS 2200 job, the first five (5) print files for the job are selected for viewing. For Jobs that have sent more than 5 files to a print queue, the first file must be removed from the queue (either deleted or printed) to allow the sixth (6th) file to be selected.

## SEC,SAVE Keyins Impact on Job Starts

When OS 2200 Security files are in the process of being backed up (initiated by console SEC,SAVE keyins), job start commands are neither accepted nor rejected, but are held in a "hidden" state. This can cause inaccurate job status to be reported by the LSAM; such as the job reported as "errored", but the OS activates the job when the SAVE completes (the job start command is "held" during the SAVE). 

To avoid this condition, "hold" job starts during the processing of SEC,SAVE keyins; jobs started prior to the keyin, and are processing, are not effected.

## Incorrect Job Count in Enterprise Manager Operation

The OS 2200 LSAM shows 0/0 for the job count. When the XFRTCP detects the LSAM (or the LMAM) is no longer active, the maximum jobs are set to zero to prevent SMANetCom from sending jobs that cannot be processed until the LSAM/LMAM is restarted.

## Recovery from System Crash

If after a system crash, the LSAM, XFRTCP, or LMAM fails to properly start; perform the following steps for recovery. There is a possibility that the communications (TIP) file used by the LSAM may be corrupt. If the LSAM fails to start:

1. Check the communications file by starting the communications file print program:
(```@START <LSAM qualifier>*SKDPRG.XFRPRT/ECL```)

2. Review the output (```<LSAM qualifier>*BKXFRPRT-PRT```).

3. If read errors are present, the user has two options:

a. Initialize the communications file:
```@ADD <LSAM qualifier>*SKDPRG.XFRINI/ECL``` 

\- or -

b. Completely rebuild the communications file:
```@ADD <LSAM qualifier>*SKDPRG.TIPREG/ECL```

4. (Optional) Restore the configuration settings with LPARMRES/ECL.

5. Print or remove any LSAM print files waiting in any print queue. Display queued print files by entering: (@@CONS RC LSAM).

6. Start the LSAM runs.

## Job Identified as Errored while Still Executing

When OS 2200 batch jobs are identified by LSAM or by OpCon/xps as "failed" or "errored" while the job is still executing indicates the job has released a file critical to the LSAM monitoring process. Often this occurs when the job releases all assigned files (such as with @FREEM or @FREEALL). 

This situation can also generate console messages of "JOB-ID NOT FOUND" by the running job.

This condition may be corrected by updating the ECL runstream to avoid prematurely releasing the LSAM monitoring file, or by modifying the LSAM configuration (using LSAMCFG/ECL) to supply an "Alternate Qualifier for LSAM Tracking Files" (option 14 on the Advanced Options display). 

Suggested qualifiers are LSAM or OPCON, or some other qualifier unique to the LSAM operation.

## Incorrect ECL File Key Causes LSAM to Abort

When the LSAM attempts to access an ECL file defined for a job with an incorrect read key, the LSAM will abort. This is due to OS 2200 recognizing an invalid key as a security violation and aborting the offending run. This situation occurs after a new job has been added to the schedule or when read keys for ECL files have been changed.

To identify this situation:

1. After the LSAM ABORT FIN, view the most current file cycle of the ```LSAM*BKLSAM file (for example: @ED,R LSAM*BKLSAM```.

2. Search the file for messages of:

```

FAC KEY ERR ABORT ADR: xxxxxx BDI:xxxxxx L,BDI:xxxxxx
BAD READ OR WRITE KEYS ON CSF$ REQUEST.

```

To recover from this situation:

1. In the OpCon Enterprise Manager Operations window:

a. Mark the offending job Failed (this will trigger any events defined for the job when Marked Failed). If you need assistance identifying the job, contact SMA support and be prepared to provide the LSAM*BKLSAM file via ASCII transfer.

b. Correct the ECL file read key on the Job Details screen (it should also be corrected on the Job Master to prevent future occurrences).

2. On the 2200:

:::info Note 

The following steps will destroy the local LSAM data pertaining to all jobs currently running; it is recommended that all LSAM-started jobs be allowed to terminate and the termination status recorded in OpCon prior to continuing with this step.

:::

a. From a DEMAND session: @ADD LSAM*SKDPRG.XFRINI/ECL

b. Start the LSAM.

3. In the OpCon Enterprise Manager Operations window, restart the offending job.