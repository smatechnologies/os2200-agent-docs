# Installation/Upgrade

## Stopping the LSAM/LMAM before an Upgrade

1. Terminate the communications between the OpCon/xps server and the Unisys OS 2200 LSAM. Refer to the [Adjusting Stop/Start Communication with Machines](adjusting-communication) in the Enterprise Manager online help for information to stop communications.
2. From a DEMAND terminal, with console keyin privileges, or from the system console, issue the command:
Choose a) or b)

b. @@CONS *LSAM TERM
c. @@CONS II LSAM TERM

:::info Note

The exact keyin may be different based on local configuration since the "*LSAM" console keyin may be different than the default. Also, the "II LSAM TERM" command requires the current Run-ID of the LSAM (e.g., "II LSAMA TERM").

:::

## Uploading the LSAM File

On a Windows machine, FTP the LSAM file from the OpCon/xps Installation DVD-ROM to the Unisys OS 2200 machine. This procedure uses the basic FTP program distributed with the Windows Operating System. For other FTP programs, procedure steps may vary.

:::info Note

The Windows machine in the example below has a DVD-ROM drive letter of E.

:::

#### Transferring the LSAM File with FTP

1. Use menu path: Start > Run.
2. Enter CMD in the Run text box.
3. Click the OK button.
4. Change directory to the DVD-ROM drive of the Windows machine: E:
5. Change directory on the DVD-ROM drive to the location of the Unisys OS 2200 LSAM file:
```CD "INSTALL\LSAM\Unisys OS 2200 LSAM\<LSAM VERSION>"```
6. Enter the FTP command and the TCP/IP address of the Unisys OS 2200 system:
FTP ```<TCP/IP address>```
7. Sign on to the Unisys OS 2200 system with a valid userid/password:
User (127.0.0.1: (none)): ```<User ID>```
Password: ```<Password>```
8. Set the transfer type to binary: ```BIN```
9. When using the CPFTP program, enter: quote site TASC
10. Enter the command to transfer the file from the DVD drive on a PC to the Unisys OS 2200 system: PUT LSAM ```<lsam qualifier>*<LSAM-VERSION>```.

:::tip Example

```put lsam lsam*5R1A```

:::

11. Exit the FTP program: BYE.
12. When FTP errors occur or when there is an indication of zero bytes transferred, repeat the FTP procedure.
13. From a DEMAND terminal on the Unisys OS 2200 system, catalog the primary program file ```SKDPRG: @CAT,PV <lsam qualifier>*SKDPRG(+1).,<device specifications>```

:::caution

For update installations, the device specifications must match the existing SKDPRG file specifications.

:::

:::info Note

For an initial installation of the LSAM, the minimum file size must be 400 tracks. The recommended maximum is 1024 tracks on any mass storage device.

:::

:::tip Example

The following example shows cataloging SKDPRG with a minimum file size of 400 tracks and maximum of 102:

```@CAT,PV <lsam qualifier>*SKDPRG(+1).,FMD/400/TRK/1024,<packid>```

:::

14. Copy the elements from the FTP'd file to the new cycle of the SKDPRG file:

```@COPY,P <lsam qualifier>*5R1A.,<lsam qualifier>*SKDPRG.```

## Installing the LSAM Overview

1. Review the required Installation Parameters and determine the local values for these parameters.
2. Determine the need for direct modification of the installation parameters and modify when necessary.
3. Using the INSTALL procedure, enter the LSAM System Parameters, Installation Options, Program Collection Parameters, and File Placement Parameters.
4. Activate the generated Install runstream created in step 3.
5. Upon successful completion of the INSTALL procedure, perform the INITIALIZE procedure to generate runstreams, create and initialize the needed files.
6. After completing the INITIALIZE procedure, create and/or initialize the TIP file (step 22 of the [Installing the LSAM into the Unisys OS 2200 System](installing-the-LSAM-into-system) sub-procedure).
7. After the TIP file initialization, use the LSAMCFG/ECL procedure to define local configuration parameters.
8. If used, install MAM into each of the BIS Systems where OpCon/xps schedules background runs.
9. Review the generated runstreams and modify as needed for local site requirements. For more information, refer to [Modify Run Streams](modify-run-streams).

### Installing Multiple LSAMS within the same OS2200 Image

