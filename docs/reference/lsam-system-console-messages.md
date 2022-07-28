# LSAM System Console Messages

The following messages are displayed by the LSAM at the Unisys OS 2200 system console:

### INIT ERROR STATUS = ```<xxxx>```	

**Description**

* The program is unable to initialize a TIP connection. The ```<xxxx>``` field contains the four-character TIP status code identifying the error.
* Refer to Unisys TIP documentation for the meaning of the status code.

### DEMAND SESSION NOT ESTABLISHED DUE TO: MISSING OR INVALID USERID/PASSWORD

**Description**

The LSAM is unable to start a DEMAND run due to incorrect sign-on information.

### DEMAND SESSION NOT ESTABLISHED DUE TO: DEMAND QUOTA EXCEEDED

**Description**

The LSAM is unable to start a DEMAND run due QUOTA restrictions.

### DEMAND SESSION NOT ESTABLISHED DUE TO: RESOURCES NOT AVAILABLE

**Description**

The LSAM is unable to start a DEMAND run due to lack of system resources (i.e., exceeds the number of DEMAND runs allowed).

### * INVALID REALTIME PRIORITY: RAISED TO REALTIME LVL 35

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not between 02 and 35, inclusive).
* The program assumes the priority of 35.

### * INVALID REALTIME PRIORITY: RAISED TO REALTIME LVL: ```<param-RT-level>```

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not between 02 and 35, inclusive).
* The program assumes the priority of 35.

### * REALTIME OPTION SELECTED, BUT NON-NUMERIC LEVEL: ```<xx>```

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not a number between 02 and 35, inclusive).
* The program assumes the priority of 35.
* The ```<xx>``` field displays the invalid priority provided.

### LSAM INITIALIZATION COMPLETE

**Description**

The LSAM has properly initialized and is ready to process batch jobs.

### LSAM on duty at ```<hh:mm>``` ON ```<mm/dd/yyyy>```

**Description**

The LSAM has started (on duty) at time on date.

### ** REG KEYIN ERROR, STATUS= ```<xxxxx>```	

**Description**

* The program received an error while attempting to register a console keyin reserved word.
* The ```<xxxxx>``` field contains the error code returned by the registration procedure; refer to Unisys documentation to identify the meaning of the error code.

### Keyin ```<key-word>``` Registered for ```<console-mode>``` users

**Description**

The program has successfully registered the ```<key-word>``` as a console command available to users with the ```<console-mode>``` capabilities, or higher.

### LSAM SHUTDOWN IN PROGRESS

**Description**

The LSAM is in process of terminating.

### LSAM off duty at ```<hh:mm>``` ON ```<mm/dd/yyyy>```

**Description**

LSAM is no longer active (off duty) at time on date.

### TROUBLE ```<xxxx>```

**Description**

* The program has encountered trouble while attempting to manipulate TIP file data.
* The ```<xxxx> ```field contains the TIP error code; refer to Unisys documentation to identify the meaning of the error code.

### * UNAUTHORIZED @@CONS KEYIN:

and 

### ```<keyin-data-received>```

and

### RECEIVED FROM: ```<source-of-keyin>```

**Description**

* A console keyin from an unauthorized source has been received.
* The ```<keyin-data-received>``` field contains the keyin received.
* The ```<source-of-keyin>``` field contains the terminal identification the keyin was received from.

### LSAM JOB RECORD WRITE FAILURE

**Description**

* The LSAM encountered an error while attempting to write job data to the TIP file.
* The breakpoint file of the run contains additional error information.

### LSAM ARRAY RECORD READ FAILURE

**Description**

* The LSAM encountered an error while attempting to read pointer array data from the TIP file.
* The breakpoint file of the run contains additional error information.

### LSAM ARRAY RECORD WRITE FAILURE

**Description**

* The LSAM encountered an error while attempting to write pointer array data to the TIP file.
* The breakpoint file of the run contains additional error information.

### ```<OpCon/xps-Job-ID>``` is currently running

**Description**

The OpCon/xps job has been started and is processing, a run-id for the job has not yet been identified.

### ```<OpCon/xps-Job-ID>``` (```<Exec-Run-ID>```) is currently running

**Description**

The OpCon/xps job has been started and is processing with the ```<Exec-Run-ID>```.

### ```<OpCon/xps-Job-ID>``` Pre-run errored ```<hh:mm mm/dd/yyyy>```

**Description**

The Pre-run for OpCon/xps job has errored at time date.

### ```<OpCon/xps-Job-ID>``` errored ```<hh:mm mm/dd/yyyy>```

**Description**

The OpCon/xps job has errored at time date.

### ```<OpCon/xps-Job-ID>``` (```<Exec-Run-ID>```) errored ```<hh:mm mm/dd/yyyy>```

**Description**

The OpCon/xps job with Exec-Run-ID errored at time date.

### ```<OpCon/xps-Job-ID>``` Pre-run no status...assume aborted

**Description**

* The Pre-run for OpCon/xps job has been started, but status information is not available.
* The LSAM assumes the pre-run has aborted. This is the result of the pre-run job not providing status to LSAM and the LSAM DEMAND run unable to retrieve status using the @@CONS RC command, most likely a problem with the DEMAND user-id configuration.

### ```<OpCon/xps-Job-ID>``` no status...assume aborted

**Description**

* The OpCon/xps job has been started, but status information is not available.
* The LSAM assumes the job has aborted. This is the result of the job not providing status to LSAM and the LSAM DEMAND run unable to retrieve status using the @@CONS RC command, most likely a problem with the DEMAND user-id configuration.

