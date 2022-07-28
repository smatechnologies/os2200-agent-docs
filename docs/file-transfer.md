# File Transfer

The Unisys OS 2200 LSAM supports SMA's File Transfer feature for both inbound and outbound file transfers. This feature consists of a File Transfer Server (FTServer) and a File Transfer Agent (FTAgent). The FTServer processes on the system of the source file (the file to be transferred), and sends file data to the FTAgent on the destination system. The FTAgent is initiated by OpCon/xps sending the LSAM on the file destination system a start command for a File Transfer Job. The LSAM then starts the job, which contacts the specified FTServer to initiate the transfer of the file data.

## OS 2200 Source Files

The Unisys OS 2200 FTServer (SMAJOR) reads and transmits System Data Format (SDF) files and Processor Common Input Output System (PCIOS) files containing either ASCII or Fieldata text. All file data is transferred as ASCII text to the destination system (Binary file transfers are not supported). All files are sent as variable length records with the maximum allowed record length of 8192 ASCII characters; longer records are truncated.

SMA File Transfer features not supported by the OS 2200 FTServer for source files are:

* Source Data Type of Binary
* Compression
* Encryption
* Resume of interrupted file transfers

Acceptable file names for Unisys OS 2200 source files (files transferred from the OS 2200) are formatted as:

```#Qual*Name(Fcyc)/Read```

* \# = indicates the file is defined in the Shared Master File Directory; when omitted, the Standard Master File Directory is searched for the file.
* Qual = the file's Qualifier.
* Name = the file's name.
* Fcyc = the file's fcycle number; may be absolute (i.e., 1, 2, 3, etc.) or relative (i.e., -1, -2, -3, etc.).
* Read = the file's read key, when required.

Files which may NOT be used as OS 2200 source files:

* Program files
* Temporary files
* Tape files
* PRINT$ files
* Files with any of the following status:
    * "Unloaded"
    * "To Be Cataloged"
    * "File is to be WRITE ONLY"
    * "To Be Dropped"
    * "File is WRITE ONLY"

The length of the destination file name is limited in the OS 2200 FTServer. This limitation may be evident when transferring files to operating systems that allow long path and file names. This limitation does not affect the transfer of the file; but messages written to log files, or displayed, will have the destination file name truncated.

## OS 2200 Destination Files

The Unisys OS 2200 FTAgent (SMAFTA) creates and writes System Data Format (SDF) files or Processor Common Input Output System files containing ASCII text (Binary file transfers are not supported). All files are cataloged as +1 file cycle, along with either default or specified attributes. The maximum record length written is 8188 ASCII characters for SDF files and 8192 ASCII characters for PCIOS files. Longer records are written as multiple records with lengths from 1 to 8188 or 8192 depending on file type.

SMA File Transfer features not supported by the OS 2200 File Transfer Agent for destination files are:

* Destination Data Type of Binary
* Compression Required
* Encryption Required
* File Handling of "Append" or "Backup and Append"
* Resume of interrupted file transfers

Acceptable file names for Unisys OS 2200 destination files (files transferred to the OS 2200) are formatted as:

```#Qual*Name/Read/Write.,device-specification;SMAFT-options```

* \# = indicates the file is to be cataloged in the Shared Master File Directory; when omitted, the file will be cataloged in the Standard Master File Directory.
* Qual = the file's Qualifier
* Name = the file's name
* Read = the read key to be assigned to the file, when required
* Write = the write key to be assigned to the file, when required
* Device-specification = the catalog specifications for specific device allocation in the form of:

    ```device-type/reserve/granule/maximum,pack-id```

When omitted, the default is:

    ```F///65535``` (catalog on Fixed storage with maximum allocation of 65,535 system default granules)

Acceptable examples include:

```F/1/TRK/100``` = catalog file on Fixed storage with reserve of 1 TRacK and maximum of 100 tracks

```F/100/POS/1024``` = catalog file on Fixed storage with reserve of 100 POSitions and maximum of 1024 positions.

```FMD,REMPAK``` = catalog file on REMPAK device with default allocation parameters.

```FMD///1024,REMPAK``` = catalog file on REMPAK device with maximum allocation of 1024 system default granules.

:::info Note 

File fcycle is NOT allowed; the file is always created +1. Be careful about defining new file characteristics which may conflict with existing file characteristics.

:::

* SMAFT-options = file creation and processing options for the destination file on the OS 2200; these options must be separated from the device-specification by a semi-colon (;). Allowed options are:
    * PCIOS – to format the destination file as a PCIOS file allowing record lengths up to 8192 characters. The absence of the PCIOS keyword formats the destination file as SDF with a maximum record length of 8188 characters.

:::tip Example

```MYQUAL*MY-SDF.,F///1024```

Creates a SDF file with a maximum of 1024 tracks; the maximum record length for this file is 8188 characters.

```MYQUAL*MY-PCIOS.,F///10240;PCIOS```

