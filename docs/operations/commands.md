# Commands

## XFRTCP Commands

The XFRTCP console keyword command supports the following commands:

### TERM

Terminates XFRTCP and the associated LSAM, LMAM, and SMAJOR runs.

### STOP

Terminates only the XFRTCP and SMAJOR runs, and does not notify the LSAM or the LMAM to terminate.

### STATUS

* Displays the current network status information.
* The *XFRTCP STATUS command displays the following:

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

* Closes the current cycle of the ```BKXFRTCP``` file and opens a new cycle of the breakpoint file.
* Once this command completes, the ```BKXFRTCP(-1) ```file is the one just closed and may be viewed or printed; the ```BKXFRTCP(-0)``` file is the current breakpoint file.

:::tip Example

```*XFRTCP BRKPT``` closes the current cycle of the ```<LSAM qualifier>*BKXFRTCP``` file and creates and opens a new cycle of the file in use.

:::

## JORS Commands

### TERM

Terminates SMAJOR only.

### STOP

Terminates SMAJOR only.

### STATUS

* Displays the current JORS status information.
* The *JORS STATUS command displays the following:

```

MSGS RCVD: 999

MSGS SENT: 999 ACKS RCVD: 999

MSGS TO SEND: 0

RELEASE LEVEL: xxxxx PROGRAM: SMAJOR/xxxxxx

COMMUNICATIONS INTERFACE: XFERIFCx/xxxxx

```

### BRKPT

Closes the current cycle of the ```BKSMAJOR``` file and opens a new cycle of the breakpoint file.
Once this command completes, the ```BKSMAJOR(-1)``` file is available for viewing and/or printing. The ```BKSMAJOR(-0)``` file is the current breakpoint file in use.
For example:

```*JORS BRKPT``` closes the current cycle of the ```<LSAM qualifier>*BKSMAJOR``` file and creates and opens a new cycle of the file.

## Communications File Commands

The communication file requires no maintenance by the user but does have two programs which may be used: XFRINI and XFRPRT.

## XFRINI

Initializes the job data portion of the file.

## ```@ADD <LSAM qualifier>*SKDPRG.XFRPRT/ECL```

#### Remove Octal Format from the XFRPRT Report

The octal format may be removed from the report by modifying XFRPRT/ECL as follows:

1. Locate the ```@XQT XFRPRT``` statement in the ECL.
2. Immediately after the @XQT is a parameter statement:

```
TIPFILE nnnn O
```

* nnnn is the local TIP file number.
* "O" is the Octal report option.

Remove the O from the statement resulting in:

```
TIPFILE nnnn
```

:::info Note 

To reactivate the Octal report option, replace the "O" on the parameter statement.

:::

## Common Data Bank Commands

### DUMPCDB

Prints the contents of the Non-configured Common Data Bank. SMA support uses this report to assist in resolving reported problems. The file ```<LSAM qualifier>*DUMPCDB-PRT``` contains the report.

### LOADCDB

Loads the Non-configured Common Data Bank into memory and initializes the bank for use by other LSAM modules. This procedure is automatically executed each time the XFRTCP run is started. Do not manually execute this run unless directed by SMA support.

:::warning

The use of the LOADCDB command while XFRTCP and/or JORS is processing causes those programs to error terminate.

:::

### ```@ADD <LSAM qualifier>*SKDPRG.LOADCDB/ECL```


:::info Note

The user executing this command must have "Reload Common Bank" privilege (SSRLODCB).

:::

## MAM Component Commands

### MAMMSG

A BIS background run reminding the console operator to start MAM (UPMAMx command to the LMAM) each time BIS is started. This run should be scheduled in BIS to execute each time BIS is initialized.

### MAMNOT

MAMNOT is a callable BIS routine which may be used to send events to OpCon/xps. Any valid OpCon/xps event may be sent using MAMNOT. 

To use MAMNOT, in the run sending the event, include the following instructions:

```@LDV <event-to-send>S80='<event syntax>' ```