Multiple LSAMs may be installed and used concurrently by separating the installations with unique values for some installation and configuration parameters. The following Installation Parameters must be unique for each LSAM:

1. The File Qualifier used for the LSAM files.
2. The TIP File name and number.
3. The Common Data Bank (CDB) name; the installation procedure uses the File Qualifier as a portion of the CDB name by default, resulting in a unique name for each installation.

The following Configuration Parameters (set with LSAMCFG/ECL) must be unique for each LSAM:

4. The CpComm/CMS PROCESS name; requires defining a unique PROCESS to CpComm/CMS for each installed LSAM.
5. The OpCon/xps host machine name; must match the name of the machine as defined to OpCon/xps.
6. The console reserved keyin for the LSAM, LMAM, SMAJOR, and XFRTCP runs.
7. The Port Number of the LSAM.

### Setting Installation Parameters (INSTALL/SGS)

The installation parameters consist of a set of SGS statements used to generate the installation runstreams; these are commonly referred to as INSTALL SGS and are contained in the element INSTALL/SGS of the SKDPRG program file. These parameters are modified by the responses given to the INSTALL procedure prompts. Therefore, direct modification of the parameters is seldom required.

### Installation Parameter Categories

The INSTALL/SGS contains two categories of parameters:

* Installation parameters: these parameters must be correct to properly install the LSAM and *must* be modified prior to generating installation runstreams.
* Run-time parameters: these parameters identify options during the LSAM's program executions. These parameters are required for installation, but may be altered without requiring the installation to be performed a second time.

### Direct Customization of the INSTALL/SGS

Direct customization of the INSTALL/SGS may be required to meet various local site configurations. The following conditions require direct modification of the installation parameters *prior* to using the INSTALL procedure:

1. LMAM and MAM Non-standard Background Error RIDs. Using a non-standard BIS Background Error Report location, other than 3B208/209, requires direct modification of the INSTALL/SGS. Sites using an alternate Background Error RID must identify the location in the following SGSs:

| SGS Label | Parameter |
| --------- | --------- |
| ERRMODE | Cabinet (Mode) |
| ERRTYPE | Drawer (Type) | 
| ERRRID | Report (RID) |

2. Sites using a non-standard BIS Background Error RID (3B208/209) format require direct modification of the INSTALL/SGS. The BIS MAM assumes the location of the following field positions in the Background Error RID:

| Field Name | Starting Column |
| ---------- | --------------- |
| Date | 2 |
| Time | 9 | 
| User-ID | 31 |
| Station Number | 48 |

When the format of the Background Error Rid is different, the following SGSs must be modified:

| SGS Label | Parameter |
| --------- | --------- |
| DATECOL | Starting column number of the date |
| TIMECOL | Starting column number of the time | 
| USERCOL | Starting column number of the user-id | 
| STNCOL | Starting column number of the station-id (terminal number) |

### Setting LSAM System Parameters

The system parameter for the qualifier to be used by the LSAM is established with the @QUAL statement. This is the qualifier the SKDPRG file is cataloged with and is used by all LSAM programs and runstreams requiring the LSAM qualifier.

#### Set LSAM System Parameters

Perform the following steps from a Unisys OS 2200 DEMAND session:

1. Set the LSAM qualifier: ```@QUAL [qualifier]```
2. Generate the installation runstream containing the local site parameters:
```@ADD *SKDPRG.INSTALL```

:::info Note 

To terminate the installation procedure, enter @EOF at any prompt. This produces an SSG error message and terminates the process. Some prompts may be omitted/included due to preceding responses. For example: responding to "Do you want to install LSAM?" with an "N" omits the installation prompts.

:::

3. Enter local site configuration parameters after the screen displays:

```

level = LSAM level of this release

siteid = local machine Site-ID

xxxx/xxx = local machine type

```

:::info Note 

When a previous installation of the LSAM is detected, the following prompt is displayed:

*Installation Parameters for Release xxxx found,*
*Do you want to use those parameters as defaults? (Y,N) ```<Y>```*

 Respond with "Y" to use the local parameters from the previous installation. The installation prompts will be presented, as defined below, with default values set to the previous parameters. Any parameter may be modified by entering a new value when prompted.

Respond with "N" to use the parameter defaults as provided for the LSAM release being installed.

