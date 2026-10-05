---
sidebar_label: 'Console message display level'
title: Console message display level
description: "Configure what job lifecycle messages appear on the OS 2200 system console: ECL location, FIN messages, and error messages."
tags:
  - Reference
  - System Administrator
  - Agents
---

# Console Message Display Level

Item 5 on Page 2 of the Configuration Settings controls which job lifecycle messages appear on the system console. It can display:

- The job's ECL location when each job starts
- A FIN message when each job terminates

The format of the ECL location message is:

```{Opcon Job Name} ECL: {qual*file.element/version}```

The format of the job FIN message is:

```{schedule date},{schedule name},{Opcon Job Name} {run-id} FIN {termination date} {termination time}```

When the LSAM configuration parameter "Display ECL location on console when job errors" is set to "Y" (Configuration Settings LSAMCFG Page 1, item 11), two messages are displayed for jobs that terminate in error, in the format of:

```JOB {Opcon Job Name} ERRORED ON {terminated date} AT {terminated time}```

```JOB {Opcon Job Name} ECL: {qual*file.element/version}```

When the LSAM configuration parameter "Display ECL location on console when job errors" is set to "N", and the Console Message Display Level is set for FIN messages, the following two messages are displayed for jobs that terminate in error:

```{schedule date},{schedule name},{Opcon Job Name} {run-id} ERR {termination date} {termination time}```

```{schedule date},{schedule name},{Opcon Job Name} RCW {termination condition word}```

Note the different formats used for:

```{termination date}``` formatted as ```MMDD```, or for European Date configurations as ```DDMM```,

```{terminated date}``` formatted as ```YYYYMMDD```,

```{termination time}``` formatted as ```HHMMSS```,

```{terminated time}``` formatted as ```HHMMSS```

When a job terminates normally but its termination condition word has a nonzero status, the FIN message shows ```+ DD HHMMSS``` in place of the date and time, and a second message follows in the format ```{schedule date},{schedule name},{Opcon Job Name} RCW {termination condition word}```.

## Examples

:::tip Example

Console Message Display Level is set to 1 (ECL location) and "Display ECL location on console when job errors" is set to "Y":

a. When the job is started:

* jobname ECL: qualifier*file.element/version

b. When the job terminates normally:

* no message is displayed

c. When the job terminates in error:

* JOB jobname ERRORED ON yyyymmdd AT hhmmss
* JOB jobname ECL: qualifier*file.element/version
 
:::

:::tip Example

Console Message Display Level is set to 2 (FIN messages) and "Display ECL location on console when job errors" is set to "Y":

a. When the job is started:

* standard LSAM Submitted messages

b. When the job terminates normally:

* schdate,schedule,jobname runid FIN mmdd hhmmss

c. When the job terminates in error:

* JOB jobname ERRORED ON yyyymmdd AT hhmmss
* JOB jobname ECL: qualifier*file.element/version
 
:::

:::tip Example

Console Message Display Level is set to 3 (ECL and FIN messages) and "Display ECL location on console when job errors" is set to "Y":

a. When the job is started:

* jobname ECL: qualifier*file.element/version

b. When the job terminates normally:

* schdate,schedule,jobname runid FIN mmdd hhmmss

c. When the job terminates in error:

* JOB jobname ERRORED ON yyyymmdd AT hhmmss
* JOB jobname ECL: qualifier*file.element/version

::: 

:::tip Example 

Console Message Display Level is set to 2 (FIN messages) and "Display ECL location on console when job errors" is set to "N":

a. When the job is started:

* standard LSAM Submitted messages

b. When the job terminates normally:

* schdate,schedule,jobname runid FIN mmdd hhmmss

c. When the job terminates in error:

* schdate,schedule,jobname runid ERR mmdd hhmmss
* schdate,schedule,jobname RCW termination-condition-word

::: 

:::tip Example

Console Message Display Level is set to 3 (ECL and FIN messages) and "Display ECL location on console when job errors" is set to "N":

a. When the job is started:

* jobname ECL: qualifier*file.element/version

b. When the job terminates normally:

* schdate,schedule,jobname runid FIN mmdd hhmmss

c. When the job terminates in error:

* schdate,schedule,jobname runid ERR mmdd hhmmss
* schdate,schedule,jobname RCW termination-condition-word