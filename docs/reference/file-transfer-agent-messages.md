# File Transfer Agent Messages

### 1 (01) First card image not Tip File parameters	

**Description**

* The SMAFTA/ECL does not contain the TIPFILE statement after the @XQT SMAFTA statement.
* Indicates a corrupted SMAFTA/ECL element.

### 2 (02) Missing OpCon/xps Job-ID parameter

**Description**

* The OpCon/xps Job Name parameter is missing.
* Indicates a corrupted SMAFTA/ECL element.

### 3 (03) Missing Source Machine parameter

**Description**

* The identification of the machine to transfer the file from is missing.
* Indicates a corrupted SMAFTA/ECL element.

### 4 (04) Missing Source socket parameter

**Description**

* The communications socket parameter for the source machine is missing.
* Indicates a corrupted SMAFTA/ECL element.

### 5 (05) Missing Source file name parameter

**Description**

* The name of the source file is missing.
* Indicates a corrupted SMAFTA/ECL element.

### 6 (06) Missing Destination file name parameter

**Description**

* The name of the destination file is missing.
* Indicates a corrupted SMAFTA/ECL element.

### 7 (07) Invalid transfer mode (must be ASCII)

**Description**

* The file character set for the job is not supported.
* The character set must be either "ASCII" or "Default Text".

### 8 (10) Invalid Compression mode (must be NONE)

**Description**

Compression Required has been specified for the file transfer job. Compression is not supported.

### 9 (11) Invalid Encryption mode (must be NONE)

**Description**

Encryption Required has been specified for the file transfer job. Encryption is not supported.

### 10 (12) Invalid Overwrite parameter (cannot be APPEND)	

**Description**

Destination File Handling has been identified as either "Append" or "Backup and Append". The OS 2200 FTAgent does not support file appends.

### 13 (15) Common Bank slot not available

**Description**

The number of File Transfer jobs is greater than twelve (12), OR the Common Bank has become corrupted (possibly from many FTAgent job aborts). To correct, stop and restart XFRTCP and SMAJOR runs.

### 14 (16) FPRC Request (020) message received in error

**Description**

A communications error between a FTServer and FTAgent has occurred. Report this condition to SMA Support.

### 15 (17) SEND Request (022) message received in error

**Description**

A communications error between a FTServer and FTAgent has occurred. Report this condition to SMA Support.

### 16 (20) TIP read error: XFR READ FAILURE

**Description**

An error occurred while attempting to read the XFER Status record from the TIP file. Most likely the TIP file is corrupted; use the XFRINI/ECL and LPARMRES/ECL procedures to re-initialize the file. This situation should be reported to SMA Support.

### 17 (21) TIP read error: INIT and Parameters failure

**Description**

An error occurred while attempting to initialize the TIP interface and read the LSAM Parameters record from the TIP file. Most likely the TIP file is corrupted; use the XFRINI/ECL and LPARMRES/ECL procedures to re-initialize the file. This situation should be reported to SMA Support.

### 18 (22) COMM Failure: OPEN connection failed

**Description**

The attempt to open a connection to the FTServer failed. The job's log file contains detailed error information.

### 19 (23) Invalid CAPABILITIES message

**Description**

The FTAgent has received an invalid message from the FTServer. This situation should be reported to SMA Support.

### 20 (24) Required CAPABILITY not present: ASCII

**Description**

The FTServer does not have the required capability of transferring the file in ASCII format. This situation should be reported to SMA Support.

### 21 (25) Destination File Name invalid	

**Description**

The name provided for the destination file does not meet the FTAgent requirements. Review the OS 2200 Destination Files section for acceptable file names.

### 22 (26) FACILITIES STATUS error (@FAC)

**Description**

A Facilities Error occurred while attempting to manage the destination file. The job's log file will contain detailed error information.

### 23 (27) Open OUTPUT file failed

**Description**

An error occurred when the FTAgent attempted to open the destination file. The job's log file will contain detailed error information.

### 24 (30) Received error from server

**Description**

The FTAgent received an error message from the FTServer; the received message is included. Review the FTServer documentation for more information pertaining to the message.

### 25 (31) File WRITE error (SDFIO)

**Description**

The FTAgent encountered an error when attempting to write data to the destination file. The job's log will contain detailed error information.

### 26 (32) Job Record not found in TIP file

**Description**

The necessary job data could not be found in the TIP file. This may be the result of a corrupted file, or a combination of multiple occurrences of the job processing simultaneously. This situation should be reported to SMA Support.

### 27 (33) COMM Failure: Connection Rejected

**Description**

The FTServer rejected the FTAgent's attempt to open a communications session.

### 28 (34) COMM Failure: Connection Aborted

**Description**

The communications connection between the FTServer and FTAgent aborted.

### 29 (35) COMM Failure: Connection Closed before EOF

**Description**

The communications connection between the FTServer and FTAgent was closed before the end-of-file was received. This situation should be reported to SMA Support.

### 30 (36) FIXED Length records w/zero RecordLength	

**Description**

The FTServer has identified the source file as containing FIXED length records, but has reported a zero record length. This situation should be reported to SMA Support.

### 31 (37) Required RECORD parameters not present

**Description**

The FTServer has failed to provide file parameters required to create the output file. This situation should be reported to SMA Support.

### 32 (40) Unsupported File Format (not FIXED or VARIABLE)

**Description**

The format of the source file is not supported by the OS 2200 FTAgent.

### 33 (41)Preferred Compression FAILED

**Description**

The File Transfer job is defined with "Compression Preferred" and "Fail if Preferred not met". The file has been transferred successfully.

### 34 (42) Preferred Encryption FAILED

**Description**

The File Transfer job is defined with "Encryption Preferred" and "Fail if Preferred not met". The file has been transferred successfully.

### 35 (43) Invalid Destination File key(s)

**Description**

The Read and/or Write keys provided for the destination file are invalid.

### 36 (44) File Transfer Server not responding

**Description**

The FTServer is no longer communicating with the FTAgent.

### 37 (45) Invalid Packet Number received on Resend

**Description**

An out-of-sequence data message has been received by the FTAgent. This situation should be reported to SMA Support.