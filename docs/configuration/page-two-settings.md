# Configuration Settings (Page 2)

Selecting option 12 on page one of the configuration screen displays page two.

## Settings Page Two

### Line 1 - Display start command used

**Default**

N

**Valid Values**

* Y
* N

**Description**

* Select this option to enable/disable the LSAM to display each start command (ST or @START) issued upon the console.
* Enabling this option can assist in job-start problem resolution.
    * If Y, the LSAM displays start commands.
    * If N, the LSAM does not display start commands.

### Line 2 -Utilize CONS commands

**Default**

Y

**Valid Values**

* Y
* N 

**Description**

* Select this option to grant permission to use @@CONS ST commands for starting jobs.
    * If Y, ST commands are issued.
    * If N, @START commands are issued.

:::info Note

Console RC commands are used to check the status of started jobs regardless of the command used to start the job.

:::

### Line 3 - Auto answer for security

**Default**

N

**Valid Values**

* Y
* N

**Description**

* Select this option to enable/disable the LSAM to look for and respond to the console "Enter clearance level" messages for started jobs.
    * If Y, the option is enabled and the LSAM always responds to the message with a space.
    * If N, the option is disabled.

:::info Note

It is recommended this option be enabled to allow the LSAM to detect and respond to read-and-reply console messages.

::: 

* When this option is disabled, the LSAM's RSI Console Mode should be set to DISPLAY to prevent failures of detecting some errors during the starting of a job.

### Line 4 - Seconds before using @@CONS RC

**Default**

020

**Valid Values**

10 - 900

**Description**

* Select this option to define the number of seconds to wait between checking on active jobs with the @@CONS RC command.

### Line 5 - CONSOLE Message display level

**Default**

0

**Valid Values**

0 - 3

**Description**

* 0 = Standard Console Messages
* 1 = Display job's ECL Location
* 2 = Display job FIN messages
* 3 = Display both job's ECL Location and FIN messages

:::info Note

Refer to CONSOLE Message Display Level below for the message formats displayed.

:::

### Line 6 - Use current EXEC response position

**Default**

Y

**Valid Values**

* Y
* N

**Description**

* This Program Option (POP) should always be "Y".

:::caution 

Setting this to any other value may cause the LSAM to not recognize current level Exec responses.

:::

### Line 7 - Use Opcon Job Number for Start File

**Default**

No

**Valid Values**

No (N)
Yes (Y)

**Description**

* By default, the agent names temporary ECL files with the OpCon Job-ID (job name).
* Set this option to "Y" to use the OpCon Job Number to name the temporary ECL files.  This allows more that 32 concurrent jobs with the same Job-ID.  

### Line 8 - Comma Substitution Character

**Default**

```<Space>```

**Valid Values**

Any printable character excluding comma and space

**Description**

* This character will be replaced with a comma whenever it is detected in a token's value.
* This substitution will occur on all jobs started after the configuration parameters are updated.
* Use a space to deactivate the comma substitution feature.

### Line 9 - Use Monitor Services Connector (SMAMSC)

**Default**

N

**Valid Values**

* Y
* N

**Description**

* Set this configuration parameter to Y when the SMA Monitor Services Connector is to be used.

### Line 10 - Read key for SKDPRG


**Default**

None

**Description** 

* Select this option when the LSAM's SKDPRG file has been assigned a read key. Enter the read key here for the LSAM's use.

### Line 11 - European date format

**Default**

N

**Valid Values**

* Y
* N

**Description**

* Select this option to set a European date format of ddmmyy for use by the LSAM.
    * If Y, the LSAM uses a European date format.
    * If N, the LSAM uses the standard U.S. mmddyy date format.

### Line 12 - Debug Mode

**Default**

0

**Valid Values**

* 0
* 1
* 2
* 3

**Description**

* Select this option to set the amount of debug information.
* When debugging is activated, the files *BKLSAM, *BKXFRTCP, and *BKSMAJOR contain additional debug information.
* The following values indicate the debug information level.
    * 0=OFF
    * 1=Verbose Logging 
    * 2=Program Trace   
    * 3=Verbose Logging with Program Trace.

:::info Note

Debug mode should be set to non-zero at the direction of SMA support.

:::

:::warning

The use of Debug Mode options may disclose sensitive data in the SMAJOR and SMAFT log files. These log files contain data from files processed. When files processed contain sensitive data, SMA recommends using Option 18 to define Authorized Users for authorized updates to the configuration.

:::

### Line 13 - Calculate OpCon/xps check sums

**Default**

Y

**Valid Values**

* Y
* N

**Description**

* Select this option to activate/deactivate checksums that validate the messages between the SAM and the LSAM.
* Set this option to N when checksums are not appropriate for your environment, such as using a double-byte character set.
    * If Y, checksums are calculated for messages between the SAM and the LSAM.
    * If N, checksums are not calculated for messages between the SAM and the LSAM.

:::info Note

This setting must match the setting of the OpCon Enterprise Manager Administration data for this machine.

:::

### Line 14 - Alternate Qualifier for LSAM Tracking Files

**Default**

None

**Description**

* Select this option to set the file Qualifier for each job's ECL / tracking file. It is recommended this parameter be set to a unique file qualifier to avoid conflicts with local application file naming conventions.

### Line 15 - Configure Mapper Machine*

**Default**

N/A

**Valid Values**

N/A

**Description**

* Select this option to define the BIS machine name and to define LMAM and BIS MAM parameters (refer to Configure BIS).

### Line 16 - Authorized IP Address List

**Default**

255.255.255.255 (Any IP Address)

**Valid Values**

Any valid IP address

**Description**

* Define a list of up to 10 IP addresses to identify the IP addresses of OpCon/xps servers authorized to communicate with this LSAM.
* The IP address 255.255.255.255 authorizes all IP addresses to communicate with the LSAM.
* The IP address 0.0.0.0 removes an existing address from the list; the LSAM does not use IP address 0.0.0.0 to validate authorized addresses.


### Line 17 - Configure Job Output Retrieval System

**Default**

None

**Valid Values**

Refer to [Configure Job Output Retrieval System (JORS)(configure-jors)].

**Description**

* Set the configuration parameters for Job Output Retrieval and File Transfer capabilities.
* Refer to below to determine how to set these parameters.

### Line 18 - Define Authorized Users

**Default**

Any User

**Valid Values**

Any valid Unisys OS 2200 DEMAND User-ID

**Description**

* Define the list to identify the Unisys Exec DEMAND user-ids authorized to use LSAMCFG/ECL to view and modify configuration parameters.
* Refer to A[uthorized Users(authorized-users)] for more details.

### Line 19 - Maximum inactivity time in minutes

**Default**

30

**Valid Values**

0 - 30

**Description**

* The number of minutes allowed for inactivity before reporting and aborting the inactive program.
* Using zero (0) disables the inactive program abort, but notification of inactivity will occur via a system console message about every 5 minutes. When the program abort is disabled, the recommended method for terminating an inactive program is with the console "E run-id" keyin.
 

:::info Note

Asterisk (*) denotes - Requires LSAM, LMAM, XFRTCP, and/or SMAJOR to be restarted to activate the updated parameter; otherwise all parameters are effective without restarting.

:::
