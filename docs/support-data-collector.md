# Support Data Collector

The Support Data Collector procedure collects OS 2200 LSAM data related to an incident reported to SMA Support. The Data Collector creates a text data file containing:

* Log files
* Installation parameters
* Program versions
* TIP file contents
* Operating system information
* Installed program information
* Table of contents of the primary LSAM files

After collecting the data, send to SMA Support for further analysis.

## Requirements

The Support Data Collector procedure requires the following information and capabilities:

* The date of the reported incident.
    *When the date of the incident is the current day, and the OS 2200 LSAM runs are processing; issue BRKPT commands to each of the runs to cycle the log files.

:::tip Example

```

@@CONS *XFRTCP BRKPT

@@CONS *LSAM BRKPT

@@CONS *LMAM BRKPT

@@CONS *JORS BRKPT

```

:::

* When one or more of the modules are not in use at your site, skip the BRKPT command for that module.

:::info Note

The console keyin (*module) may be different at your site. Use the appropriate keyin for each module.

:::

* The approximate time of the incident.
* ASCII file transfer capability on the OS 2200 to send SMA the data.

## Initiate the Support Data Collector Procedure

### Supply the Incident Time and Date

1. From a DEMAND session, set the LSAM file qualifier: @QUAL [LSAMqualifier]
2. Provide the incident date and incident time to the Data Collector:

    ```@ADD *SKDPRG.SUPPORT/ECL```

3. At the ```Enter date of incident (yyyymmdd) <today>``` prompt, enter the *date of the reported incident*. To accept the displayed default of today's date, simply transmit.
4. At the ```Enter approximate time of incident (hhmm) <0001>``` prompt, enter the *approximate time of the reported incident*. The procedure selects log files that were active at this time. To accept the displayed default of one minute past midnight, simply Transmit.

### Review Information

1. The procedure displays helpful information, as well as suggestions for additional information that the Data Collector was unable to retrieve.
2. The procedure then displays the location of the generated Data Collector runstream (e.g., ```*SKDPRG.SUPP/ECL```).
3. The procedure provides the ECL statements to either ```@ADD``` or ```@START``` the data collection. It also provides the file name with the collected data.
4. The procedure displays the file name of the collected data: ```[LSAMqualifier]*SUPPyyyymmdd```.
5. The procedure finally displays the "END DATA COLLECTOR SETUP" message.

### Start Data Collection

To collect the LSAM data, issue one of the displayed ECL commands:

1. ```@ADD,L *SKDPRG.SUPP/ECL``` 

- or -

2. ```@START *SKDPRG.SUPP/ECL```

:::info Note 

The Data Collector may require up to 20 minutes to create the data file.

:::

### Send the Data File to SMA

Following the data collection process, send the data file (```*SUPPyyyymmdd```) to SMA with a description of the incident. The following are viable methods for sending the collected data to SMA:

* Transferring the file to a platform where it may be attached to an email. Transfer the file in **ASCII** format. Depending on the size of the file, it may be useful to compress the file before emailing it.
* Emailing the file directly, as an ASCII text file, from the OS 2200 using Enterprise Output Manager (EOM [formerly known as Depcon]).
* Transferring the file, using ASCII format, to SMA's ftp site. Contact SMA with the incident details and the name of the ftp'd file.

:::info Note

If necessary, contact SMA Support for assistance with this procedure.

:::