Creates a PCIOS file with a maximum of 10240 tracks; the maximum record length for this file is 8192 characters.

:::

The length of the source file name is limited in the OS 2200 FTAgent. This limitation may be evident when transferring files from operating systems that allow long path and file names. This limitation affects the transfer of the file by:

1. The FTAgent job will error terminate with an indication the source file does not exist for the truncated file name; - or -
2. The truncated file name is a valid file name on the source system, and results in the wrong file being transferred.

To avoid this situation, the following restrictions must be considered when defining the File Transfer job:

* The maximum length for the combined Source User ID, Source File Name, and Destination File Name is 105 characters.
* The absolute maximum length allowed for each of the data items is:
    * Source User ID : 44 characters (for source machines requiring user ID)
    * Source File Name: 96 characters
    * Destination File Name: 66 characters

A valid combination of Source File, Source User, and Destination File consists of both:

1. The length of each data item is within the maximum allowed for that item and
2. The total length of all three items must not exceed the allowed maximum of 105 characters.

:::tip Example:::

Transfer file from a Microsoft Windows system to OS 2200:

Source File: ```c:\dir1\subdir1\file.txt``` (24 characters)

Source User: ```Use Service Account|```     (20 characters)

Destination File: ```qual*file.```          (10 characters)

*Total of 54 characters*

:::

:::tip Example:::

Transfer file from a UNIX system to OS 2200:

Source File: ```/application/reports/monthly/aging.rpt```                   (38 characters)

Source User: ```0/0```                                                      (3 characters)

Destination File: q```ualifier*filename/read/write.,fmd///10240,rempak```  (49 characters)

*Total of 90 characters*

:::

:::tip Example:::

Transfer file from an OS 2200 to OS 2200:

Source File: ```#my-qualifier*my-file-name/readky.```                                   (34 characters)

Source User: ```not used```                                                              (0 characters)

Destination File: ```my-qualifier*my-file-name/readky/writek.,fmd/10/pos/1024,rempak``` (63 characters)

*Total of 97 characters*

:::

## The File Transfer Runstream

The OS 2200 FTAgent program is executed from the runstream located in \*SKDPRG.SMAFTA/ECL. As released, this runstream produces a breakpoint file containing the PRINT$ images. The name of the breakpoint file is ```[LSAMqualifier]*BK[generated-run-id]```. The runstream also deletes current parts of PRINT$ files, resulting in no residual run-id files; unless multiple SMAFT runs are processing concurrently, there should not be any run-id duplication. The SMAFTA log file will most often be found in a cycle of the ```[LSAMqualifier]*BKSMAFT``` file.

There may be times when it is necessary to generate PRINT$ output. To do this, modify the runstream to "deactivate" the BRKPT parameter, as follows:

1. ```@QUAL [LSAMqualifier]```
2. ```@ED,U *SKDPRG.SMAFTA/ECL```
3. ```F BRKPT```
4. The ```"BRKPT . TO BRKPT PRINT$" ```line is displayed
5. ```C // . <==/```
6. The ```". <==BRKPT . TO BRKPT PRINT$"``` line is displayed
7. ```EXIT```

The next File Transfer job to start will not breakpoint PRINT$ and will sym a single PRINT$ to the default print queue (typically PR). 

To activate the BRKPT parameter, perform the following:

8. ```@QUAL [LSAMqualifier]```
9. ```@ED,U *SKDPRG.SMAFTA/ECL```
10. ```LOC =BRKPT```
11. The ```". <==BRKPT . TO BRKPT PRINT$"``` line is displayed
12. ```C /. <==//```
13. The ```"BRKPT . TO BRKPT PRINT$"``` line is displayed
14. ```EXIT```

The next File Transfer job to start will breakpoint PRINT$ to *BKgenerated-run-id(+1) and will delete the PRINT$ file(s).

Considerations concerning PRINT$ versus Breakpoint files:

15. ```PRINT$ ```files can cause run-id duplication.
16. ```PRINT$``` files are the only log of the run; once it is deleted, the log is deleted.
17. ```PRINT$``` files may be printed unnecessarily.
18. ```PRINT$``` files are easy for OpCon/xps users to view with the View Job Output capability (however, when a FT job aborts, the ```PRINT$``` will contain a program dump ```[@PMD]``` which can make the file rather large [60 pages or more]).
19. Breakpoint files are cycled, providing up to 32 run logs of history per generated run-id.
20. When using Breakpoint files, the generated run-id will often be the same as the original run-id, meaning the breakpoint file will be ```*BKSMAFT``` most often. When the run-id duplicates, the file will be ```*BKSMAFTA```, ```*BKSMAFTB```, etc., for example.
21. Breakpoint files are not viewable from OpCon/xps unless the file is ```@SYMmed``` to a print queue (as released, the runstream does not sym the breakpoint file).
22. Breakpoint files are easier to transfer electronically than ```PRINT$``` files (although ```PRINT$``` files may be saved after using the OpCon/xps View Job Output capability).