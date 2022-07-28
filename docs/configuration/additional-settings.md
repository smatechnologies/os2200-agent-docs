# Additional Settings

## Authorized Users

Item 18 on page two of the configuration restricts the use of LSAMCFG to specific OS 2200 DEMAND users. This option displays users authorized to view and modify LSAM configuration parameters (LSAMCFG). Define a maximum of 10 DEMAND user-IDs. Enter "any user" or "any" to bypass user validation, thus allowing any DEMAND user to view and modify configuration parameters.

:::warning

The user of JORS may require specific configuration that should only be performed by authorized users. When there are security concerns related to LSAM configuration, SMA recommends restricting LSAMCFG to only authorized users.

:::

## Setting Communication Protocol

The SMA_SETSMAPROTOCOL stored procedure changes the communication protocol for both Unisys OS 2200 and BIS machines to "Contemporary, Non-XML". If the OS 2200 machine changes, any BIS machines using that Unisys OS 2200 machine as a gateway also change.

:::warning

Releases 3R30x, 3R31x, and 4R1x of the OS 2200 LSAM and BIS LMAM require the "Contemporary, non-XML" setting.

:::

The stored procedure performs the following actions:

* For a single machine:
    * Switches protocols for all machines using that machine as a gateway (i.e., BIS machines).
    * Switches the protocol for the machine itself.

* Only Unisys OS 2200 machines are valid.
    * For a machine group:
    * Switches protocols for all machines using any machine in the group as a gateway.
    * Switches protocols for all machines in the group.
    * Switches protocols for the machine group itself.
    * Both Unisys OS 2200 and BIS machine groups are valid.

## Syntax

```EXEC SMA_SETSMAPROTOCOL '<Name>',[Y/N]```

The following list describes the parameters for the stored procedure:

* SMA_SETSMAPROTOCOL is the stored procedure.
* ```<Name>``` specifies which machine or machine group the procedure configures.
* [Y/N] is the flag determining if the name specified is a machine or a machine group.
    * Y indicates the name is for a machine group.
    * N indicates the name is for a machine.
    * If this flag is absent, the procedure defaults to N.

## Switch the Communication Protocol for a Machine

Complete the following procedure on a machine with the Microsoft SQL Server Administrative tools:

1. On the OpCon/xps Database Server, log in as a local administrative user.
2. Use menu path: Start > All Programs > Microsoft SQL Server > SQL Server Management Studio.
3. In the Server type list box, select Database Engine in the Connect to Server window.
4. In the Server name list box, select the OpConxps Desired Database Server.

5. In the Authentication list box, select:
    
    a. Windows Authentication to log in with the current Windows User with local administrative authority - or -
    
    b. SQL Server Authentication and supply the following information:

    * In the Login text box, enter sa.

    * In the Password text box, enter sa's password.

6. Click the Connect button.
7. Expand (+) the Databases folder in the Microsoft SQL Server Management Studio window.
8. Click the OpCon/xps database.
9. Click the New Query button on the Standard Toolbar.
10. Enter the command for the EXEC SMA_SETSMAPROTOCOL stored procedure.

:::tip Example

The command for the EXEC SMA_SETSMAPROTOCOL stored procedure:

```EXEC SMA_SETSMAPROTOCOL 'Unisys1','N'```

:::

11. In the toolbar, click the Execute button or press F5 to execute the query.

## Switch the Communication Protocol for a Machine Group

Complete the following procedure on a machine with the Microsoft SQL Server Administrative tools:

1. On the OpCon/xps Database Server, log in as a local administrative user.
2. Use menu path: Start > All Programs > Microsoft SQL Server > SQL Server Management Studio.
3. In the Server type list box, select Database Engine in the Connect to Server window.
4. In the Server name list box, select the OpConxps Desired Database Server.
5. In the Authentication list box, select:
    
    a. Windows Authentication to log in with the current Windows User with local administrative authority - or -
    
    b. SQL Server Authentication and supply the following information:
        
    * In the Login text box, enter sa.
    * In the Password text box, enter sa's password.

6. Click the Connect button.
7. Expand (+) the Databases folder in the Microsoft SQL Server Management Studio window.
8. Click the OpCon/xps database.
9. Click the New Query button on the Standard Toolbar.
10. Enter the command for the EXEC SMA_SETSMAPROTOCOL stored procedure.

:::tip Example

The command for the EXEC SMA_SETSMAPROTOCOL stored procedure:

```EXEC SMA_SETSMAPROTOCOL 'UnisysGroup','Y'```

:::

11. In the toolbar, click the Execute button or press F5 to execute the query.
