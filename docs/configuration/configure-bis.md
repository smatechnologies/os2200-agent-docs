# Configure BIS

## BIS Configuration

Item 15 on page two of the configuration contains the BIS configuration settings.

1. Select option 15 for the Configure BIS Machine option.

Upon selecting the BIS configuration settings option, the following prompt displays:

```

Current LMAM console KEYIN is *LMAM

Do you wish to change this KEYIN? (Y/<N>)

```

The displayed KEYIN is the reserved keyword for console commands to LMAM.

a. Responding "Y" (Yes) to the question presents the following prompt:

```

Enter new console KEYIN for this LMAM (max 8 chars)

```

Enter the keyword to use for entering console commands for the LMAM. The installation default is "*LMAM", but may be changed to any unique keyword up to 8 characters in length.

:::info Note

Unisys recommends such keywords should start with an asterisk (*) to avoid conflicts with keywords utilized by Unisys software.

:::

b. Upon entering the desired keyword, the following prompt is presented:

```

Current LMAM CONS level required for keyin is (CONSOLE ONLY)

Do you wish to change this required level? (Y/<N>)

```

When you wish to change the @@CONS level required of users to issue keyins to LMAM, respond with "Y" (Yes). The following prompt is displayed:

```

Enter user CONS level required for keyin:

Console Only = 0
BASIC = 1
LIMITED = 2
FULL = 3
DISPLAY = 4
RESPONSE = 5

```

Respond with the number corresponding to the @@CONS capability of users allowed to use the reserved keyword to issue commands to LMAM.

2. After responding to the console keyin prompt(s), the BIS machine name information is presented. This must be a different name than was used for the Batch job machine. For example, if the Batch job machine name is "U2200", use "U2200M" for the BIS machine. The following is displayed:

```

BIS machine name = U2200M

MAM sites currently defined:

1 = MAM ,SMA 0027 MPERR = 00000


Enter the MAM Site to configure

or enter 0 to change the BIS machine name

or NEW to add a new MAM configuration

or INI to initialize the MAM configuration

or hit transmit to return

```

## Add a MAM

1. Enter NEW.
2. At the Enter MAM site id (single character) prompt, enter a unique MAM ID. The MAM ID is the MAM Site ID selected during the installation for this MAM.
3. At the Enter MAM UserID < > prompt, enter the MAM User-ID (BIS USER-ID defined for this MAM) that was created in the Pre-Installation setup.
4. At the Enter MAM PassWd < > prompt, enter the password defined for MAM's User-ID.
5. At the Enter MAM Dept CD <0000> prompt, enter the Department code where this MAM is installed.
6. At the Enter MAM BP Name < > prompt, enter the Batchport Name that was identified for this MAM in the Pre-Installation setup.
7. At the Enter this BIS's Qualifier < >, enter the qualifier that the BIS is in.
8. (Optional) At the MAM Error RID <00000> prompt, enter the BIS Station Number which may be used to display MAM messages during processing.

:::info Note

The BIS Station Number is required only when MAM debug mode is active.

:::

## Addresses

Item 16 on page two of the configuration contains a list of up to 10 IP addresses. These addresses identify OpCon/xps servers that the LSAM is authorized to communicate with. The LSAM ignores messages received from an unauthorized OpCon/xps server. Setting any IP address parameter to 255.255.255.255 authorizes all OpCon/xps servers. Setting an IP address parameter to 0.0.0.0 removes that IP address from the list.

All IP addresses must conform to valid IP address rules:

* Each must consist of 4 octets, separated by a period (.), i.e., 1.2.3.4
* An octet value requires only the significant digits, leading zeros are not required, i.e., 10.20.30.40 is equivalent to 010.020.030.040
* Each octet must have a value greater than zero and less than 255, i.e., 200.100.50.10 is valid; 255.0.300.200 is not valid
