# File Transfer Protocol Interface (FTPAPI)

The SMA File Transfer Protocol Interface (FTPAPI) uses the Unisys OS 2200 Communications Platform File Transfer Protocol Services (CpFTP) to transfer files between hosts utilizing the capabilities of the Unisys CpFTP software.

The FTP Interface includes an ECL run stream containing the parameters and FTP commands and an executable program to act on the commands and report status on the transfer functions.

## Commands

The Interface recognizes the following commands, as supported by the CpFTP Application Program Interface:

* Remote host: host name or IP address
* Remote user: user name, password
* Remote file: file name
* Local file: file name
* Transfer mode: ASCII or Binary
* Direction: get or put

## Additional Commands

Additional commands accepted by SMA's FTPAPI; refer to the Unisys FTP Services User Guide (7847 5753-xxx) for a complete description of these functions:

* AFMT: Process the OS 2200 file in A-Format and discard the 9th bit of each quarter-word.
    * Syntax: AFMT
    * Example: AFMT

* Append: Appends the Local File to the Remote File.
    * Syntax: APPEND
    * Example: APPEND

* CD: Change Directory to another directory.
    * Syntax: CD {directory}
    * Example: CD DirX
        * CD dir1/subdir

* CDUP: Change Directory Up one level.
    * Syntax: CDUP
    * Example: CDUP

* CFMT: Process the OS 2200 file in C-Format and include all 36 bits of each word.
    * Syntax: CFMT
    * Example: CFMT

* DEBUG: Turns on/off debugging messages for the FTP session.
    * Syntax: DEBUG
    * Example: DEBUG

