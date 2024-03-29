---
sidebar_label: 'Release notes'
---

# OS 2200 LSAM Release notes

## OS 2200 LSAM 22R1A

- Support TDATE$ changes 


## OS 2200 LSAM 19R1A

- Option to create uniquely named ECL files for started jobs
  - Temporary ECL files are normally created with the OpCon job name.  With this option, the files will be created 
with the OpCon JobID, allowing for more than 32 concurrent instances
- Pass long schedule name to SAMNOT via ECL card
- Send Job start statement to Opcon core
- Improved failure detection
- Support longer job output records (888, up from 132)
- TCP/IP improvements
  - Improved support for IPv6
  - Support for TLS in app, not just through the CPCOMM settings
  - Fix for MSGPOOL filling up, resulting in last messages
- Various performance and stability improvements

