# Configuration - Introduction

## LSAM and LMAM Configuration

The LSAM configuration file contains information needed to set the correct options for the LSAM's communication with SMANetCom and to activate optional features. After installation of the LSAM, the configuration file *must* be reviewed before the LSAM is started.

The following settings are *critical* to the operation of the LSAM with OpCon/xps:

* RSI UserID: This value provides the user-ID and password for the LSAM to establish a DEMAND session. The absence of a valid user-ID/password diminishes the LSAM's job starting and monitoring capabilities.
* Default UserID for ST keyin: This value provides a default user-ID used by the LSAM when issuing a console ST command for jobs that do not have user-IDs.
* Default Account for ST keyin: This value provides a default account used by the LSAM when issuing a console ST command for jobs that do not have an account. The Default User-Id must be valid for the Default Account.
* TSU Process Name and Password: These parameters provide the needed information to establish network communications through either CMS-1100 or CpComm. Invalid or missing Process name or password causes the LSAM and associated programs to terminate.
* Host Machine Name: This value defines the batch job machine and must match the Host Name on the Machines screen of the Enterprise Manager.
* Host Machine Max Jobs: This value determines the maximum number of jobs the LSAM is allowed to process concurrently.
* Port Number: This value defines the port for communication between the LSAM and the SMANetCom. Refer to [Managing Machines](https://help.smatechnologies.com/opcon/core/Files/UI/Enterprise-Manager/Managing-Machines) in the Enterprise Manager online help for information regarding the Machines screen.

### Run the Configuration Program

1. Set the LSAM file qualifier: ```@QUAL [LSAM-qualifier]```
2. Start the configuration procedure. From a DEMAND session, enter:
```@ADD *SKDPRG.LSAMCFG/ECL```
3. At the prompt, enter the line number for the configuration value to change. Refer to the [Configuration Settings](configuration-settings) tables for help with setting the values.
4. Transmit the screen.
5. Enter the new value for the selected item.
6. Transmit the screen.
7. Repeat steps 1 – 6 as necessary to set all values for the local configuration.
8. After all the desired updates have been entered, transmit a blank entry.
9. A prompt of UPDATE OR CANCEL (UPD TO UPDATE, XMIT TO CANCEL) is presented. Enter UPD and transmit to save the changes. Transmitting a blank entry does *not* save the changes in the configuration file.