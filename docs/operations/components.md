# LSAM/LMAM Components

| Component | Description | Function |
| --------- | ----------- | -------- |
| DUMPCDB | OS 2200 module | Prints the contents of the non-configured common data bank used by LSAM modules for data exchange |
| FTPAPI | OS 2200 module | Interfaces with Unisys CpFTP server for file transfers utilizing File Transfer Protocol (FTP) |
| LOADCDB | OS 2200 module | Initializes the non-configured common data bank for use by LSAM modules. This program executes each time XFRTCP is started |
| LMAM | OS 2200 module	| Starts and tracks BIS jobs when OpCon/xps uses MAM |
| LPARMINI | OS 2200 module	| Initializes the LSAM Configuration Backup file - *USE WITH CAUTION* |
| LPARMRES | OS 2200 module	| Restores LSAM Configuration parameters from a prior backup |
| LSAM | OS 2200 module	| Starts and tracks OS 2200 jobs for OpCon/xps |
| LSAMCFG | OS 2200 module | Modifies the LSAM configuration |
| MAM | BIS module | Monitors BIS runs |
| MAMBACKUP | BIS module | Backs up MAM run RIDs and MAM data RID 5 (Job/User RID) |
| MAMFIN | BIS module | Notifies MAM of run termination (optional) | 
| MAMINSTAL | BIS module |Installs MAM modules in BIS |
| MAMMSG | BIS run | Notifies system operator to start MAM after BIS Initializes |
| MAMNOT | BIS module | Sends events to OpCon/xps (optional) |
| MAMRESTORE | BIS module | Restores RIDs which have been backed-up with MAMBACKUP | 
| MAMSTR | BIS module | Starts BIS runs | 
| MAMTEST1 | BIS run | - Tests MAM installation <br></br> - This run accepts up to three input parameters that are displayed on the system console |  
| MAMTEST2 | BIS run | - Tests MAM installation <br></br> - This run error terminates |
| MAMTEST3 | BIS run | Tests MAM installation |
| SAMRID | OS 2200 module | Reports to the LSAM when the OS 2200 starts a job |
| SAMNOT | OS 2200 module | - Reports termination information to the LSAM at job completion <br></br> - Also used to send events to the OpCon/xps server |
| SMAFTA | OS 2200 module | The File Transfer Agent; retrieves and creates files transferred from other systems |
| SMAJOR | OS 2200 module | Manages Job Output Retrieval System (JORS) and File Transfer requests |
| SMAMSC | OS 2200 module | Interfaces with Unisys Monitor Services (MSCP) to monitor OS 2200 job starts and terminations |
| XFRINI | OS 2200 module | Initializes the TIP communication file | 
| XFRPRT | OS 2200 module | Prints information from the communication file |
| XFRTCP | OS 2200 module | Manages TCP/IP and network communication |