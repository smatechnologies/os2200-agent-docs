---
sidebar_label: 'SMAMSC'
title: SMA Monitor Services Connector (SMAMSC)
description: "Configure and use the SMA Monitor Services Connector (SMAMSC) with the OS 2200 LSAM for enhanced monitoring capabilities."
tags:
  - Reference
  - System Administrator
  - Agents
---

# SMA Monitor Services Connector (SMAMSC)

## What is it?

The SMA Monitor Services Connector (SMAMSC) is an optional component that can be used to provide additional information about jobs started by the OS 2200 LSAM. The Connector registers with the Unisys Monitor Services background run (MSCP) to receive started run information. The run events are processed to provide status about programs running within the runs and run termination information, in addition to the standard job information provided by other LSAM components.

## SMA Monitor Services Connector Installation

The SMAMSC program and run stream are installed during the standard LSAM installation procedure, however certain local site changes are required.

1. Identify the SMA Monitor Services Connector (SMAMSC) account, user-id, and run stream. The SMAMSC batch account and user-id requires the ```SERVE$``` security attribute. In Fundamental Security environments only the Security Officer's user-id has this attribute. For convenience and security, SMA provides the special run stream ```ST-SMAMSC/ECL``` to allow SMAMSC to be started from the ```SYS$LIB$*RUN$``` file by the system console operator without the need for the user-id and password. To modify and install ```ST-SMAMSC/ECL``` in the ```SYS$LIB$*RUN$``` file: 

    a. Modify the ST-SMAMSC/ECL element contained in the ```*SKDPRG``` file. Change the ```=Account/User-Id=``` fields on the @RUN statement to be the appropriate account and user-id (one with the ```SERVE$``` privilege).

:::tip Example

The following example shows modification of the ST-SMAMSC/ECL element:

@RUN before modification:

```@RUN SMAMSC,=ACCOUNT/USER-ID=,qualifier```

@RUN after modification:

```@RUN SMAMSC,PRODUCTION/SECOFFR,qualifier```

:::

b. Modify the ```*SKDPRG.SMAMSC/ECL``` element ```@XQT``` statement for the SMAMSC program for local site requirements. The @XQT statement is released with the "R" option for Real Time processing priority, and it is a requirement for MSCP Log Entry operation. Other @XQT options that may be used are:

* ```A``` = Process log entries for All LSAMS. Sites using multiple LSAMs within the same OS 2200 partition may have one SMAMSC process run log entries for all of the LSAMs with this option.

* ```P``` = Do not process the programs run by each run. Sites processing many simultaneous jobs may not wish to have the network overhead of SMAMSC messages for the programs run by each job.

* ```E``` = Verbose messages in the log file. Use with ```M``` (```EM```) for both verbose and trace messages. The program's printed option list describes ```E``` as trace messages, but the ```E``` option turns on verbose mode.

* ```M``` = Trace messages in the log file. The program's printed option list describes ```M``` as verbose messages, but the ```M``` option turns on trace mode.

* ```V``` = Display the program version and the allowed ```@XQT``` options only, then stop.

c. Modify the ```*SKDPRG.SMAMSC/ECL``` element to alter the run parameters for SMAMSC. The parameters statement immediately follows the ```@XQT``` SMAMSC statement. This parameters statement contains the following parameters:

* Program Name in columns 1 – 6; required to be SMAMSC.
* TIP File Number (right justified, zero filled) in columns 8 – 11.
* Real Time Priority (right justified, zero filled) in columns 13 – 14; allowed values are 02 – 35.
* Console Keyin (left justified, space filled) in columns 16 – 23.
* User Console Capability required for Demand users to issue Console Keyins in column 25.
    * The allowed values are:
        * ```B``` – user must have at least Basic Console ability
        * ```L``` – user must have at least Limited Console ability
        * ```F``` – user must have at least Full Console ability
        * ```D``` – user must have at least Display Console ability
        * ```R``` – user must have at least Response Console ability
        * ```C``` – system console only; SMAMSC console commands are not accepted from Demand users
        * A blank or any other value is treated as ```D```.
    * The SMAMSC/ECL is installed with the following default values:
        * Program Name: ```SMAMSC```
        * TIP File Number: ```defined during installation```
        * Real Time Priority: ```35```
        * Console Keyin: ```*SMAMSC```
        * User Capability: ```D – Display Console```
    * When these defaults are not acceptable, modify the SMAMSC/ECL for the desired Real Time Priority (2 characters in columns 13 – 14), Console Keyin (maximum 8 characters in columns 16 – 23), and User Capability (1 character in column 25).

