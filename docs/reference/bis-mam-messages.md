# BIS MAM Messages

### MULTIPLE MAMS STARTED - EXTRA TERMINATED

**Description**

* A MAM has been started while another MAM is already processing.
* Most likely a MAM configuration error.

### 501-COM FILE ERROR RET STATUS CODE = ```<status-code>```, MAM GOING DOWN

**Description**

* The MAM detected an error while attempting to retrieve the LMAM communications file.
* The status-code field contains the RET error code.
* MAM terminates.

### 502-COM FILE ERROR -- ELT STATUS CODE = ```<status-code>```, MAM GOING DOWN

**Description**

* The MAM encountered an error while attempting to ELT the LMAM communications file.
* The status-code field contains the ELT error code.
* MAM terminates.

### 503-COM FILE ERROR - NO CONTROL LINE, MAM GOING DOWN

**Description**

* The MAM has retrieved an LMAM communications file which does not contain a valid control line.
* MAM terminates.
* Most likely cause is the communications file being cataloged by a process other than LMAM.

### MAM ACCOUNTING RID IS MISSING 

and 

### MODE ```<MAM-registered-mode>``` DRAWER ```<MAM-data-type>``` RID 4

**Description**

* The MAM Accounting Rid is missing.
* The MAM-registered-mode field contains the cabinet (mode) MAM is registered in.
* The MAM-data-type field contains the drawer (type) of the report (rid).
* Most likely a failure during MAM installation, or the report was inadvertently deleted.

### NO COMMUNICATION WITH SAM/LMAM FOR 75 CYCLES 

and 

### DOWN MAM AND UP MAM AGAIN – 183

**Description**

* The MAM is unable to retrieve the LMAM communications file after 75 attempts.
* Most likely the LMAM is unable to detect the MAM as active.
* Using LMAM commands to "down" and then "up" the MAM forces LMAM to start communications with MAM.

### MAM-```<site-id>``` FILE NOT AVAILABLE, STAT=```<status-code>``` - 196	

**Description**

* The MAM has detected the LMAM communications file is not available for retrieving.
* The status-code field contains the RET status received.

### JOB ```<Opconxps-job-id>``` RUN ```<BIS-run-name>``` CANNOT BE STARTED

**Description**

* The MAM is unable to start the BIS-run-name associated with OpCon/xps-job-id.
* Most likely an invalid run name, or an error in the registration of run.

### JOBID ```<Opconxps-job-id>``` HAS NO STATION NUMBER and JOBID ```<Opconxps-job-id>``` STATUS IS UNPREDICTABLE'

**Description**

* The MAM is unable to identify the station number (terminal) of a background run.
* The station number is required for monitoring the run, the reported status may be inaccurate due to the inability to monitor the terminal.

### SAM/LMAM IS DOWN - MAM IS TERMINATING

**Description**

* The MAM has detected that LMAM is not processing. MAM terminates.
* Occurs when LMAM terminates.