* DELETE: Delete an element of the specified type from the Remote File (applies only to Program Files).
    * Syntax: DELETE ```{remote-file}```,```[element-type]```
        * {```remote-file}``` is the file name of the Remote File and element name contained within the file to be deleted.
        * ```[element-type]``` is the optional type of element to delete from the Remote file. Acceptable element types are:
            * SYM - delete Symbolic element (default)
            * REL - delete Relocatable element
            * ABS - delete Absolute element
            * OMN - delete Omnibus element
            * FIL - delete entire file - applies only to an empty Program File (has no elements)

:::tip Example 

```DELETE MY*FILE.THAT-ELT```

```DELETE ABS*FILE.PGM1,ABS```


:::

* DIR: List the contents of a specified remote directory or the current Directory.
    * Syntax: ```DIR {directory},{list-to}```
        * ```{directory}``` is the directory to be listed - defaults to current working directory.
        * ```{list-to}``` specifies where to place the list - accepted values are:
            * Spaces - do not list contents
            * List contents to current PRINT$ file
            * ```{Qual*File.[element]} - list contents to Qual*File```, optionally to [element] name
    * Example:
        * DIR ,_ = list the contents of the current remote directory to PRINT$
        * DIR DirY,MY*DIRY-FILE. = list the contents of remote directory DirY to local data file MY*DIRY-FILE
        * DIR DirX,MY*DIR-FILE.DIRX = list the contents of remote directory DirX
        * DIR , = do not list the contents of the current remote directory

* FTYPE: Sets the Program File element type to be sent to the Remote Host.
    * Syntax: FType {element-type}
    * Example: FType ABS
        * Allowed values are:
            * SYM - send a Symbolic (default)
            * REL - send a Relocatable
            * ABS - send an Absolute
            * OMN - send an Omnibus
            * FIL - send the entire Program File

* IDLE: Set the Server Timeout value in seconds - allowed values are 30 to 7200, inclusive.
    * Syntax: Idle {seconds}
    * Example: Idle 60

* L36: Set the transfer subtype to Local 36 and include all 36 bits of each word.
    * Syntax: L36
    * Example: L36

* MKDIR: Make a Directory.
    * Syntax: mkdir {directory}
    * Example: mkdir my-temp-dir

* PASV: Determines the use of the FTP PASV or PORT commands.
    * Syntax: PASV {on|off}
    * Example: pasv on
        * Allowed values are:
            * ON - use PASV and initiate the file transfer session from the FTP Client
            * OFF - use PORT and initiate the file transfer session from the FTP Server

* PCIOSFMT: Set the transfer subtype to PCIOS-Format and specify the file record size in words; allowed record sizes are zero through 2047.
    * Syntax: PCIOSFMT {record-size-in-words}
    * Example: pciosfmt 256

* PCNV: OS 2200 Print File conversion options - converts OS 2200 Print Files to be useable on other system types.
    * Syntax: PCNV N|P|Y
    * Example: pcnv p
        * Allowed values are:
            * N - do not perform any conversion (default)
            * P - perform partial conversion - removes perforation controls
            * Y - perform complete conversion - removes all print controls

* PROJECT: Sends the project identifier to the Remote Host - valid only when the Remote Host is a Unisys FTP Services host.
    * Syntax: Project {project-identifier}
    * Example: project appl56

* QUOTE: Send FTP commands to the server.
    * Syntax: Quote {FTP-command}
    * Example: quote site tasc
        * {FTP-command} is any FTP command and parameters to be sent

* RENAME: Rename a directory, file, or Program File element. When a Program File element is to be renamed, the element-type may also be specified.
    * Syntax: RENAME {old-name}, {new-name}[, element-type]
    * Example: rename PGM1, MYPGM1, ABS
        * Allowed element types are:
            * SYM - rename a Symbolic element (default)
            * REL - rename a Relocatable element
            * ABS - rename an Absolute element
            * OMN - rename an Omnibus element
            * FIL - rename the file
            * NON - no type - rename any type of element (only one element with {old-name} can exist)

* RMDIR: Remove a directory or a Program File (Program File must be empty).
    * Syntax: RMDIR {directory}
    * Example: rmdir DirX
        * rmdir MY*OLD-FILE.

* SDFFMT: Set transfer subtype to System Data Format (SDF) and specify the file record size in words; allowed record sizes are zero through 2047.
    * Syntax: SDFFMT {record-size-in-words}
    * Example: sdffmt 33

* STSP: Specify the removal of trailing spaces from OS 2200 files when sending to the Remote Host in ASCII mode.
    * Syntax: STSP {Y|N}
    * Example: stsp n
        * Allowed values are:
            * Y - remove trailing spaces (default)
            * N - do not remove trailing spaces

* TASCFMT: Set the transfer subtype to TCP Access Services Compatibility (TASC) Format and use all 36 bits of each word.
    * Syntax: TASCFMT
    * Example: tascfmt

* TENEX: When OS 2200 data is sent as Binary but the FTP Server's data type differs, set the transfer mode to Tenex instead of Binary.
    * Syntax: TENEX
    * Example: tenex

## Using the SMA File Transfer Protocol Interface

1. Identify the following information:

    a. Remote Host

    b. User name and password for the Remote Host

    c. File name on the Remote Host

    d. File name on the local OS 2200 Host

    e. Type of transfer: ASCII or Binary

    f. Direction of the transfer:

    * GET - retrieves remote file name from Remote Host and stores in local file name

    * PUT - sends local file name to remote file name on Remote Host

    g. FTP commands that are to be executed prior to the file transfer

    h. FTP commands that are to be executed after the file transfer

2. Define an OpCon OS 2200 Job with the following values:

    . Start Command Qualifier: the LSAM file qualifier - typically LSAM

    b. Start Command File: SKDPRG

    c. Start Command Element/Version: FTPAPI/ECL

    d. Specify other values as desired for Run Control

    e. Identify the desired Scheduling Frequency

    f. Provide any additional processing dependencies

    g. Provide any desired job documentation

3. Provide the FTP data (collected in step 1) on the Tokens tab of the OS 2200 Job:

    a. ??REMOTE-SYSTEM??=Remote Host

    b. ??USER??=user name^password, (Note: ^ represents the comma substitution character as defined in LSAMCFG/ECL)

    c. ??RFIL??=Remote File Name

    d. ??LFIL??=Local File Name

    e. ??TYPE??=transfer type

    f. ??DIR??=direction

    g. ??CMD1??=1st command before transfer

    h. ??CMD2??=2nd command before transfer

    i. ??CMD3??=3rd command before transfer

    j. -- continue with other commands to be processed before the transfer --

    k. ??ACMD1??=1st command after transfer

    l. ??ACMD2??=2nd command after transfer

    m. ??ACMD3??=3rd command after transfer

    n. -- continue with other commands to be processed after the transfer --

:::tip Example
 
```

??REMOTE-SYSTEM??=there,??USER??=anonymous^me@here,??RFILE??

=that\there\file.txt,??LFIL??=MY*FILE,??TYPE??=ASCII,??DIR??=get,??CMD1??=cd top,??

CMD2??=dir ^_,

```

This example will retrieve (get) the file (RFILE) "```that\there\file.txt```" from the Remote System

"there" in ASCII format (TYPE) using a sign-on (USER) of "anonymous,me@here" and store it on the local system in file (LFIL) "MY*FILE".

Before the file is transferred, the following commands are issued to the Remote System: "cd top" and "dir ,_".

:::

## SMA File Transfer Protocol Interface Alternate Run Streams

In order to facilitate use of the FTPAPI, alternate run streams may be established to meet local site processing requirements. These run streams may have some or all of the FTPAPI parameters hard-coded to satisfy requirements that exist for multiple file transfers. For example, multiple files may be transferred from the same computer system at different times; an alternate run stream may be set up using the system name, user credentials, and transfer direction, with only the file names required as tokens in the job definitions.

:::info Note 

Alternate run streams should be placed in a file different from the ```*SKDPRG``` file to prevent them from being overwritten during LSAM product upgrades.
 
:::

User credentials for transferring files may also be placed in a separate file (or program file element) to facilitate security and easy updating. To do this, replace the "```??USER??```" token contained in the FTPAPI run stream with "```FILE,{qualifier*file-name[,element-name]}```". Each time the run stream is executed, the user credentials will be taken from this location.

When a common set of commands is used for multiple file transfers, or when the commands exceed the token limits for job definitions, the commands may also be placed in a file (or program file element). To do this, replace the "??CMD1??" and/or the "```??ACMD1??```" tokens in the FTPAPI run stream with "```FILE,{qualifier*file-name[,element-name]}```". Each time the run stream is executed, the "before transfer" and/or the "after transfer" commands will be taken from this location.

The following examples assume the FTPAPI/ECL element has been copied from the``` LSAM*SKDPRG``` file and placed in elements in a separate program file (e.g., ```LSAM*FTP-JOBS```). This file name and the relative element name are used as the job start data in the job definition. Unused parameters have been removed from the examples, and unused parameters may be removed from production run streams.


:::tip Example 

Specify the system to transfer files from with the user credentials contained in a program file element named ```LSAM*FTP-JOBS.SYSTEMA/USER```. A set of commands to be used every time a file is transferred are contained in two program file elements named ```LSAM*FTP- JOBS.BEFORE/CMDS``` and ```LSAM*FTP-JOBS.AFTER/CMDS```. The TYPE of transfer (ASCII or binary), the Local File Name, the Remote File Name are supplied as Token values in the job definition.

``` 

@RUN SMAFTP

@ .

@ ASG,T ET$TMP.,///1024

@ SSG,L LSAM*SKDPRG.FTPAPI/SSG,,ET$TMP.FTPAPI/ECL

SGS

TIPF 0022 . LSAM TIP FILE NUMBER

OPCN ????????OPCON-JOBID???????? . JOB-NAME JOB-NUMBER

USER FILE,LSAM*FTP-JOBS,SYSTEMA/USER . USER INFO

REMH ''SYSTEMA'' . REMOTE SYSTEM

TYPE ''??TYPE??'' . TYPE: ASCII/BINARY

LFIL ''??LFIL??'' . LOCAL FILE NAME

RFIL ''??RFIL??'' . REMOTE FILE NAME

DIR GET . TRANSFER DIRECTION: GET/PUT

. FTP COMMANDS PROCESSED IN ORDER BEFORE THE FILE TRANSFER

CMD FILE,LSAM*FTP-JOBS.BEFORE/CMDS . FTP COMMANDS

. FTP COMMANDS PROCESSED IN ORDER AFTER FILE TRANSFER

ACMD FILE,LSAM*FTP-JOBS.AFTER/CMDS . FTP COMMANDS

@EOF

@EOF

@ FIN

``` 

The contents of ```LSAM*FTP-JOBS.BEFORE/CMDS``` are:

``` 

CMD cd files

CMD dir ,_

``` 

The contents of ```LSAM*FTP-JOBS.AFTER/CMDS``` are:

``` 

ACMD cdup

ACMD dir ,_

```

:::tip Example 

This example will transfer a specific file from a specific system with the user credentials contained in a program file element named ```LSAM*FTP-JOBS.SYSTEMA/USER```. 

The file is always transferred in ASCII format to a specific local file. 

A DIR command is executed before the file transfer occurs. There are no Token values supplied by the job definition.

``` 

@RUN SMAFTP

@ .

@ ASG,T ET$TMP.,///1024

@ SSG,L LSAM*SKDPRG.FTPAPI/SSG,,ET$TMP.FTPAPI/ECL

SGS

TIPF 0022 . LSAM TIP FILE NUMBER

OPCN ????????OPCON-JOBID???????? . JOB-NAME JOB-NUMBER

USER FILE,LSAM*FTP-JOBS,SYSTEMA/USER . USER INFO

REMH ''SYSTEMA'' . REMOTE SYSTEM

TYPE ''ASCII'' . TYPE: ASCII/BINARY

LFIL ''MY*FILE'' . LOCAL FILE NAME

RFIL ''that-file.txt'' . REMOTE FILE NAME

DIR GET . TRANSFER DIRECTION: GET/PUT

. FTP COMMANDS PROCESSED IN ORDER BEFORE THE FILE TRANSFER

CMD ''dir ,_ '' . FTP COMMANDS

@EOF

@EOF

@ FIN

```