:::

4. At the Enter account/Userid to use for LSAM runs ```<account/userid>``` prompt, enter the desired account code and userid for LSAM runstreams and programs.

:::info Note 

If valid, transmit to accept the default account/userid.

:::

5. At the Enter Project ID to be used for LSAM runs ```<LSAM>``` prompt, enter the project identifier for LSAM runstreams and programs.

:::info Note

If valid, transmit to accept the default Project ID.

:::

### Setting LSAM Installation Options

1. At the Do you want to install LSAM? (Y,N) prompt:
a. Transmit Y to install the new release.
b. Transmit N to recollect the programs *after* the release has been installed.
2. At the Do you want to install the LSAM BIS feature (LMAM)? (Y,N) prompt:
a. Transmit N to *not* generate LMAM and MAM installation modules.
b. Transmit Y to generate the necessary modules for the MAM and LMAM installation.
3. At the Enter the LSAM TIP communication file number (4 digits) <0021> prompt, enter the local TIP File number to be used by LSAM. Transmit to accept the displayed default.

:::info Note

This is the TIP file the OpCon/xps server and the Unisys OS 2200 LSAM/LMAM use to communicate with one another. This TIP file should be designated for OpCon/xps' use prior to SMA's on-site arrival.

:::

4. At the Enter the local name for the LSAM NCCB data bank ```<default>``` prompt, enter the *desired local name of the LSAM non-configured common bank*. The displayed default is the LSAM-Qualifier (up to the first nine [9] characters) plus "CDB"; this default is acceptable for all installations and should be changed only when local site standards dictate specific naming conventions for non-configured common banks, or when the first nine characters of the LSAM-Qualifier are not unique among all installations of the LSAM within the OS 2200. When the default name is changed, it must be unique among all non-configured common banks on the system. To accept the default, simply transmit.
5. At the Enter the local NCCB file for the LSAM data bank ```<default>``` prompt, enter the *local Exec file, without the file qualifier, to contain the NCCB template that describes the common bank*. The selected file must be cataloged (with a qualifier of SYS$) and defined to the Exec. Transmit to accept the displayed default. The initialization procedure copies the NCCB template to this file.

### Setting Program Compile/Collection Parameters

When installing or recompiling LSAM programs, the following prompts are presented for responses:

1. At the ```Are you using the Flagging COBOL compiler? (Y,N) <N>``` prompt:
Choose a) or b)
a. Transmit Y to use the Flagging compiler and to maintain standard ANSI COBOL conventions.
b. Transmit N to not use the Flagging compiler and to not maintain standard ANSI COBOL conventions.
2. At the Is the LSAM communications PROCESS defined in ```CMS (<Y>/N)?``` prompt:
a. Transmit Y when the LSAM PROCESS has been defined in CMS-1100 for communications.
Choose i) or ii)
i. At the ```Use Default CMS Library? (Y/N) <Y>``` prompt, transmit Y allowing the Collector to use the default CMS library as defined in COMUS.
ii. Transmit N to define another CMS Library. At the ```Enter CMS Library File Name <SYS$LIB$*CMS1100>``` prompt, enter the library file name containing the CMS-1100 modules to be collected into absolute programs.
b. Transmit N if the site is using CpCOMM.

:::info Note 

The Y (Yes) response installs an LSAM that interfaces with CMS-1100 or that interfaces with CpComm using SILAS. An N (No) response installs an LSAM that interfaces with CpComm only.

:::

i. At the Enter CpComm library file name (```<default>```) prompt, enter the CpComm library file name.

:::info Note 

The library file name is normally ```CPCOMM*LIB$<mode>``` where ```<mode>``` is the Solar/Comus installation mode (typically an "a") for CpComm. Review the Solar/Comus installation data for the CpComm product at the site to confirm the actual file name to use.

:::

3. At the Enter file name containing TIP relocatable library ```<TIP$*TIPLIB$>``` prompt, enter the filename containing the TIP relocatables used for program collections.

:::info Note

The file is normally named TIP$*TIPLIB$ with relocatables such as "CONECT", "DISCON", "LOCATE", and FCSS routines.

:::

4. At the Enter file name containing TIP absolutes ```<TIP$*TIPRUN$>``` prompt, enter the file name containing TIP absolute programs for file registration and assignment.

