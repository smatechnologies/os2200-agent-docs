# Additional Features

## Configuration Parameters Administration

### LPARMINI

Initializes the LSAM Configuration Parameters Backup file. The Backup file contains images of the configuration parameters which may be restored. This program should only be used when it is desired to destroy all backup images of the parameters; or when directed by SMA support. It is recommended that the configuration parameters be updated (using LSAMCFG/ECL) immediately after initializing the Backup file; this will allow the parameters to be restored to the time of the file initialization.

 

```@ADD <LSAM qualifier>*SKDPRG.LPARMINI/ECL```

### LPARMRES

Restores the selected LSAM Configuration Parameters to the Configuration Parameters area of the TIP communications file. When the Configuration Parameters are updated with LSAMCFG/ECL, an "after image" of the parameters is stored in the LSAM Configuration Parameters Backup file. The parameters can then be restored with the use of LPARMRES/ECL.

```@ADD <LSAM qualifier>*SKDPRG.LPARMRES/ECL```

### LSAMCFG

Displays and modifies the LSAM Configuration Parameters. For specific details about using LSAMCFG, refer to LSAM and LMAM Configuration.

## GENERICP

The LSAM installation includes a test runstream called GENERICP/ECL, contained in the *SKDPRG file. By default, GENERICP pauses for 30 seconds and terminates normally. The behavior of the job can be altered by modifying the job's Start Condition Word on the Unisys OS 2200 Job Details window of the OpCon/xps Enterprise Manager.

#### Syntax

```Fsss```

* Fsss is a value in the job's start Condition Word field.
    * F: The FIN status indicator.
        * 0=normal
        * 1=error
    * sss: The number of seconds to wait before ending. The number is in octal notation; therefore, the number cannot have digits greater than seven.

:::tip Example

The following example shows what types of numbers to be used for termination:

A GENERICP job with a start Condition word of 1074 waits for 60 seconds (74 in octal), then terminates with an error.

:::

## SAMS NOTICE

SAMS NOTICE is an ECL element allowing jobs to send events to OpCon/xps to alter the way a schedule processes. Only valid OpCon/xps events using external processing rules may be passed through SAMS NOTICE.

#### Syntax

The syntax below is added to the ECL triggering the event:

```

@ADD <LSAM qualifier>*SKDPRG.SAMS-NOTICE/ECL

SEND <Event String>

<UserName,EventPassword>

```

* ```<Event String>``` is any valid event in OpCon/xps. For a list of valid OpCon/xps events, refer to Introduction in the OpCon Events online help. The ```<Event String>``` may be continued from one line to the next by placing a semi-colon (;) at the point the following line should begin. The total length of the Event, including the UserName and EventPassword, cannot exceed 888 characters.

* **UserName** is an OpCon/xps user with privileges to perform the action in the event.

* **EventPassword** is the external event password for the OpCon/xps UserName. This is not the same password the user enters to log in to the Enterprise Manager.

:::tip Example

The following example shows how SAMS-NOTICE/ECL is used to send an event to OpCon/xps:

```

@ADD LSAM*SKDPRG.SAMS-NOTICE/ECL

SEND $CONSOLE:DISPLAY,This is a message for the SAM.log

ExternalUser,ExtPassword

```

:::

:::tip Example

The following example shows how SAMS-NOTICE/ECL is used to send an event to OpCon/xps:

```

@ADD LSAM*SKDPRG.SAMS-NOTICE/ECL

SEND $CONSOLE:DISPLAY,This is a message for the SAM.log

ExternalUser,ExtPassword

```

:::

:::tip Example

The following example shows how SAMS-NOTICE/ECL is used to send multiple events to OpCon/xps:

```

@ADD LSAM*SKDPRG.SAMS-NOTICE/ECL

SEND $JOB:CANCEL,[[$DATE]],Schedule,JOB22

ExternalUser,ExtPassword

@ADD LSAM*SKDPRG.SAMS-NOTICE/ECL

SEND $JOB:RELEASE,[[$DATE]],Schedule,JOB56

ExternalUser,ExtPassword

```

:::

Events processed by SAMS-NOTICE/ECL may be echoed to the system console by modifying the SAMS-NOTICE/ECL element. From an OS 2200 DEMAND terminal session, perform the following steps to place the Echo option on the @XQT SAMNOT statement:

1. ```@ED,U {LSAM-qualifier}*SKDPRG.SAMS-NOTICE/ECL```
2. ```LOC XQT```
3. ```C /XQT /XQT,E/```
4. ```EXIT```

All OpCon events sent by SAMS-NOTICE will be displayed on the system console.

## Fundamental Security Officer Jobs

Security Officer jobs may be scheduled and started by the LSAM in a Fundamental Security environment with the following procedure:

1. Identify a unique job name for the job, there can be only one instance of this job name active at any time.
2. In the job's ECL, insert the following ECL commands:

    a. Immediately after the @RUN statement, insert:
    * @ADD [LSAM-qualifier]*SKDPRG.SAMS-RUN-ID/ECL
    * –SEC [unique-job-name]
    * @EOF
    * @EOF

    b. Immediately before each and every @FIN statement, insert:
    * @ADD [LSAM-qualifier]*SKDPRG.SAMS-NOTICE/ECL
    * –SEC [unique-job-name]
    * @EOF
    * @EOF

3. Place the updated ECL in the SYS$LIB$*RUN$ file with an element/version name of choice.

4. Define the job to OpCon as an OS 2200 job with the following details:

    a. OpCon Job Name is the unique job name selected in step 1.

    b. The ECL location is the SYS$LIB$*RUN$ file and element/version name.

    c. The Account value (the @RUN override) must be –SECURITY-.


:::info Note

When the job is started, the LSAM will issue the following console start command:

```ST [element/version]```

:::

The inserted ECL steps provide job information to the LSAM. The LSAM monitors the job with periodic @@CONS RC commands. When the response to an @@CONS RC command is "FINNED" or "NOT FOUND", the job is reported as "Failed". This indicates a failure of the job to process the SAMS-NOTICE/ECL step (inserted in Step 2); this is expected when the job aborts. 

When the job terminates normally, but the LSAM reports the job as "Failed", confirm the SAMS-NOTICE/ECL step is properly located before all @FIN statements to insure it is executed prior to executing the @FIN.

:::info Note

The LSAM does not process the ECL of Security Officer jobs, which is a security violation requiring the Security Officer's password to allow the job to start, and therefore OpCon tokens cannot be used to replace variables located in the ECL.

:::

