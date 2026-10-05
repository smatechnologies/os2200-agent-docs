---
title: JORS Messages
description: "Console messages from the OS 2200 LSAM Job Output Retrieval System (SMAJOR) and what each one means."
tags:
  - Reference
  - System Administrator
  - Operations Staff
  - Agents
---

# JORS Messages

### TIP FILE NUMBER EXPECTED	

**Description**

* The SMAJOR/ECL does not contain the TIPFILE statement after the @XQT SMAJOR statement.
* Indicates a corrupted SMAJOR/ECL element.

### * INVALID REALTIME PRIORITY: ```<xx>```

and 

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The program's XQT statement activated the RealTime option, but the runstream did not provide a valid priority.
* The ```<xx>``` field displays the invalid priority. Valid priority values range from 02 to 35.
* The program's priority defaults to 35.

### * REALTIME OPTION SELECTED, BUT NON-NUMERIC LEVEL: ```<xx>```

and 

### * ASSUMING REALTIME PRIORITY 35

**Description**

* The program's XQT statement activated the RealTime option, but the runstream did not provide a valid priority.
* The ```<xx>``` field displays the invalid priority. Valid priority values range from 02 to 35.
* The program's priority defaults to 35.

### ** REG KEYIN ERROR, STATUS= ```<keyin-registration-status-code>	```

**Description**

* The program received an error while attempting to register a console keyin reserved word.
* The ```<keyin-registration-status-code>``` field contains the error code returned by the registration procedure.
* Refer to Unisys documentation for the error code's meaning.

### SMA JOB OUTPUT RETRIEVAL ACTIVE - hh:mm:ss.tt

**Description**

The Job Output Retrieval System (JORS) is ready to accept requests.

### Keyin ```<keyin-word>``` Registered for ```<console-mode>``` users

**Description**

* The program successfully registered the ```<key-word>``` as a console command.
* The command is available to users with the ```<console-mode>``` capabilities, or higher.

### * UNAUTHORIZED @@CONS KEYIN:

and 

### ```<Keyin-received>```

and 

### RECEIVED FROM: ```<terminal-id>```

**Description**

* The program received a console keyin from an unauthorized source.
* The ```<keyin-received>``` field contains the unauthorized keyin.
* The ```<terminal-id>``` field contains the keyin's terminal identification.

### JORS RCD READ LOCK FAILURE

**Description**

* The SMAJOR is unable to establish a lock on the JORS record in the TIP file.
* A problem with the TIP file definition is the most likely cause.

### ```*SMAJOR IS STOPPING*```

**Description**

* SMAJOR is in the process of terminating.
* SMAJOR sends this message as the reply to a STOP keyin.

### VERBOSE MESSAGES OPTION SELECTED;

and

### TO TURN OFF, USE: ```<keyin-word>``` MSG0

**Description**

* SMAJOR was started with the M option, so verbose messages are turned on.
* To turn verbose messages off, enter the ```<keyin-word>``` keyin with MSG0.

### CURRENT MSG LVL IS ```<n>```

**Description**

* The reply to the ```<keyin-word>``` MSG? keyin. The ```<n>``` field contains the current message level.
* When the E option is also on, the message ends with ```WITH E OPTION```.

### ```**SMAJOR IS TERMINATING*```

**Description**

SMAJOR is terminating.