:::info Note

Absolutes required are "TFUR" and "TREG", or "FREIPS" (when used). The file containing TIP absolutes is commonly TIP$*TIPRUN$.

:::

5. At the Enter COBOL I-Bank start address at your site <022000> prompt, enter the starting address of program I-Banks the site uses when collecting (@MAP) programs.
Choose a) or b)

a. The recommended response is 022000 indicating an ASCII COBOL Common Banked environment.
b. If the site does not use 022000 as the normal starting address for program I-Banks, respond to this prompt with 01000 forcing Non-Common Banked program collections to be performed. This requires additional information regarding run-time relocatable libraries, but resolves any addressing conflicts. Refer to [Non-common Banked Program Collection](non-common-banked).

6. At the Enter ACOB DML Library file name ```<SYS$LIB$*ACOB-DML>``` prompt, enter the file name containing the ASCII COBOL DML banks for program collections.

:::info Note

The ACOB DML Library file containing the element CBEP$$ACOB/FULL-LIB-CB is commonly named SYS$LIB$*ACOB-DML.

:::

### Set File Placement Parameters

The Unisys OS 2200 LSAM and LMAM require files for programs, runstreams, reports, and log data. The two primary files are SKDPRG which contains all LSAM and LMAM modules, runstreams, and installation parameters, and the ABS file which contains all LSAM and LMAM absolute program modules. The user determines where the SKDPRG file is placed when it is cataloged prior to the installation. During the installation the ABS file is cataloged with the same placement as the previous ABS file (prior file cycle) or, when this is a new installation, the ABS file is cataloged with the same placement as the SKDPRG file. Define the placement for other files by responding to the following installation prompts.

To set the physical placement of the files, perform the following:

1. At the ```Enter the device, type pack for the file-name file: <F,FIX>``` prompt.
2. Choose a) or b) or c) or d)
a. Enter the device type (e.g., F, FMD, or other device specification type) and the Pack-ID for "removable packs".
b. Enter FIX for fixed mass storage.
c. Accept the default when the displayed device pack information is correct.
d. Enter ALL to select the last entered or defaulted device/pack information for all remaining files.

:::info Note

Entering "ALL" applies the device/pack last entered (or defaulted) to all remaining files, and the installation no longer displays prompts for file placement. Regarding the install for the Unisys OS 2200 LSAM, refer to [Preparing for the Installation](/installation/preparing-the-installation).

:::

:::tip Example

The following example shows how responses to the File Placement prompts are used when cataloging the files:

```

Response of "F,FIX" generates @CAT file-name.,F///size

Response of "FMD,PACK01" generates @CAT file-name.,FMD///size,PACK01

```

:::

### Files for Placement

The files that are prompted to provide placement criteria for are:

**LSAM-LOCK**	

##### For Installations

All Unisys OS 2200 installations	

##### Description

* This file prevents concurrent executions of the LSAM.
* This LSAM requires this file upon startup.
* This file remains empty.

**SMAJOR-LOCK**

##### For Installations

All Unisys OS 2200 installations

##### Description

* Like the LSAM-LOCK file, this file prevents concurrent executions of SMAJOR.
* SMAJOR requires this file upon startup.
* This file remains empty.

**SMAMSC-LOCK**

##### For Installation

All Unisys OS 2200 installations utilizing the SMA Monitor Services Connector	

##### Description

* Like the LSAM-LOCK file, this file prevents concurrent executions of SMAMSC.
* SMAMSC requires this file upon startup.
* This file remains empty.

**XFRTCP-LOCK**	

##### For Installation

All Unisys OS 2200 installations	

##### Description

* Like the LSAM-LOCK file, this file prevents concurrent executions of XFRTCP.
* XFRTCP requires this file upon startup.
* This file remains empty.

**BKLSAM**

##### For Installation

Unisys OS 2200 LSAM installations

##### Description

* This file contains log data from the LSAM.
* This file is cycled every day at midnight and whenever the BRKPT command is issued to the LSAM.
* Upon startup, the LSAM-RUN/ECL runstream both catalogs and cycles this file.
* SMA recommends allowing this file the default 32 file cycles to provide 30 days of log entries.


**BKSMAFTA**

##### For Installation

All Unisys OS 2200 installations	

