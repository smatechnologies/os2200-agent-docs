# Configuration Settings (Page 1)

The LSAMCFG/ECL program displays page one of the configurations.

## Settings Page One
 
### Line 1 - RSI Userid*

**Default** 

None

**Valid Values**

Any Valid RSI user-id with the specified attributes

**Description**

* Select this option to change either the LSAM RSI User ID, and/or the password.
* Whenever the RSI User ID is changed, the password must also be entered.
* The RSI User ID is used by the LSAM to submit and track jobs.

:::info Note

The RSI password is not displayed and is encrypted when stored in the configuration file.

:::

### Line 2 - Default Userid for ST keyin

**Default**

None

**Description**

* Select this option to change the User ID that the LSAM can use to ST a job when the Account and User ID is not available for a job to be started.
* When the LSAM @STARTs a job, the Batch User ID and Account used for the LSAM is inherited.
* When a User ID and Account are entered into a job's OpCon/xps data, that account and User ID are used on the @@CONS ST command when starting the job.

### Line 3 - Default Account for ST keyin

**Default**

None

**Description**

* Select this option to change the Account that the LSAM can use to ST a job when the Account and User ID is not available for a job to be started.
* When the LSAM @STARTs a job, the Batch User ID and Account used for the LSAM is inherited.
* When a User ID and Account are entered into a job's OpCon/xps data, that account and User ID are used on the @@CONS ST command when starting the job.


### Line 4 - TSU Process Name & Password*

**Default**

None

**Description**

* Select this option to enter the process name and password for the LSAM to use when connecting to the communications process in either CMS-1100 or CpComm.

:::info Note 

The TSU process password is not displayed and is encrypted when stored in the configuration file.

:::

### Line 5 - LSAM System Qualifier*

**Default**

LSAM

**Description**

The file qualifier of the SKDPRG file.

### Line 6 - Host Machine Name

**Default**

None

**Valid Values**

Any valid hostname

**Description**

* Select this option to define the batch job machine.
* Enter the name that matches the host name in OpCon/xps and that is in the machine's HOST file.
* The name is case-sensitive.

### Line 7 - Host Machine Max Jobs

**Default**

10

**Valid Values**

1 – 500

**Description**

Select this option to define the maximum number of jobs the LSAM is allowed to process concurrently.

### Line 8 - Console keyin to use for LSAM and for XFRTCP*

**Default**

*LSAM ,CONSOLE ONLY

And

*XFRTCP ,CONSOLE ONLY

**Description**

* Select this option to enter the keyword to use for entering console commands for the LSAM.
* The installation default is "*LSAM", but may be changed to any unique keyword up to eight characters in length.

:::info Note

Unisys recommends such keywords should start with an asterisk (*) to avoid conflicts with keywords utilized by Unisys software.

:::

* After entering the keyword, the administrator must also select an @@CONS capability required for users to access the keyword. For additional information on configuring console keyin, refer to Configure Console Keyin.

### Line 9 - Port Number*

**Default**

03100

**Valid Values**

1025 – 65535

**Description**

* Select this option to define the TCP/IP port number used for communication between the LSAM and SMANetCom.

### Line 10 - Job Start Failures

**Default**

Job Init Error

**Valid Values**

Job Init Error (E)
Prerun Failure (P)

**Description**

* Select this option to set how jobs failing to start are reported to the OpCon/xps server.
* Job Init Errors are identified as job initialization failures and do not restart automatically.
* Prerun Failures attempts to automatically restart the job after a configured time period.

### Line 11 - ECL Location Display

**Default**

No

**Valid Values**

Yes (Y)
No (N)

**Description**

* Select this option to enable/disable the LSAM to display the ECL location on the system console when a job error terminates.
    * If "Yes", the LSAM displays the job's ECL location.
    * If "No", the LSAM does not display the ECL location.

### Line 12 - Advanced Options

**Default**

N/A

**Valid Values**

N/A

**Description**

* Select this option to display page two for LSAM configuration.

### Line 13 - Configure Media Allocation SubSystem (MASS)

**Default**

N/A

**Valid Values**

N/A

**Description**

* Select this option to configure the Media Allocation Subsystem parameters.
* The Media Allocation SubSystem is available only to sites licensed for its use; refer to the OS 2200 Media Allocation SubSystem documentation for configuration details.

### Line 14 - Modify ECL executed at End-Of-Job

**Default**

N/A

**Valid Values**

N/A

**Description** 

* Select this option to define ECL lines to be inserted automatically at the end of job runstreams.

### Line 15 - Allow IPv6 network addresses

**Default**

No

**Valid Values**

No (N)
Yes (Y)

**Description** 

* Select this option to allow the use if IPv6 for network connections.

### Line 16 - Use Network Security (TLS)

**Default**

No

**Valid Values**

No (N)
Yes (Y)


**Description** 

* Select this option to use TLS for network connections.  This can also e controlled through CPCOMM. 


:::info Note

(*) Asterisk denotes -  Requires LSAM, LMAM, XFRTCP, and/or SMAJOR to be restarted to activate the updated parameter; otherwise all parameters are effective without restarting.

:::

## Configure Console Keyin

Item eight on page one of the configuration contains the console keyins for the LSAM and for XFRTCP (refer to [OS 2200 LSAM and BIS LMAM Configuration](configuration-settings).

1. For the Enter new console KEYIN for this LSAM (max 8 chars) prompt, enter the desired keyword for the LSAM.

    * (Optional) Change the installation default "*LSAM" to any unique keyword up to eight characters in length.

2. The following prompt is presented:

```

Enter user CONS level required for keyin:

Console Only = 0
BASIC = 1
LIMITED = 2
FULL = 3
DISPLAY = 4
RESPONSE = 5

```

3. Enter the number corresponding to the @@CONS capability of users allowed to use the reserved keyword to issue commands to the LSAM.


:::tip Example 

Enter **0** (zero) to allow commands to be entered from the system console only.

- or -

Enter **1** (one) to allow all users with the @@ CONS BASIC or greater capability to enter LSAM commands (all users with any @@CONS caopability).

- or -

Enter **4** (four) to allow only those users with DISPLAY or RESPONSE @@CONS capabilities to issue commands to the LSAM.

:::

4. At the Enter new console KEYIN for this XFRTCP (max 8 chars) prompt, enter the keyword to use for entering console commands for XFRTCP. The installation default is "*XFRTCP", but may be changed to any unique keyword up to eight characters in length.

5. Upon entering the desired keyword for XFRTCP, the following prompt is presented:
Enter user CONS level required for keyin:

```
Console Only = 0
BASIC = 1
LIMITED = 2
FULL = 3
DISPLAY = 4
RESPONSE = 5

```

6. Enter the number corresponding to the @@CONS capability of users allowed to use the reserved keyword to issue commands to XFRTCP.

:::tip Example

Enter **0** (zero) to allow commands to be entered from the system console only.

- or -

Enter **1** (one) to allow all users with the @@ CONS BASIC or greater capability to enter XFRTCP commands (all users with any @@ CONS capability).

- or -

Enter **4** (four) to allow only those users with DISPLAY or RESPONSE @@CONS capabilities to issue commands to XFRTCP.

:::