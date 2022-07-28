# XFRTCP Messages

### TIP FILE NUMBER EXPECTED	

**Description**

The XFRTCP/ECL does not contain the TIPFILE statement after the @XQT XFRTCP statement.
Indicates a corrupted XFRTCP/ECL element.

### INVALID REALTIME PRIORITY: ```<xx>``` 

and 

### * ASSUMING REAL TIME PRIORITY 35	

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not between 02 and 35, inclusive).
* The program assumes the priority of 35.

### REALTIME OPTION SELECTED, BUT NON-NUMERIC LEVEL: ```<xx>``` 
and 

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The RealTime option has been activated on the program's XQT statement, but the priority provided is not valid (not a number between 02 and 35, inclusive).
* The program assumes the priority of 35. The ```<xx>``` field displays the invalid priority provided.

### ** REG KEYIN ERROR, STATUS= ```<keyin-registration-status-code>```

**Description**

* The program received an error while attempting to register a console keyin reserved word.
* The ```<keyin-registration-status-code>``` field contains the error code returned by the registration procedure. Refer to Unisys documentation to identify the meaning of the error code.

### Keyin ```<keyin-word>``` Registered for ```<console-mode>``` users

**Description**

The program has successfully registered the ```<key-word>``` as a console command available to users with the ```<console-mode>``` capabilities, or higher.

### ATTACH TO TSAM AS TSU ```<TSU-name>``` WAS SUCCESSFUL

**Description**

* The XFRTCP has successfully attached to the communications software TSU process.
* The TSU-name field contains the name of the process.

### ATTACH TO TSAM AS TSU ```<TSU-name>``` FAILED

**Description**

* The XFRTCP has failed to attach to the communications software TSU process.
* Most often related to an invalid TSU Process name or password.

### OPCON COMM HANDLER (XFERIF```<xx>```/```<version>```) READY

**Description**

The XFRTCP has successfully initialized and is ready for network communications.

### * UNAUTHORIZED @@CONS KEYIN: 

and 

### ```<Keyin-received>``` 

and 

### RECEIVED FROM: ```<terminal-id>```	

**Description**

* A console keyin from an unauthorized source has been received.
* The ```<keyin-data-received>``` field contains the keyin received.
* The ```<source-of-keyin>``` field contains the terminal identification the keyin was received from.

### SAM / NETCOM USING LEGACY PROTOCOL

**Description**

* The SAM/NETCOM is configured to communicate in LEGACY protocol.
* The configuration must be "Contemporary, Non-XML".

### JOB ```<Opconxps-job-id>``` ERRORED ON ```<mm/dd/yyyy>``` AT ```<hh:mm:ss>``` 

and 

### JOB ```<Opconxps-job-id>``` ECL: ```<qual*file.element/version>```

**Description**

The configuration option is set to display the job's ECL location on error terminations.

### LSAM NO LONGER ACTIVE

**Description**

* The XFRTCP has detected the LSAM is not processing.
* Start the LSAM to resolve.

### LSAM-LOCK FILE NOT FOUND **

**Description**

* The XFRTCP has detected the LSAM-LOCK file is not cataloged.
* Catalog the ```<lsam-qualifier>*LSAM-LOCK``` file to resolve.

### REQUESTS EXCEED OUTWARD FLOW

**Description**

* The XFRTCP is receiving more requests than can be processed.
* Most likely a network communications problem between NETCOM and XFRTCP.

### CANT ESTABLISH EVENT REC LOCK

**Description**

* The XFRTCP is unable to establish a lock on an Event record in the TIP file.
* Most likely a problem with the TIP file definition.

### ```*XFRTCP IS STOPPING*```

**Description**

XFRTCP is in the process of terminating.

### ```**XFRTCP IS TERMINATING*```

**Description**

XFRTCP is terminating.