##### Description

This file contains the log entries for SMA File Transfer jobs.

**BKSMAJOR**

##### For Installation

All Unisys OS 2200 installations	

##### Description

* This file contains the log entries generated by the SMAJOR runstream.
* The SMAJOR/ECL runstream catalogs and cycles this file:
    * Each time the runstream is used.
    * Everyday at midnight while the job is processing.
    * Whenever the BRKPT command is issued.
* SMA recommends allowing this file the default 32 file cycles to provide 30 days of log entries.

**BKSMAMSC**

##### For Installation

All Unisys OS 2200 installations utilizing the SMA Monitor Services Connector	

##### Description

* This file contains the log entries generated by the SMAMSC runstream.
* The SMAMSC/ECL runstream catalogs and cycles this file:
    * Each time the runstream is used.
    * Everyday at midnight while the job is processing.
    * Whenever the BRKPT command is issued.
* SMA recommends allowing this file the default 32 file cycles to provide 30 days of log entries.

**BKXFRPRT**	

##### For Installation

All Unisys OS 2200 installations	

##### Description

* This file contains log data from XFRTCP, and is cycled each day at midnight, and whenever the BRKPT command is issued to XFRTCP.
* This file is cataloged and cycled by the XFRTCP/ECL runstream each time it is started.
* SMA recommends this file be allowed the default 32 file cycles to provide 30 days of log entries.

**BKXFRPRT**

##### For Installation

All Unisys OS 2200 installations	

##### Description

* This file contains the PRINT$ entries generated by the runstream.
* The XFRPRT/ECL runstream catalogs and cycles this file each time the runstream is used.

**DUMPCDB-PRT**

##### For Installation

All Unisys OS 2200 installations	

##### Description

* This file contains the printout (i.e., dump) of the non-configured common bank (nccb) used for data exchange between certain LSAM modules.
* The DUMPCDB/ECL runstream catalogs and cycles this file each time the runstream is used.

**LSAMPARMBKP**

##### For Installation

All Unisys OS 2200 installations

##### Description

* This file contains the after images of the LSAM configuration parameters when updated by the LSAMCFG/ECL.
* This file is used by the LPARMRES/ECL procedure when restoring LSAM configuration parameters.

**XFRPRT-PRT**

##### For Installation

All Unisys OS 2200 installations	

##### Description

* This file contains the print out (i.e., dump) of the TIP file used for LSAM configuration and communication.
* The XFRPRT/ECL runstream catalogs and cycles this file each time the runstream is used.

The following files are used only when LMAM and BIS MAM are installed:

**BKLMAM**

##### For Installation

BIS MAM/LMAM	

##### Description

* This file contains log data from the LMAM.
* Upon startup, the LMAM-RUN/ECL runstream catalogs and cycles this file:
    * Every day at midnight.
    * Whenever the BRKPT command is issued to the LMAM.
* SMA recommends allowing this file the default 32 file cycles to provide 30 days of log entries.

**LMAM-LOCK**

##### For Installation

BIS MAM/LMAM	

##### Description

* Similar to the LSAM-LOCK and XFRTCP-LOCK files, this file prevents concurrent executions of the LMAM.
* The LMAM requires this file upon startup.
* This file remains empty.

**SAM-MAM-LOCK**

##### For Installation

BIS MAM/LMAM	

##### Description

* Both the LMAM and the MAM use this file to detect when the LMAM is processing.
* This file is required to be present when the LMAM is started.
* This file remains empty.

**MAM-x-LOG**

##### For Installation

BIS MAM/LMAM	

##### Description

* This file contains the day's MAM log data, ELT'd from RID 7 of MAM's data type.
* While MAM is processing, a new cycle of this file is created every day at midnight.
* A new cycle is also created whenever the number of log entries exceeds 3000 lines.
* SMA recommends allowing this file the default 32 cycles to provide 30 days of log entries.

**MAM-x-FINLOG**

##### For Installation

BIS MAM/LMAM	

##### Description

* This file contains the day's MAMFIN entries, ELT'd from RID 8 of MAM's data type.
* While MAM is processing, a new cycle of this file is created every day at midnight.
* This file remains empty when MAMFIN is not used for run termination status.

**MAM-x-BACKUP**

##### For Installation