d. Copy the ```ST-SMAMSC/ECL``` element to the SYS$LIB$*RUN$ file with an element name easy to include on console ST commands. This allows console commands of "ST element-name" to start the SMAMSC run without a password for the user-id.

:::tip Example

The following example shows copying the ```ST-SMAMSC/ECL``` element to the ```SYS$LIB$*RUN$``` file as element SMAMSC.

```

@COPY,S *SKDPRG.ST-SMAMSC/ECL,SYS$LIB$*RUN$.SMAMSC

```

Console commands of "```ST SMAMSC```" may now be used to start the SMAMSC batch run.

:::

Configure the LSAM using the procedures for configuration (refer to [LSAM and LMAM Configuration](./configuration/page-two-settings.md#line-9---use-monitor-services-connector-smamsc)) to set the "Use Monitor Services Connector (SMAMSC)", item 9 on the **LSAM EXEC Parameters** Page 2 screen, to "Y". When multiple LSAMs are in use within the same OS 2200 partition and the "A" ```@XQT``` option is used for SMAMSC, this configuration parameter must be set to "Y" for all of the LSAM installations.

## SMA Monitor Services Connector Operation

When the SMAMSC is started, it will register to receive console II commands, console KEYIN$ keyins, and connect with the Monitor Services background run (MSCP) to receive system log entries. The system console messages displayed during initialization are similar to:

```

SMAMSC START

SMAMSC*II Keyin Registered

SMAMSC*Keyin *SMAMSC Registered for DISPLAY users

SMAMSC*SMAMSC Registered with MSCP

SMAMSC*== SMAMSC INITIALIZATION COMPLETE ==

SMAMSC*

``` 

Once initialized, the SMAMSC will start monitoring jobs started by the LSAM. Messages generated by SMAMSC are available on the OpCon Enterprise Manager user interface as part of the displayed Job Status and on the Configuration tab of the Job Information display.

## System Console "II {run-id}" Commands

SMAMSC accepts commands from the system console and from authorized Demand users. A set of limited commands are accepted on the console "II {run-id}" command; the accepted commands are:

### HELP 

* Displays commands accepted by SMAMSC. Messages displayed in response to the "II {run-id} HELP" command are:

```

SMAMSC*CONSOLE KEYIN: *SMAMSC FOR DISPLAY CONSOLE USERS.

SMAMSC*

SMAMSC*BRKPT CYCLES THE BREAKPOINT FILE.

SMAMSC*

SMAMSC*HELP DISPLAYS COMMANDS AND PARAMETERS.

SMAMSC*

SMAMSC*LIST LISTS MONITORED RUNS AND PARAMETER SETTINGS

SMAMSC*

SMAMSC*SET CHANGES CONFIGURATION SETTINGS.

SMAMSC*

SMAMSC*STATUS PROVIDES CURRENT PROGRAM STATUS.

SMAMSC*

SMAMSC*STOP TERMINATES THE PROGRAM.

SMAMSC*

SMAMSC*TERM TERMINATES THE PROGRAM.

SMAMSC*

```

### STATUS 

* Provides the current operating status of SMAMSC. Messages displayed in response to a STATUS command are:

```

SMAMSC/vv.vvx BEGAN EXECUTING mm-dd-yy hh:mm:ss

SINCE THAT TIME, THERE HAVE BEEN

999 RUN LOG ENTRIES RECEIVED

999 SMA LOG ENTRIES RECEIVED

999 RUNS MONITORED

999 COMMANDS PROCESSED

(INCLUDING THIS ONE)

```

When they apply, STATUS also displays the following lines:

* ```999 COMMANDS WERE INVALID``` – displayed when at least one command was invalid.
* ```999 PROGRAM ACTIVITY RESTARTS``` – displayed when at least one SMAMSC program activity has been restarted.

### BRKPT  

* Cycles the breakpointed PRINT$ file used by SMAMSC for logging; response to the BRKPT command is:

```

SMAMSC*BRKPT COMPLETE

```

### STOP 

* Terminates the SMAMSC run; console messages displayed in response to the STOP command are the same displayed for the TERM command.

### TERM 

* Terminates the SMAMSC run. Messages displayed in response to the TERM command are:

```

SMAMSC*=== SMAMSC IS TERMINATING ===

SMAMSC*

SMAMSC*=== SMAMSC TERMINATED mm-dd-yy hh:mm:ss ===

SMAMSC*

SMAMSC FIN

```

### ABORT 

* Abort terminates the SMAMSC run and produces a post mortem dump (PMD) in the log file; may be requested by SMA Support while attempting to resolve a reported support issue. Note that this command does not perform normal SMAMSC termination procedures. Console messages displayed in response to the ABORT command are:

```

SMAMSC*=== SMAMSC IS *ABORTING* ===

SMAMSC ABORT

SMAMSC*

SMAMSC ABORT FIN

```

## SMAMSC registered keyin Commands

When the SMAMSC registered keyin is used, the following additional commands are accepted:

### HELP {command} 

* Provides information about a specific command and parameters.

### SET {parameters} 

* Modifies the current running configuration; allowed parameters are:

### VERBOSE ON|OFF  

* Turns ON or OFF verbose messages in the log file; may be requested by SMA support while resolving a reported support issue. ```VERB``` is accepted as an abbreviation for ```VERBOSE```. Any value other than ```ON``` turns verbose messages off.

### TRACE ON|OFF 

* Turns ON or OFF program trace messages in the log file; may be requested by SMA support while resolving a reported support issue. Any value other than ```ON``` turns trace messages off.

* ```SET CONFIG``` and ```SET RUNS``` produce the same displays as ```LIST CONFIG``` and ```LIST RUNS```.

### LIST {parameters} 

* Displays current information about SMAMSC processing. The allowed parameters are:

### CONFIG 

* Displays the current configuration values.

### RUNS 

* Displays the runs currently monitored by SMAMSC. ```RUN``` is also accepted.

### VERBOSE 

* Displays whether verbose messages are on: ```VERBOSE MODE: ON``` or ```VERBOSE MODE: OFF```. ```VERB``` is also accepted.

### TRACE 

* Displays whether trace messages are on: ```TRACE MODE: ON``` or ```TRACE MODE: OFF```.

### TLC 

* Reconnects SMAMSC with the LSAM TIP file and rereads the LSAM configuration parameters and control record. The response is ```TLC COMPLETED```.

## SMA Monitor Services Connector Console Messages

The following messages may be displayed on the system console while SMAMSC is processing:

### \*\* FATAL ERROR - ABORTING

* Indicates a fatal error detected during program processing; other messages indicating the error may be displayed prior to this one.

### \* INVALID REALTIME PRIORITY: 

* {nn}

### \* ASSUMING REALTIME PRIORITY 35 

* An invalid value for the Real Time Priority is contained on the parameters statement; the Real Time Priority of 35 is assumed.

### \* REALTIME OPTION SELECTED, BUT NON-NUMERIC LEVEL: 

* {xx}

### \* ASSUMING REALTIME PRIORITY 35  

* The Real Time ```@XQT``` option is present, but the priority contained on the parameters statement is not numeric; the Real Time Priority of 35 is assumed.

### {lsam-qualifier} NOT CONFIGURED FOR MSCP ACCESS 

* The LSAM is not configured to use SMAMSC; use the ```LSAMCFG/ECL``` to configure SMAMSC use.

### \*\* REG KEYIN ERROR, STATUS= {nn}  

* An error occurred while attempting to register the KEYIN$ console key word. The Status code can be interpreted with the use of the Unisys Exec Systems Software Executive Requests Programming Reference Manual (7830 7899-xxx) in the KEYIN$ section.

### MONITOR SERVICES NOT TURNED ON (0555), WAITING...  

* Indicates the Monitor Services background run (MSCP) is not currently running. SMAMSC will wait for the MSCP run to be started and will attempt to connect with it. SMAMSC tries to connect again about every 60 seconds, and this message may be repeated until the MSCP run becomes active. 

Once an error-free connection is established, the following message is displayed:

```THANK YOU, FOR THE MONITOR SERVICES RUN.```


### \*\* LSAM-PARAMS RECORD LOCKED 

* Indicates the LSAM Configuration Parameters record in the TIP File is unattainable. SMAMSC displays this message after it retries the read at half-second intervals without success.

### \*\* LSAM CONTROL RECORD LOCKED 

* Indicates the LSAM Control record in the TIP File is unattainable. SMAMSC displays this message after it retries the read at half-second intervals without success.

### \* UNAUTHORIZED @@CONS KEYIN:

* ```{keyin text received}```

### RECEIVED FROM: {terminal id} 

* Indicates an unauthorized Demand user attempted to issue a SMAMSC keyin.

### INVALID II KEYIN: {text received}  

* An invalid command was received on an "II {run-id}" keyin. This message will be followed with:
    * ```TRY II {run-id} HELP```