```@CALL,<c>,<d>,6 1 <event-to-send>```

```<event-to-send>``` is a string variable, no more than 80 characters, containing the event to be sent to OpCon/xps.

```<event syntax>``` is the event to send. Due to BIS restrictions concerning the use of commas (,) in passing data, the ampersand (&) character should be used where the event syntax requires commas. For example, to place a job in a "HOLD" condition, the event syntax is:

```$JOB:HOLD,<schedule name>,<schedule date>,<job name>```

This syntax should be passed to MAMNOT as:

```$JOB:HOLD&<schedule name>&<schedule date>&<job name>```

```<c> ```is the Cabinet (Mode) where MAM modules are installed and registered.

```<d>``` is the Run Drawer (Type) where MAM runs are installed and registered.

Refer to [Introduction](https://help.smatechnologies.com/opcon/core/events/introduction) in the OpCon Events online help for information regarding events and event syntax.

Also, review the OpCon/xps security requirements for sending events. The OpCon/xps User-ID and password used by MAMNOT to send events is stored in the MAM Configuration Report (RID 3 of MAM's Run Type, variable V074). This Configuration variable must be updated with the OpCon/xps User and password, whenever either changes, to successfully send events to OpCon/xps.

### MAMFIN

* A callable BIS routine providing run termination status to MAM.
* When MAMFIN is called, an entry is placed in the MAMFIN Log Report located in MAM's Data Drawer (RID 8).
* Based on a configuration setting selected at installation, MAM searches the entries in this report for entries by runs no longer active. When the run entry is found, MAM identifies the run (or job) as "terminated normally". When the run entry is not found, MAM, based on the configuration setting, either identifies the run as "terminated in error" or searches the BIS Accounting Log (@LGL) and Background Error Report to identify the run's termination status.

#### Option One Syntax

To use MAMFIN in an executing run immediately prior to run termination, include the following statement:

```@CALL,<c>,<d>,12 1```

:::tip Example

The following example is a statement included in an executing run:

```

@CALL,8,I,12 1

```

:::

* ```<c>```: the cabinet (Mode) where MAM modules are installed and registered.

* ```<d>```: the drawer (Type) where MAM runs are installed and registered.

#### Option Two Syntax

The MAMFIN module may also be LNKed to with the following instruction:

```@LNK,<errlbl> MAMFIN```

* ```<errlbl>```: the run's label to execute in the event MAMFIN cannot be LNKed to.
* When LNKing to MAMFIN, MAMFIN registers an error routine (RER) and then clears the registration upon successful execution and return to the linking run. Should MAMFIN error, the RER returns status values of:

```

STAT1$ = 1

STAT2$ = the contents of XERR$ at the time of the error

STAT3$ = the contents of XLINE$ where the error occurred

```

Also, when using LNK to execute MAMFIN, the installation configuration option to track runs by "User/Terminal" should be selected. When MAM is tracking runs using "User/Run Name/Terminal", a LNK to MAMFIN appears to MAM that the run has terminated and it may be considered a "termination in error", depending on the MAMFIN configuration setting.

### MAMBACKUP

A BIS module that saves the MAM BIS RIDs to an EXEC file. SMA recommends MAM's data RID 5 (Job/User RID) is saved after modifications, when this functionality is used.

MAMBACKUP saves all run RIDs except RID 14, the MAMBACKUP run control RID (BIS prevents the saving of a RID containing an active run). This RID may be saved manually with the "ELT" command, but is always contained in the *SKDPRG file and may be retrieved whenever necessary.

SMA recommends the MAMBACKUP run be registered as both a Background and a Foreground run. This allows the run to be used either manually by a terminal user, and automatically started by MAM for scheduled backups of the RIDs.

### MAMRESTORE

A BIS run that restores MAM RIDs from the EXEC file created by MAMBACKUP.

Restore any run RID except RID 13 (the MAMRESTORE RID) and RID 14 (MAMBACKUP), which may be manually retrieved from either the *MAM-x-BACKUP.R13 element, or from *SKDPRG.MAMRESTORE (or MAMBACKUP) element whenever needed.

## Starting BIS Run with Specific User-ID

MAM may start BIS runs with a specific BIS User-ID. To utilize this feature, the response to the Installation prompt for "Use different User-IDs to start runs with?" must have been "Y" ("yes"). Refer to [OS 2200 LSAM and BIS LMAM Installation](/installation/preparing-the-installation#account-and-user-ids). 

When the MAM Installation has already been completed, and it is desired to activate this feature, MAM's Configuration Report (RID) may be updated directly.

#### Update MAM's RID to Enable Using Different User-IDs to Start Runs

1. To Activate the BIS User-ID AFTER MAM is installed, Modify MAM's Configuration Report (RID 3) in MAM's Run Drawer (Type) to change the variable V072 to a value of "5", update the RID.


:::tip Example 

The following example shows how to change the variable V072:

Assuming MAM's Run Drawer is "C", modify report 3C as follows:

Old Report Line:

```

@LDV,P  V072I5=0 . - RID FOR USERID/PASSWORD INFO (VER 8.00)

``` 

New Report Line:

```

@LDV,P  V072I5=5 . - RID FOR USERID/PASSWORD INFO (VER 8.00)

```

:::

2. To define the BIS User-IDs to use, update MAM's User-ID/Password report (RID 5) in MAM's Data Drawer (Type) to contain the BIS User-IDs and passwords to be used for specific OpCon/xps jobs.

The following is an example that lists the passwords to be used for specific OpCon/xps jobs:

```

*JOBNAME            USER-ID	    PASSWORD	RESERVED FOR FUTURE USE
*===============	========	==========	======================================
>>OpConJob-ID	    >>BISUser	>>passwd	>>
 
```

* JOB NAME (OpConJob-ID) is the 12 character OpCon/xps job identifier of the job requiring a specific BIS User-ID.
* USER-ID (BISUser) is the BIS User-ID to be used when starting the BIS run (restricted to 10 characters).
* PASSWORD (passwd) is the password associated with the BIS User-ID (restricted to 6 characters).
* \>> represents a tab character.

Update this report to contain the OpCon/xps jobs requiring specific BIS User-IDs for starting. Include the User-ID to be used and the corresponding password.

:::info Note

This report must be maintained in sorted order by Job Name.

:::

After updating the RID, it would look something like:

```

*JOBNAME            USER-ID	    PASSWORD	RESERVED FOR FUTURE USE
*===============	========	==========	======================================
>>ANALYSIS-A	    >>BILLW	    >>XYYZ1	    >>
>>BIG-REPORT	    >>SALLY	    >>SIMPLE	>>
>>HOLIDAY	        >>JOESMITH	>>JSTWO	    >>
>>JOB01	            >>BATCHUSER	>>BATCH	    >>

```

When MAM detects the UserID/Password Configuration parameter setting (RID 3C in the above example, variable V072), this report (RID 5) is searched for the OpCon/xps job-id. When the job-id is found, MAM then uses the BIS User-ID and password to start the run. When the OpCon/xps job-id is not found in this report (or when the configuration variable V072 in RID 3 is zero), MAM starts the job using MAM's user-id.

#### Considerations when Using Job-specific User-IDs

* This report contains both User-IDs and passwords and should be protected as any report containing sensitive information would be. MAM's user-id must be allowed access.
* It is the responsibility of local site personnel to properly maintain this report, including the sorted order and updating User-IDs and passwords when they change.
* When updates are applied to this RID, it is a good idea to perform a backup of it in the event the latest information is required to be recovered. The runs MAMBACKUP and MAMRESTORE may be used for this purpose, or local site procedures may be applied. Manual ELT and RET procedures may be appropriate. To insure consistent backup of MAM's RIDs, it is recommended to schedule the MAMBACKUP run regularly using OpCon/xps.