BIS MAM/LMAM	

##### Description

* This file contains the MAM BIS RIDs when the run MAMBACKUP is executed.
* This file is also used to restore MAM BIS RIDs by MAMRESTORE.

### Installing the LSAM into the Unisys OS 2200 System

1. Upon completion of responding to the installation prompts, install the LSAM with the following command from a Demand terminal: @ADD *SKDPRG.INSTALL/ECL
2. If Errors are displayed during the execution of the install/ecl above, please review the Lsam-print file for additional detail.

:::info Note

After completion of the Install runstream, the inputs provided to the INSTALL prompts are stored in the "INSTALL/SGS." element.

:::

3. Initialize the LSAM runstreams and files:
@QUAL [qualifier-name]
@ADD *SKDPRG.INITIALIZE
4. Upon completion of the runstream, review the INIT-PRINT print file to ensure there are no errors. If there are errors, review the error messages, make the necessary corrections, and perform the installation procedure again.
5. Set up the TIP file. The LSAM uses a TIP file to communicate with the XFRTCP batch run and the TIP file must be registered to TIP before bringing up the LSAM. Initialize this LSAM TIP Communication file by using either step below.

:::info Note 

If this is a new install, use step a to catalog the file, register it to TIP, and initialize it. If this is an update install, then use step a only if changing the file placement information or if changing the TIP file number. Typically, an update install uses only step b to initialize the job portion of the communication file and retains the configuration data.

When local site procedures have been used to create the TIP file and assign it to TIP File Control, step a can be bypassed.

:::

a. When performing a new installation, or changing the file placement information, or changing the TIP file number, enter @QUAL [LSAM-qualifier]

* For TFUR/TREG users, enter @ADD *SKDPRG.TIPREG/ECL
* For FREIPS users, enter @ADD *SKDPRG.FTIPREG/ECL

b. When performing an upgrade installation, initialize the file by entering:
@QUAL [LSAM-qualifier]

@ADD *SKDPRG.XFRINI/ECL

6. Enter the file name for ```TIP COMM File Default <LSAMCOMM>```
(The file is cataloged with the LSAM qualifier and the file name entered.)
7. Enter Device Pack-ID for TIP COMM File

:::tip Example

The following example shows appropriate responses:

Enter Device Pack-ID for TIP COMM File

```F OR F70M,PAK001```

:::

### Start the MAM Generation Procedure

:::info Note

When LMAM and MAM are not installed, go to Step 1 in [Modify Run Streams](modify-run-streams).

:::

1. Set the LSAM qualifier: @QUAL [qualifier]
2. Generate the MAM modules containing the local site parameters:
* @ADD *SKDPRG.MAM/GEN
3. This starts the MAM generation procedure which requests the following information:

a. Enter SITE-ID for this MAM ```<x>```:

* Each MAM must be identified by a unique SITE-ID. This SITE-ID is a single character which may consist of 0 (zero) through 9, or A through Z except for the letters T and U. The SITE-ID is used to control each MAM and to identify to which MAM the BIS jobs are to be distributed.

b. Enter BIS Drawer for MAM data ```<x>```:

* Enter the Drawer (Type) letter for MAM's Data Drawer. The valid values are B,C,D,E,F,G,H, or I. MAM's Data Drawer is used to store data manipulated by MAM.

c. Use different User-IDs to start runs with ```<N>```?

* MAM can start runs using different User-IDs, to do this a RID must be used to contain OpCon/xps Job-IDs, User-IDs, and Passwords for those jobs to be started with a specific User-ID and Password. Releases prior to MAM/8.00 always used MAM's User-ID to start all runs. To continue this practice, respond to this question with "N", the default.

d. Monitor runs by User/Run-Name/Terminal ```<Y>```?

* MAM can monitor runs by User/Run-Name/Terminal or by only User/Terminal (allows runs to LNK and RUN other runs), for User/Terminal monitoring the JOB/USER capability should be used, as described above. Releases prior to MAM/8.00, MAM always monitored runs by User/Run-Name/Terminal. To continue this practice, respond to this question with "Y", the default.

e. Do you wish to use MAMFIN ```<N>```?

