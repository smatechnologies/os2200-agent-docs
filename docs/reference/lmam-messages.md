# LMAM Messages

The table below presents OS 2200 LMAM status messages forwarded to the SAM. The messages are displayed in Operations of the Enterprise Manager following the job status.

## LMAM Messages in Enterprise Manager Operation

| Message | Description |
| ------- | ----------- |
| Submitted to Mam-<```site-id>``` | The job has been submitted to BIS MAM |
| MAM-```<site-id>```:```<BIS-run-name>``` | Last active BIS run name captured for job | 

## LMAM Messages Displayed at System Console

### ```**** LMAM **** LMAM/ <version>```

**Description**

The LMAM program version, displayed upon console at startup.

### MAM SITE ```<site-id>``` ACTIVATED

**Description**

The LMAM has activated MAM site-id.

### LMAM INITIALIZATION COMPLETE	

**Description**

The LMAM has properly initialized and is ready to process BIS runs.

### LMAM on duty at ```<hh:mm>``` on ```<mm/dd/yyyy>```

**Description**

The LMAM has started (on duty) at time on date.

### Keyin ```<keyin>``` Registered for ```<console-mode>``` users

**Description**

The program has successfully registered the ```<key-word>``` as a console command available to users with the ```<console-mode>``` capabilities, or higher.

### * INVALID REALTIME PRIORITY: ```<xx>```

and 

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not between 02 and 35, inclusive).
* The program assumes the priority of 35.

### * REALTIME OPTION SELECTED, BUT NON-NUMERIC LEVEL: ```<xx>```

and 

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not a number between 02 and 35, inclusive).
* The program assumes the priority of 35.
* The ```<xx>``` field displays the invalid priority provided.

### INIT ERROR STATUS = ```<TIP-status-code>```	

**Description**

* The program is unable to initialize a TIP connection.
* The ```<TIP-status-code>``` field contains the four-character TIP status code identifying the error; refer to Unisys TIP documentation for the meaning of the status code.

### MAM PARAMETERS NOT AVAILABLE

**Description**

* Parameters necessary to activate MAM have not been defined.
* Use LSAMCFG/ECL to define MAM parameters.

### NO BIS SITES ARE ACTIVE

**Description**

* There are no MAMs active.
* BIS jobs cannot be processed until the MAM(s) are activated with a console keyin.

### ** REG KEYIN ERROR, STATUS= ```<keyin-registration-error-code>```

**Description**

* The program received an error while attempting to register a console keyin reserved word.
* The ```<keyin-registration-error-code>``` field contains the error code returned by the registration procedure; refer to Unisys documentation to identify the meaning of the error code.

### * UNAUTHORIZED @@CONS KEYIN:

and 

### ```<keyin-received>```

and 

### RECEIVED FROM: ```<terminal-id>```

**Description**

* A console keyin from an unauthorized source has been received.
* The ```<keyin-data-received>``` field contains the keyin received.
* The ```<source-of-keyin>``` field contains the terminal identification the keyin was received from.

### JOBS EXIST FOR AN INACTIVE BIS SITE

and 

### Mam-```<site-id>``` is Down

and 

### WILL UP MAM ```<site-id>``` TO ALLOW PROCESSING

**Description**

* OpCon/xps jobs exist for a MAM that has been detected as inactive.
* The LMAM attempts to activate the MAM.

### DO AN UPMAM```<site-id>``` TO ALLOW PROCESSING

**Description**

* OpCon/xps jobs exist for a MAM that has been terminated with a console keyin.
* The MAM must be activated with a console keyin before jobs are processed.

### ```<Opconxps-job-id>``` submitted (MAM```<site-id>```) ```<hh:mm>``` on ```<mm/dd/yyyy>```

**Description**

The OpCon/xps job has been submitted to MAM at time on date.

### BIS SYSTEM NOT AVAILABLE FOR MAM-```<site-id>``` START UP	

**Description**

* The LMAM detected the BIS system for the MAM is not processing.
* The BIS must be running prior to starting MAM.

### ERROR SENDING TO BATCH PORT ```<batchport-name>```

**Description**

* The LMAM received an error when attempting to submit (@SYM) a file to the identified batchport queue.
* Most likely the batchport defined to LMAM is invalid.

### LMAM JOB RECORD WRITE FAILURE

and 

### ```<TIP-FCSS-status- information >```

**Description**

* The LMAM attempted to write job information in the TIP file, but the write failed.
* The ```<TIP-FCSS-status-information>``` field contains the TIP status error code. Refer to Unisys documentation for the error code meaning.
* Most likely a problem with the TIP file definition.

### LMAM ARRAY RECORD READ FAILURE

and 

### ```<TIP-FCSS-status-information>```

**Description**

* The LMAM encountered an error while attempting to read pointer array data from the TIP file.
* The TIP-FCSS-status-information field contains the TIP error code. Refer to Unisys documentation for the error code meaning.

### LMAM ARRAY RECORD WRITE FAILURE

and 

### ```<TIP-FCSS-status-information>```

**Description**

* The LMAM encountered an error while attempting to write pointer array data to the TIP file.
* The TIP-FCSS-status-information field contains the TIP status code. Refer to Unisys documentation for the status code meaning.

### JOB RECORD READ FAILURE

and 

### ```<TIP-FCSS-status-information>```

**Description**

* The LMAM encountered an error while attempting to read job data from the TIP file.
* The TIP-FCSS-status-information field contains the TIP error code. Refer to Unisys documentation for the error code meaning.

### CANT ESTABLISH JOB REC LOCK

**Description**

The LMAM is unable to lock a job record in the TIP file for exclusive use.

### WILL RETRY JOB ```<Opconxps-job-id>```	

**Description**

* The LMAM has submitted a job to MAM which has not yet been started.
* The LMAM resubmits the job for starting.
* Occurs after MAM has been detected as not operating after a job submit has occurred.

### ```<Opconxps-job-id>``` CAUSED MAM TO ABORT

**Description**

* The BIS run for OpCon/xps job caused MAM to abort.
* MAM is restarted, the job is identified as "errored".

### ```<Opconxps-job-id>``` IS RUNNING

**Description**

The MAM has identified the job as "running".

### ```<Opconxps-job-id>``` HAS FINNED

**Description**

The MAM has identified the job as terminated successfully.

### ```<Opconxps-job-id>``` HAS ERRORED

**Description**

The MAM has identified the job as terminated in error.

### JOB EXISTS FOR A BIS SITE THAT IS NOT RESPONDING

and 

### WILL ATTEMPT TO UP MAM SITE ```<site-id>```

**Description**

* The MAM has stopped communicating and has been detected as not operational.
* The LMAM attempts to activate the MAM.

### MAM-```<site-id>``` DOWNED

**Description**

The MAM has been intentionally terminated with a console keyin.

### LMAM POST RUN JOBID NOT FOUND ```<Opconxps-job-id>```

**Description**

* The OpCon/xps job related to a pre-run job cannot be found in the TIP file.
* Most likely a TIP file corruption.

### LMAM SHUTDOWN IN PROGRESS

**Description**

The LMAM is in process of terminating.

### LMAM off duty at ```<hh:mm>``` on ```<mm/dd/yyyy>```

**Description**

The LMAM is no longer active (off duty) at time on date.