---
title: XFRTCP Messages
description: "Console messages from the OS 2200 LSAM communication program XFRTCP and what each one means."
tags:
  - Reference
  - System Administrator
  - Operations Staff
  - Agents
---

# XFRTCP Messages

### TIP FILE NUMBER EXPECTED	

**Description**

The XFRTCP/ECL does not contain the TIPFILE statement after the @XQT XFRTCP statement.
Indicates a corrupted XFRTCP/ECL element.

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
* The program assumes the priority of 35. The ```<xx>``` field displays the invalid priority provided.

### ** REG KEYIN ERROR, STATUS= ```<keyin-registration-status-code>```

**Description**

* The program received an error while attempting to register a console keyin reserved word.
* The ```<keyin-registration-status-code>``` field contains the error code returned by the registration procedure. Refer to Unisys documentation to identify the meaning of the error code.

### Keyin ```<keyin-word>``` Registered for ```<console-mode>``` users

**Description**

The program has successfully registered the ```<key-word>``` as a console command available to users with the ```<console-mode>``` capabilities, or higher.

### ATTACH TO NETWORK AS TSU ```<TSU-name>``` FAILED

**Description**

* The XFRTCP has failed to attach to the communications software TSU process.
* Most often related to an invalid TSU Process name or password.
* When the XFRTCP attaches successfully, no console message is displayed. With verbose messages on, the XFRTCP writes ```ATTACH TO NETWORK AS TSU <TSU-name> SUCCESSFUL, TSU-ID:<tsu-id>``` to its log.

### (4096) CMS/CPCOMM NOT AVAILABLE

**Description**

* Displayed after the attach failure message when the network returns error code 4096.
* The communications software (CMS or CPCOMM) is not available.

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

### INVALID COMM PROTOCOL FROM ```<ip-address>```

**Description**

* The XFRTCP received a message in the old legacy protocol from ```<ip-address>```.
* The XFRTCP drops the connection.
* The configuration must be "Contemporary, Non-XML".
* Earlier releases displayed ```SAM / NETCOM USING LEGACY PROTOCOL``` instead.

### ** (1420) INVALID CONNECTION FROM ```<ip-address>```

**Description**

* The XFRTCP rejected a connection because ```<ip-address>``` is not an authorized IP address.
* The ```<ip-address>``` field shows an IPv4 address as ```a.b.c.d```, or an IPv6 address.

### (1200) ABORTING CONNECTION TO ```<ip-address>```

**Description**

The XFRTCP closes a connection from an IP address that is not authorized.

### (1200) 2ND CONNECTION FROM ```<ip-address>``` (ABORT)

**Description**

* The XFRTCP received a second scheduling connection while a scheduling connection is already open.
* The XFRTCP aborts the new connection.
* When the second connection comes from the same IP address as the open connection, the XFRTCP also closes the open connection.

### (1201) INVALID MSG LENGTH FROM ```<ip-address>``` - CLOSED

**Description**

The XFRTCP received a message too short to contain a message length from ```<ip-address>```, and closes the connection.

### JOB ```<Opconxps-job-id>``` ERRORED ON ```<yymmdd>``` AT ```<hhmmss>``` 

and 

### JOB ```<Opconxps-job-id>``` ECL: ```<qual*file.element/version>```

**Description**

* The configuration option is set to display the job's ECL location on error terminations.
* The date and time are the job's finish date (```yymmdd```) and time (```hhmmss```) with no separators.

### LSAM NO LONGER ACTIVE

or

### LMAM NO LONGER ACTIVE

**Description**

* The XFRTCP has detected the LSAM (or LMAM) is not processing.
* Start the LSAM (or LMAM) to resolve.

### LSAM LOCK FILE NOT FOUND

or

### LMAM LOCK FILE NOT FOUND

**Description**

* The XFRTCP has detected the LSAM-LOCK file is not cataloged.
* Catalog the ```<lsam-qualifier>*LSAM-LOCK``` file to resolve.

### REQUESTS EXCEED OUTWARD FLOW

**Description**

* The XFRTCP is receiving more requests than can be processed.
* Most likely a network communications problem between NETCOM and XFRTCP.

:::note
Current releases do not produce this message.
:::

### UNABLE TO ESTABLISH EVENT REC LOCK

**Description**

* The XFRTCP is unable to establish a lock on an Event record in the TIP file.
* Most likely a problem with the TIP file definition.

### ```*XFRTCP IS STOPPING*```

**Description**

XFRTCP is in the process of terminating.

### ```**XFRTCP IS TERMINATING*```

**Description**

XFRTCP is terminating.