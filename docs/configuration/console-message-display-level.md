# Console Message Display Level

Item 5 on Page 2 of the Configuration Settings, **Console Message Display Level**, may be used to display:

## Overview

1. The job's ECL location on the system console as each job is started - and/or -
2. A job FIN message on the system console as each job terminates.

The format of the ECL location message is:

```{Opcon Job Name} ECL: {file*qual.element/version}```

The format of the job FIN message is:

```{Opcon Job Name} FIN ON {termination date} AT {termination time}```

When the LSAM configuration parameter "Display ECL location on console when job errors" is set to "Y" (Configuration Settings LSAMCFG Page 1, item 11), two messages are displayed for jobs that terminate in error, in the format of:

```JOB {Opcon Job Name} ERRORED ON {terminated date} at {terminated time}```

```JOB {Opcon Job Name} ECL: {file*qual.element/version}```

When the LSAM configuration parameter "Display ECL location on console when job errors" is set to "N", and the Console Message Display Level is set for FIN messages, the following message format is displayed for jobs that terminate in error:

```{Opcon Job Name} ERROR FIN ON {termination date} AT {termination time}```

Note the different formats used for:

```{termination date}``` formatted as ```MM-DD-YY```, or for European Date configurations as ```DD-MM-YY```,

```{terminated date}``` formatted as ```YYYYMMDD```,

```{termination time}``` formatted as ```HH:MM:SS```,

```{terminated time}``` formatted as ```HHMMSS```

## Examples

:::tip Example::: 

Console Message Display Level is set to 1 (ECL location) and "Display ECL location on console when job errors" is set to "Y":

a. When the job is started:

* JOB jobname ECL: qualifier*file.element/version

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

* jobname FIN ON mm-dd-yy AT hh:mm:ss

c. When the job terminates in error:

* JOB jobname ERRORED ON yyyymmdd AT hhmmss
* JOB jobname ECL: qualifier*file.element/version
 
:::

:::tip Example

Console Message Display Level is set to 3 (ECL and FIN messages) and "Display ECL location on console when job errors" is set to "Y":

a. When the job is started:

* JOB jobname ECL: qualifier*file.element/version

b. When the job terminates normally:

* jobname FIN ON mm-dd-yy AT hh:mm:ss

c. When the job terminates in error:

* JOB jobname ERRORED ON yyyymmdd AT hhmmss
* JOB jobname ECL: qualifier*file.element/version

::: 

:::tip Example 

Console Message Display Level is set to 2 (FIN messages) and "Display ECL location on console when job errors" is set to "N":

a. When the job is started:

* standard LSAM Submitted messages

b. When the job terminates normally:

* jobname FIN ON mm-dd-yy AT hh:mm:ss

c. When the job terminates in error:

* jobname ERROR FIN ON mm-dd-yy AT hh:mm:ss

::: 

:::tip Example

Console Message Display Level is set to 3 (ECL and FIN messages) and "Display ECL location on console when job errors" is set to "N":

a. When the job is started:

* JOB jobname ECL: qualifier*file.element/version

b. When the job terminates normally:

* jobname FIN ON mm-dd-yy AT hh:mm:ss

c. When the job terminates in error:

* jobname ERROR FIN ON mm-dd-yy AT hh:mm:ss