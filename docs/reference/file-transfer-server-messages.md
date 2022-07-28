# File Transfer Server Messages

OS 2200 File Transfer Messages sent to File Transfer Agents may be displayed in OpCon Enterprise Manager Operation.

### SECURITY VIOLATION	

**Description**

An attempt has been made to violate the security settings of the File Transfer configuration. Most often this results from disallowing File Transfers, and an attempt to perform a transfer was initiated.

### File Name Missing

**Description**

The name of the source file was not provided by the FTAgent. This situation should be reported to SMA Support.

### Unsupported SOURCE Data Type

**Description**

The selected Data Type for the source file is not supported. The Data Type must be ASCII or Default Text.

### Unsupported file type: file name

**Description**

The source file type is not supported. Refer to the OS 2200 Source Files section to review the unsupported types.

### File does NOT exist: file name

**Description**

The requested source file does not exist on the source system.

### file name returned MFD error error text

**Description**

The inquiry to the Master File Directory (MFD) for the source file details resulted in the error text error.

### File Unloaded

**Description**

The requested source file is in an unloaded status. Unloaded files are not supported.

### File to be Cataloged

**Description**

The requested source file is in a "to be cataloged" status. "To be" files are not supported.

### File is a Tape File

**Description**

The requested source file is a tape file. Tape files are not supported.

### File is to be WRITE ONLY

**Description**

The requested source file is in a "to be write only" status. "To be" files are not supported.

### File is to be Dropped

**Description**

The requested source file is in a "to be dropped" status. "To be" files are not supported.

### File is WRITE ONLY

**Description**

The requested source file is "write only" and cannot be read for the transfer.

### Encryption not supported	

**Description**

The FTAgent has requested an encrypted file transfer; file encryption is not supported.

### Compression not supported

**Description**

The FTAgent has requested a compressed file transfer; file compression is not supported.

### ASCII Transfer ONLY supported

**Description**

The FTAgent has requested a transfer character set other than ASCII.

### FILE ASSIGNMENT FAILED

**Description**

The attempt to assign the source file failed. The SMAJOR log file will contain specific error information.

### file-name requires READ key

**Description**

The source file requires a READ key to be accessed.

### file-name File not found (SDFI CST:xx)

**Description**

An attempt to open the file for reading failed due to a file assignment error; the xx CST number provides the error identifier. The SMAJOR log file will contain specific error information.

### File Open Error xx: error message text

**Description**

An attempt to open the file for reading failed. The xx contains the error identifier; the error message text contains a brief description of the error. The SMAJOR log file will contain additional error information.

### FILE READ ERROR (CST: xx, CSST: xx ) error message text

**Description**

An error occurred while reading the source file. The CST and CSST contain error identifiers; error message text contains a brief description of the error. The SMAJOR log file will contain additional error information.

### 1-POINTER AT END OF STRING

### 2-START DELIMITER NOT FOUND

### 3-RETURNED STRING TRUNCATED

### 4-END DELIMITER NOT FOUND

### Invalid Request: Not ```<DATA>```

### Invalid Request: request data

**Description**

These messages are the result of internal processing discrepancies between the FTServer and FTAgent. These should be reported to SMA Support.