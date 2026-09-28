---
sidebar_label: 'Configure BIS'
title: Configure BIS
description: "Configure BIS/MAM settings in the OS 2200 LSAM: LMAM console keyin, MAM site definitions, and authorized IP addresses."
tags:
  - Procedural
  - System Administrator
  - Agents
---

# Configure BIS

## BIS Configuration

Item 15 on page two of the configuration contains the BIS configuration settings.

1. Select option 15, **Configure Mapper Machine**.

Upon selecting the BIS configuration settings option, the following prompt displays:

```

Current LMAM console KEYIN is *LMAM

Do you wish to change this KEYIN? (Y/<N>)

```

The displayed KEYIN is the reserved keyword for console commands to LMAM.

- If you enter **Y**, you will be prompted to enter a new KEYIN:

  ```Enter new console KEYIN for this LMAM (max 8 chars)```

  Enter the keyword for LMAM console commands. The default is `*LMAM`, but it may be changed to any unique keyword up to 8 characters.

  :::info Note

  Unisys recommends keywords start with an asterisk (`*`) to avoid conflicts with Unisys software keywords.

  :::

- After entering the keyword, the following prompt is presented:

  ```

  Current LMAM CONS level required for keyin is (CONSOLE ONLY)

  Do you wish to change this required level? (Y/<N>)

  ```

  If you enter **Y**, select the @@CONS level required of users to issue keyins to LMAM:

  ```

  Enter user CONS level required for keyin:

  Console Only = 0
  BASIC = 1
  LIMITED = 2
  FULL = 3
  DISPLAY = 4
  RESPONSE = 5

  ```

  Enter the number corresponding to the @@CONS capability required.

2. After responding to the console keyin prompt(s), the BIS machine name information is presented. This must be a different name than was used for the Batch job machine. For example, if the Batch job machine name is "U2200", use "U2200M" for the BIS machine. The following is displayed:

```

Mapper machine name = U2200M,<max jobs>

MAM sites currently defined:

1 = MAM ,SMA 0027 BPERR = 00000


Enter the MAM Site to configure

or enter 0 to change the Mapper machine name

or NEW to add a new MAM configuration

or INI to initialize the MAM configuration

or press **Transmit** to return

```

If you enter **0**, the configuration program prompts for a new Mapper machine name (**Enter a new MAPPER Machine Name**) and then for the maximum number of jobs for that machine (**Enter a new Max Jobs Allowed**).

You can define up to 18 MAM sites.

## Add a MAM

1. Enter NEW.
2. At the Enter MAM site id (single character) prompt, enter a unique MAM ID. The MAM ID is the MAM Site ID selected during the installation for this MAM.
3. At the Enter MAM UserID < > prompt, enter the MAM User-ID (the BIS USER-ID defined for this MAM, up to 12 characters) that was created in the Pre-Installation setup.
4. At the Enter MAM PassWD < > prompt, enter the password (up to 6 characters) defined for MAM's User-ID.
5. At the Enter MAM Dept CD <0000> prompt, enter the Department code (up to 4 digits) where this MAM is installed.
6. At the Enter MAM BP Name < > prompt, enter the Batchport Name (up to 6 characters) that was identified for this MAM in the Pre-Installation setup.
7. At the Enter this MAPPERs Qualifier < > prompt, enter the qualifier that the BIS is in.
8. (Optional) At the MAM Error RID <00000 > prompt, enter the BIS Station Number (up to 5 digits) which may be used to display MAM messages during processing.

:::info Note

The BIS Station Number is required only when MAM debug mode is active.

:::

## Addresses

Item 16 on page two of the configuration contains a list of up to 10 IP addresses. These addresses identify OpCon/xps servers that the LSAM is authorized to communicate with. The LSAM ignores messages received from an unauthorized OpCon/xps server. Setting any IP address parameter to 255.255.255.255 authorizes all OpCon/xps servers. Setting an IP address parameter to 0.0.0.0 removes that IP address from the list. IPv6 addresses are accepted only when **15 - Allow IPv6 network addresses** on page one is set to Yes.

All IP addresses must conform to valid IP address rules:

* Each must consist of 4 octets, separated by a period (.), for example, 192.0.2.4
* An octet value requires only the significant digits, leading zeros are not required, for example, 192.0.2.40 is equivalent to 192.000.002.040
* Each octet must have a value greater than zero and less than 255, for example, 192.0.2.10 is valid; 255.0.300.200 is not valid
