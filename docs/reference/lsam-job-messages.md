# LSAM Job Messages

The references below present OS 2200 LSAM status messages forwarded to the SAM. The messages are displayed in Operations of the Enterprise Manager following the job status.

### ```<run's-termination-word>```

**Description**

* The run's condition word value at termination.
* Used to determine a successful or error termination.

### ```<ST-failed-message>```

**Description**

The "ST" failed message returned by the Exec when an "ST" statement is rejected.

### *ASSIGN FAILED ON FILE-NAME FAC=ssssssssssss

**Description**

* This message is displayed when SAM has repeatedly tried to assign a file that should be available.
* The "sss" field contains the octal facility status code used to determine the cause of the reject.
* This message does not stop the processing and may be encountered repeatedly until the file becomes available.

### *ASSUME ABORTED*

**Description**

* Displayed when a job has been submitted to the Exec, but has never started and is not detected in backlog.
* The job may have errored during the start process.
* The LSAM can only assume the job aborted during startup, without ever becoming active.
* This message is the result of LSAM's RSI (DEMAND) userid not allowed @@CONS RC commands, or the DEMAND session cannot be started.

### AS ```<runid>```

**Description**

Displayed once a job has started and the unique Exec Run-ID has been identified.

### AWAITING ECL FILE

**Description**

* Displayed when a job's ECL file is exclusively assigned to another EXEC run.
* The job is not able to start until the LSAM is able to retrieve the ECL, the LSAM continues attempting to retrieve the file.

### ECL FILE ERROR

**Description**

Displayed when the ECL cannot be retrieved, often due to an empty file/element.

### ECL FILE INVALID

**Description**

Displayed when the ECL file identified for the job is not a valid file.

### ECL NOT FOUND

**Description**

Displayed when the ECL identified for the job is not found in the ECL file.

### ECL READ ERROR

**Description**

Displayed when a job's ECL cannot be read, often due to a corrupted ECL file/element.

### FILE DEPEND NOT MET	

**Description**

Displayed when one or more file dependencies for the job are not satisfied.

### JOB IN BACKLOG

**Description**

* The job has been detected in the Exec's backlog.
* May be due to the Exec's Batch Limit setting, or resources required by the job are not yet available.

### PRERUN COMPLETED

**Description**

The job's prerun has completed successfully, the actual job is started next.

### RC= FINNED

**Description**

* Displayed when an "@@CONS RC" command for the job returns a "FINNED" response.
* Indicates the job terminated without providing status information to LSAM, or when the job fails to start, often due to an invalid account code rejected by the system console operator.

### * RC= NOT FOUND

**Description**

* Displayed when an "@@CONS RC" command for the job returns a "NOT FOUND" response.
* Indicates the job is no longer active, but termination status was not communicated to the LSAM, or when the job fails to start.

### RSI RUN NOT ACTIVE

**Description**

* Displayed when the LSAM RSI (DEMAND) session is not active. This may be due to an invalid userid and password.
* The LSAM re-queues the job with a later start time.
* Investigate and correct the RSI issue to re-enable the LSAM to start jobs.
* The LSAM attempts to use the @START command for jobs with the same ACCT/User-ID as the LSAM.

### ST key Error - INVALID USERID

**Description**

This error occurs when SECOPT1 is installed and the User ID used for starting an Exec job is invalid.

### ST STMT SUBMITTED

**Description**

Displayed when the "ST" (start) statement has been submitted to the Exec, but the job has not yet become active.

### START CMD FAILED

**Description**

Displayed when the "@START" command has failed for an unidentifiable reason.

### START FILE PROBLEM

**Description**

* Displayed when the LSAM is unable to manipulate the job's tracking file.
* Additional information is displayed on the system console.

### START STMT SUBMITTED

**Description**

Displayed when the "@START" statement has been submitted to the Exec, but the job has not yet become active.

### TRACKING FILE GONE

**Description**

* Displayed when a job terminates without providing termination status to the LSAM, causing the job's tracking file to be deleted.
* This indicates a job error termination, or an ECL issue involving the premature releasing of the tracking file.