* Runs MAM starts can provide termination notification by using MAMFIN immediately prior to termination. Not all runs have to use MAMFIN, but some runs may while others may not. Releases prior to MAM/8.00 did not allow MAMFIN at all. To continue this practice, respond to the question with "N". If using MAMFIN and responded with "Y", the following prompt is presented:
* Use only MAMFIN to determine termination status ```<N>```?
* MAM can also search the Accounting Log for run termination status when a MAMFIN log entry is not found. This is useful when not all runs use MAMFIN. Otherwise, when a MAMFIN entry is not found for an inactive run, the run (job) is determined to have "errored". If not all runs use MAMFIN, then respond to the question with "N". If all runs use MAMFIN, and only MAMFIN entries are used to determine run termination status, then respond with "Y".
* After completion of the generation process, the following message is displayed:
    * ```MAM x IS NOW READY TO BE INSTALLED IN BIS```

### Install MAM on the BIS System

1. Sign on in BIS using the MAM sign-on and perform the following steps:
2. Enter RET P.

    a. Qualifier = [LSAM-qualifier]

    b. File Name = SKDPRG

    c. Element = MAMINSTAL

    d. BIS Format = N

    e. Add Headings = Y

    f. Drawer = [MAM's Run Drawer (Type)

3. Replace the Result into RID 7 of MAM's Run Drawer (Run Type).
4. Enter MAMINSTAL and check the terminal for errors.

:::info Note

Sites using multiple MAMs must perform this procedure, beginning at Step 23, for each MAM to be installed.

:::

### Modify Run Streams

1. If necessary, modify the ECL streams for START-UP, XFRTCP, the LSAM, and the LMAM (when used). These runstreams must be modified when:
* The Account for these runs does not allow Real Time priority, or
* Real Time is not to be used, or
* The Real Time priority level desired is other than priority 35.

    a. Modify the START-UP/ECL runstream. The START-UP/ECL is an easy method of starting LSAM, LMAM, and XFRTCP.
        
        * The installed runstream for only an LSAM installation contains:

```

@RUN STLSAM,acct/user,projid @ QUAL LSAM @START *SKDPRG.LSAM-RUN/ECL @START *SKDPRG.XFRTCP/ECL @ . START *SKDPRG.LMAM-RUN/ECL

@ FIN

```

        * For an installation of both LSAM and LMAM, the runstream contains:

```
@RUN STLSAM,acct/user,projid @ QUAL LSAM @START *SKDPRG.LSAM-RUN/ECL @START *SKDPRG.XFRTCP/ECL @START *SKDPRG.LMAM-RUN/ECL

@ FIN

```

        * For an installation of only an LMAM, the runstream contains:

```
@RUN STLSAM,acct/user,projid @ QUAL LSAM @START *SKDPRG.XFRTCP/ECL @START *SKDPRG.LMAM-RUN/ECL

@ FIN
```

        * Copy the START-UP/ECL element to the SYS$LIB$*RUN$ file with a name easy to use (e.g., "LSAM"). This allows starting all runs with a single console ST command (e.g., "ST LSAM").

    b. Modify the XFRTCP/ECL runstream.

        * When Real Time is not to be used, remove the "R" option from the @XQT,R XFRTCP statement. The resulting statement is @XQT XFRTCP.

2. When the Real Time priority level is not 35, modify the TIPFILE ```<TIP file number> ```35 parameter statement immediately after the @XQT,R XFRTCP statement: TIPFILE ```<TIP file number><Real Time priority>```

:::info Note 

Valid values for Real Time Priority are two-digit integers 02 through 35.

:::

3. Modify the LSAM-RUN/ECL runstream.

    a. When Real Time is not to be used, remove the "R" option from the @XQT,R LSAM statement. The resulting statement is @XQT LSAM.

    b. When the Real Time priority level is not 35, modify the ```<TIP file number>``` 35 parameter statement immediately after the @XQT,R LSAM statement: ```<TIP file number><Real Time priority>```.

:::info Note 

Valid values for Real Time Priority are two-digit integers 02 through 35.

:::

4. If any write protection attributes were removed from the Exec NCCB file, those protections may be re-applied at this time.

5. Establish the Job Output Retrieval System (JORS) account, user-id, and runstream. For information on JORS, refer to Configure Job Output Retrieval System (JORS). The JORS batch account and user-id requires the SSSMOQUE security attribute. A Fundamental Security environment requires the SMAJOR job to use the security officer's user-id. For convenience and security, SMA provides the special runstream STSMAJOR/ECL. Modify and install STSMAJOR/ECL in the SYS$LIB$*RUN$ file.
6. Modify the STSMAJOR/ECL element contained in the *SKDPRG file. Change the =Account/User-Id= fields on the @RUN statement to be the appropriate account and user-id (one with the SSSMOQUE privilege).

:::tip Example 

The following example shows modification of the STSMAJOR/ECL element:

```

@RUN before modification:

@RUN SMAJOR,=ACCOUNT/USER-ID=,qualifier

@RUN after modification:

@RUN SMAJOR,PRODUCTION/SECOFFR,qualifier

```

:::

7. Copy the STSMAJOR/ECL element to the SYS$LIB$*RUN$ file, with an element name easy to include on console ST commands. This allows console commands of "ST element-name" to start the SMAJOR run without a password for the user-id.


:::tip Example 

The following example shows copying the STSMAJOR/ECL element to the SYS$LIB$*RUN$ file:

```@COPY,S *SKDPRG.STMAJOR/ECL,SYS$LIB$*RUN$.SMAJOR```

Console commands of "ST SMAJOR" may now be used to start the JORS batch run.

:::

8. Configure the LSAM using the procedures for configuration. Refer to [LSAM and LMAM Configuration](lsam-and-lmam-configuration).

:::info Note 

Enter configuration information before bringing up the LSAM. To update configuration information: @ADD *SKDPRG.LSAMCFG/ECL. For information on configuration parameters, refer to [LSAM and LMAM Configuration](lsam-and-lmam-configuration).

:::

### Non-common Banked Program Collection

For those sites not using a program absolute starting address of 022000 for ACOB DML program collections, the following information is required to perform a non-common banked collection with a starting address of 01000. These prompts are presented when the response to the prompt "Enter COBOL I-Bank start address at your site" is not 022000. Refer to step 15 in the procedure for Setting Program Compile/Collection Parameters.

#### Set Up Non-common Banked Program Collection

1.At the Enter file name containing COBOL run time relocatables ```<SYS$LIB$*ACOB-CB>``` prompt:

Choose a) or b)