### ```<OpCon/xps-Job-ID>``` (```<Exec-Run-ID>```) no status...assume aborted

**Description**

* The OpCon/xps job, with Exec-Run-ID, has been started, but status information is not available.
* The LSAM assumes the job has aborted. This is the result the LSAM DEMAND run unable to retrieve status using the @@CONS RC command, most likely a problem with the DEMAND user-id configuration.

### CANT ESTABLISH JOB REC LOCK

**Description**

The LSAM is unable to lock a job record in the TIP file for exclusive use.

### LSAM JOB RECORD WRITE FAILURE

**Description**

* The LSAM attempted to write job information in the TIP file, but the write failed.
* Most likely a problem with the TIP file definition.

### LSAM ARRAY RECORD READ FAILURE

**Description**

* The LSAM attempted to read a pointer array record from the TIP file, but the read failed.
* Most likely TIP file corruption, a failure to properly initialize the TIP file, or a problem with the TIP file definition.

### LSAM POST RUN JOBID NOT FOUND ```<OpCon/xps-Job-ID>```	

**Description**

* The OpCon/xps job related to a pre-run job cannot be found in the TIP file.
* Most likely a TIP file corruption.

### ```<OpCon/xps-Job-ID>``` ECL LINE TRUNCATED TO 80 CHARACTERS

* The LSAM has detected an ECL command (beginning with @) exceeding 80 characters in length. The ECL line is truncated to 80 characters.
* ECL command lines longer than 80 characters (without a continuation) are invalid.
* Most likely a comment on the line caused it to exceed 80 characters.

### ```<RSI-error-message-returned>```

and 

### SHUT DOWN OF RSI IN PROGRESS

**Description**

* While accessing the DEMAND run, the LSAM received the RSI-error-message-returned.
* The DEMAND run is terminated.
* The LSAM attempts to restart the DEMAND run.

### ```<OpCon/xps-Job-ID>``` duplicated, running as ```<Exec-Run-ID>```

**Description**

* The Exec Run-ID for OpCon/xps job has been duplicated.
* The Exec has assigned Exec-Run-ID to the job.

### *ST FAIL:```<OpCon/xps-Job-ID>``` ERR=```<xx>``` STAT=```<start-error-message>```

**Description**

* The @@CON ST command for the OpCon/xps job failed.
* The ERR field contains an LSAM assigned error code, the STAT field contains the error message returned by the Exec in response to the ST command.

### ```<OpCon/xps-Job-ID>``` (```<Exec-Run-ID>```) is waiting in backlog

**Description**

* The OpCon/xps job, with Exec-Run-ID, has been detected in the Exec backlog.
* This is the result of the Exec batch limit set lower than the OpCon/xps concurrent job limit, or facilities required by the job are not available, or a batch hold (CS H) on the system.

### ```<OpCon/xps-Job-ID>``` SUBMITTED AT ```<hh:mm>``` ON ```<mm/dd/yyyy>```

**Description**

The OpCon/xps job start command has been submitted at time on date.

### ```<OpCon/xps-Job-ID>``` STARTING AS EXEC JOB ```<Exec-Run-ID>```

**Description**

The OpCon/xps job has been assigned the Exec-Run-ID.

### ```<OpCon/xps-Job-ID>``` IS A PRE-RUN JOB

**Description**

The OpCon/xps job started is a pre-run job.

### ```<OpCon/xps-Job-ID```>-NO START DATA AVAILABLE

**Description**

The LSAM has received a start command from OpCon/xps for a job without ECL location data.

### ECL FILE NOT FOUND FOR JOB: ```<OpConxps-Job-ID>```

**Description**

* The ECL file for the OpCon/xps job cannot be found on the system.
* Most likely an invalid ECL location has been entered for the job.

### START-FILE NOT AVAILABLE FOR JOB.....```<OpConxps-Job-ID>```

**Description**

* The LSAM cannot assign the ECL file for the OpCon/xps job.
* The Exec has rejected the file assignment for a reason other than "not cataloged".
* The file may be "unloaded", or the LSAM is not authorized to access the file.

### ECL NOT IN FILE, JOB:```<OpConxps-Job-ID>```

**Description**

* The file element is not in the ECL file identified for OpCon/xps job.
* Either the element name is incorrect, or the file name is incorrect.

### ECL IS EXCL ASGED BY ANOTHER RUN

and 

### RETRYING START OF ```<OpConxps-Job-ID>```

**Description**

* The ECL file for OpCon/xps job is exclusively assigned to another run.
* The LSAM continues attempting to assign the ECL file.

### *START FAIL:```<OpCon/xps-Job-ID>``` ERR=```<xx>``` STAT=```<start-error-message>```

**Description**

* The @START command for OpCon/xps job failed.
* The ERR field contains an LSAM assigned error code.
* The STAT field contains the error message.

### SDFIO SYNTAX ERR: ```<SDFIO-data>```

**Description**

* A syntax error has been returned by the EXEC SDF services module when LSAM attempted to access an ECL file.
* The SDFIO-data contains the information used when the error occurred.

### SDFIO ASG ERR, FAC..................```<facility-status>```

**Description**

* The EXEC SDF services module returned an error while attempting to assign an ECL file.
* The facility-status contains the FAC error code.

### LSAM IS UNABLE TO SIGN ON THE SYSTEM

**Description**

* The LSAM is unable to sign-on a DEMAND run.
* May be due to improper privileges for the LSAM, or system resources are not available.