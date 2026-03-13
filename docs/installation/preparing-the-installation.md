# Prerequisites

Complete these prerequisites before proceeding with either a [New Installation](new-installation) or an [Upgrade](upgrade). Use the [Installation Parameters Worksheet](installation-parameters-worksheet) to record the required values as you work through this page.

## System Parameters

### File Qualifer

LSAM files must be referenced with an assigned file qualifier. SMA recommends using the standard qualifier "LSAM".

### Account and User-IDs

:::info Note

The site-defined account codes and user-IDs must be established prior to the installation.

:::

When these items are not defined, they are taken from the demand session of the installer. These account codes are used by all LSAM batch runs.

The account code used by all OpCon/xps LSAM batch runs must have the following capabilities:

* Allow "Real-time" priority
* Allow "RSI" access (sign-on a demand terminal)

The LSAM requires two types of user-ids: the first is the appropriate user-id for the account. This user-id is used by all batch runs (known as the "Batch User-id"). The second user-id is an "RSI User-id"; this is used to sign-on a generic demand terminal session (the LMAM does not require this User-id).

### RSI User-ID 

This user-id may be the same as the "Batch User-id" and must have the characteristics listed below.

The following lists the requirements and restrictions necessary for installation:

* The password time-out period should be as long as allowed. Forcing password change at next logon should not be used.
* The "time-out" period must be the maximum allowed or "disabled."
* Automatic @RUN statement generation (system generated).
* Maximum session time must be the longest allowed.
* The "console mode" is "response."
* The "console mode" must not be "restricted" to any site.
* All console "keyins" must be allowed. Identify each keyin type with an asterisk ("*").
* All console "message groups" must be allowed. Identify each group with an asterisk ("*"); do not use "R."
* All privileged executive requests must be allowed.
* All performed privileges should be allowed. Identify each privilege with an asterisk ("*").

### LSAM/LMAM User-ID

Execution privileges are required for the LSAM/LMAM.

| Privilege | User Attribute | Description |
| --------- | -------------- | ----------- |
| COMP$PRV | SSCONSOLE | Privileged COM$ functions |
| BYRPVFLC | SSBBPFC | Bypass private file check when the LSAM may start jobs from private files |
| BYCL | SSBYCL | Bypass clearance level check when the LSAM may start jobs from files with varying clearance levels |
| BYCOMPMT | SSBYCOMP | Bypass compartment validation when the LSAM may start jobs from files for various compartments |
| SMOQUE | SSSMOQUE** | Access Symbiont Queue files |

:::info Note

The SMOQUE$ privilege and use is required only for the Job Output Retrieval System (JORS). This ER is not used by XFRTCP, the LSAM, or the LMAM. For information on JORS, refer to [Configure Job Output Retrieval System (JORS)](../configuration/configure-jors).

:::

These are the Executive Requests utilized by the LSAM.

| Executive Request | Description |
| ----------------- | ----------- |
| ACT$ | Activity activation |
| BANK$	| Program bank manipulation |
| COM$ | Console output |
| COND$	| Condition Word retrieval |
| DACT$	| Activity deactivation |
| FORK$	| Program activity initiation |
| EABT$	| Error/Abort activity |
| ERACSF$ | Control Statement Submission (via COBOL) |
| EXIT$ | Activity exit |
| FITEM$ | File/Facility information retrieval |
| IALL$ | Program contingency registration |
| II$ | Interactivity Interrupt processing (II keyins) |
KEYIN$ | Console keyin registration and retrieval |
| MCT$ | Configured device data |
| MSCON$ | MFD data retrieval |
| NAME$	| Activity naming |
| OPT$ | XQT options retrieval |
| RSI$ | Generic DEMAND terminal interface |
| RT$ | Real-time priority switching |
| SDFI$ | SDF file element retrieval |
|SDFO$ | SDF file creation |
| SMOQUE$ | Symbiont Queue retrieval (only for the Job Output Retrieval System [JORS]) |
| TEST&SET | ERs required for Test & Set Queuing |
| TWAIT$ | Timed wait | 

### CMS and CpComm Requirements

The LSAM uses a separate runstream to manage the TCP/IP communications with OpCon/xps. The program, XFRTCP, is a batch program that executes as a Transport Service User (TSU), and communicates with the Networked Systems. This means of communication requires the user to define a "PROCESS" within CMS or CpComm, which is dedicated to the LSAM.

### CMS

For CMS, this can be done by updating the CMS Configuration file and starting CMS, or by adding the PROCESS using CSA. This dynamic add is done by the console "II CMS" (or the CMS runid) keyin, then answering the outstanding message with:

```
0 ADD PROCESS,LSAM TYPE,TSAM ; (the ; is the continuation character)

0 PASSWORD,LSAMPW INTERNET-ADR,IA1
```

Where IA1 names an existing "INTERNET-ADR" entry, (verify the INTERNET-ADR entry first).

The CMS configuration file must also be updated with the new process statement so the next time CMS starts, the process still exists. This should be done prior to proceeding with the LSAM installation. A sample CMS1100 "PROCESS" statement could be as follows:

```
PROCESS,LSAM TYPE,TSAM PASSWORD,LSAMPWD INTERNET-ADR,IA1
```

### CpComm

For CpComm, the "PROCESS" statement is defined in the CpComm configuration file. The following is an example of the CpComm PROCESS statement:

```
PROCESS,LSAM PASSWORD,LSAMPWD
```

When desired, the PROCESS may be associated with a specific TCP/IP address; on the "IP" statement containing the related TCP/IP address, include the name of the Process:

```
IP,IP1 LINK,LINK1 IP-INFO,IPPARAM1;

IP-ADDRESS,111.22.33.44,LSAM
```

An "IP-ADDRESS" which does not identify one or more PROCESS names may be used by any defined PROCESS (refer to Unisys' current Communications Platform Configuration and Operations Guide, publication 7844 8438-xxx, for more information).

These statements must be defined in the CpComm configuration file, and activated, prior to executing the XFRTCP program.

### TIP Parameters

The LSAM/LMAM uses a data file assigned to TIP. The site must assign a local "TIP file number" to be used exclusively by the LSAM/LMAM. The TIP file is used as part of the communication process between the SAM and the LSAM/LMAM.

This TIP file is created, assigned to TIP, and initialized during the LSAM installation procedure. The file may be duplexed and/or managed with the Integrated Recovery Utility (IRU). The LSAM TIP file creation and registration procedure catalogs a single file on a user specified storage device, registers it with TIP, and assigns it to TIP File Control. Sites desiring to utilize local procedures for defining and managing this TIP file must consider the following:

1. The TIP file must contain at least 1200 224 word records, representing a file size of at least 150 tracks.
2. The file must be registered as a Permanent (FIX) file.
3. The file registration must include the Write Without Lock (WW) attribute.
4. The file must be registered and assigned to TIP File Control prior to use by any of the LSAM programs.
5. Prior to initial use, the file must be initialized with the XFRINI/ECL procedure provided with the LSAM's release. Additional modification is required to define local LSAM configuration parameters, using the LSAMCFG/ECL procedure provided with the LSAM release.
6. When the file is to be removed from TIP file control, the LSAM, the LMAM, XFRTCP, and the SMAJOR (when used) runs must be terminated (otherwise they error terminate), and no LSAM-started batch jobs can be active.

### Non-Configured Common Bank (NCCB)

The Unisys OS 2200 LSAM Version 3R31A uses a non-configured common bank to exchange data between some of the modules. The name of the common bank comprises the first nine or fewer characters of the LSAM file qualifier plus the letters "CDB". For example, LSAM file qualifier of "LSAM" results in a common bank name of "LSAMCDB". When renaming the common bank during the installation, verify any user-supplied name is unique within the OS 2200 system.

The installation process asks for the non-configured common bank file containing the bank template for Exec access. Predefine the template files to the Exec (CBANKF parameters). Sites normally have the following files defined for local site use (all files are qualified with SYS$): NCCB, NCCBF1, NCCBF2, TESTFILE, and TEST1 through TEST10.

The installation uses the default file NCCB; however, the installer may change this to use any available file.

:::info Note

Although the file is defined to the Exec on a CBANKF statement, the file may not actually exist on the system. Ensure the selected file does exist and the file is not "write protected". When the file does not exist, catalog the file before installing the OS 2200 LSAM.

:::

### Installing without the Non-Configured Common Bank

The non-configured common bank is required for use of the OS 2200 Job Output Retrieval System (JORS) and OpCon/xps File Transfer capabilities. For sites that do not want to use JORS or File Transfer and do not want the non-configured common bank installed, the following installation steps may be performed:

1. After setting the LSAM Qualifier (step 1 of the "Set LSAM System Parameters" section), but before using the ```@ADD *SKDPRG.INSTALL``` procedure (step 2 of the "Set LSAM System Parameters" section), enter the following copy command:

```
@COPY,S *SKDPRG.COMPILE-SKEL/UPD-NO-CDB,*SKDPRG.COMPILE-SKEL/UPDATES
```

2. Continue the installation procedure with the @ADD *SKDPRG.INSTALL (step 2).

:::info Note

The Common Data Bank prompts will be presented during the installation, and the responses may be "defaulted". The INITIALIZE step of the installation will attempt to copy the common bank template to the SYS$ file. When that file is not present, an error will result. This is not a fatal error, and the installation can continue.

:::

### Site Library Names

The LSAM/LMAM requires access to local site libraries and processors. Identify the names of the following:


#### TIP Library	

* The file, commonly named TIP$*TIPLIB$, containing TIP relocatables used for program collections.
* The file contains relocatables such as "CONECT", "DISCN", "LOCATE", and "FCSS" routines.

#### TIP Absolutes

* The file, commonly named TIP$*TIPRUN$, containing absolute programs used for TIP file registration and assignments.
* Absolutes required are "TFUR" and "TREG".

#### Collector Processor

The processor call for the Collector, commonly called by @MAP.

### Installation Parameters Worksheet

The [Installation Parameters Worksheet](installation-parameters-worksheet) is used to ensure all parameters are available for the installation. When applying updates to an existing installation, the parameters used should be the same as for the current system.