a. Enter the local file name containing the COBOL run time relocatable elements.

b. Accept the default, the *SKDPRG file contains COBOL run time banks required by the LSAM.

2. At the Enter file name for COBOL run time program banks <*SKDPRG> prompt:

Choose a) or b)

a. Enter an alternate file name, which is cataloged and available for "write access", to store the COBOL run time banks.

b. Accept the default, the *SKDPRG file is released with the generated COBOL run time program banks used to collect LSAM programs.

3. At the Enter file name containing PCIOS run time relocatables ```<PCIOS*PCIOS-REL>``` prompt, enter the local file name containing the PCIOS relocatable elements for program collections.

4. At the Is PCIOS (C)ommon-banked or (N)on-banked? ```<N>``` prompt:

Choose a) or b)

a. Enter C (PCIOS is common-banked) for the program collection to include references to the common-bank entry points for PCIOS.

b. Enter N (a non-common banked PCIOS) for the PCIOS relocatable elements to be collected into the program absolute.

5. At the Create COBOL-BANKS elements? ```<N>``` prompt:

Choose a) or b)

a. Enter N when using the COBOL bank elements supplied in the *SKDPRG file.

b. Enter Y to recreate the banks from a local COBOL run time library entered in step 1 above and store the relocatable COBOL elements in the file named in step 2 above.

6. At the Enter file name containing SORT run time relocatables ```<SYS$LIB$*SORT>``` prompt, enter the name of the file containing the SORT relocatables for collection into the absolute program modules.

7. At the Enter file name containing UCSRTS run time relocatables ```<SYS$LIB$*UCSRTS>``` prompt, enter the name of the file containing the UCSRTS run time relocatables for collection into the absolute program modules.

8. At the Enter the file name containing the System Library (SYSLIB) relocatables <```SYS$LIB$*SYSLIB>``` prompt, enter the name of the file containing the system library routines for collection into the absolute program modules. This is the local file name containing the System Library run time elements for program collections.

After completing the responses to these prompts, continue the procedure at step 16 for Setting Program Compile/Collection Parameters.
