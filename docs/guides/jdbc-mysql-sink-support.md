---
id: sink-to-mysql-with-jdbc
title: Sink data from RisingWave to MySQL with JDBC connector
description: Sink data from RisingWave to MySQL with JDBC connector.
slug: /sink-to-mysql-with-jdbc
---

In this guide, we will introduce how to sink data from RisingWave to JDBC-available databases using the feature of JDBC sink. We will create and connect to a database established on the cloud to minimize the efforts. Cloud databases can become an indispensable data sink for applications. As the largest cloud provider, AWS hosts Relational Database Services (RDS) that waive the need for setup and maintenance effort and has high availability and scalability options.

## Set up and connect to an AWS RDS instance from MySQL

### Set up an RDS Instance on AWS

1. Log in to the AWS console. Search “RDS” in services and select the **RDS** panel.

<img
  src={require('../images/search-rds.png').default}
  alt="Search for RDS"
/>

2. Create a database with **MySQL** as the **Engine type**. We recommend setting up a username and password or using other security options.

<img
  src={require('../images/mysql-config.png').default}
  alt="Configurations for setting up a MySQL RDS"
/>

3. When the new instance becomes available, click on its panel. 

<img
  src={require('../images/new-panel.png').default}
  alt="MySQL instance panel"
/>

4. From the **Connectivity** panel, we can find the enpoint and connection port information.

<img
  src={require('../images/connectivity.png').default}
  alt="Endpoint and port information"
/>

### Connect to the RDS instance from 

Now we can connect to the RDS instance. On your local machine, make sure you have installed MySQL, and start a MySQL prompt. Fill in the endpoint, the port, and login credentials in the connection parameters. 

```terminal
mysql -h rw-to-mysql.xxxxxx.us-east-1.rds.amazonaws.com -P 3306 -u <username> -p <password>
```

For more login options, refer to the [RDS connection guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ConnectToInstance.html).

Use the following query to set up a database and a table in the RDS instance.

```mysql
CREATE TABLE test_db.personnel (
	id integer,
	name varchar(200)
);
```

If the creation is successful, expect a returned message.

```mysql
Query OK, 0 rows affected (0.10 sec)
```

## Create a sink in RisingWave

### Install and launch RisingWave

To install and start RisingWave locally, see the [Get started](/get-started.md) guide. We recommend running RisingWave locally for testing purposes. 


### Enable the connector node in RisingWave

 Please note that RisingWave starts as a cluster. To enable a JDBC connector, make sure that the connector node is enabled in the RisingWave cluster. The connector node handles the connections with upstream and downstream systems. You can enable the connector node in two ways:
 - Using the latest docker-compose file of RisingWave demo
   The connector node is enabled by default in this docker-compose file. To learn about how to start RisingWave with this file, see [Docker Compose](../deploy/risingwave-docker-compose.md). 
 - Using RiseDev, the developer's tool
   Download the latest source file of RisingWave. Run `./risedev configure` in the root directory of RisingWave and enable the **RisingWave Connector** component. Alternatively, you can edit the `risedev.yml` file and uncomment the line of code `- use: connector:node` for the default configuration. After you complete the changes, you need to run `./risedev dev` to launch the cluster with the new configuration.


### Sink from RisingWave

To sink to the RDS instance, make sure that RisingWave and the connector node share the same table schema. Use the following queries in RisingWave to create a table and sink.

Remember to fill in the AWS endpoint, username, and password based on the RDS instance you created. 

```sql
CREATE TABLE personnel (
	id integer,
	name varchar,
);

CREATE SINK s_mysql FROM personnel WITH (
	connector='jdbc',
	jdbc.url='jdbc:mysql://<aws_rds_endpoint>:<port>/test_db?user=<username>&password=<password>',
	table.name='personnel'
);
```

Insert some data with the following query. Remember to use the `FLUSH` command to commit the update.

```sql
INSERT INTO personnel VALUES (1, 'Alice'), (2, 'Bob');

FLUSH;
```

The changes will then be synced to the RDS instance. To verify the update, connect to the AWS RDS instance and query the table. The changes you made to the table should be reflected.

```terminal
mysql -h rw-to-mysql.xxxxxx.us-east-1.rds.amazonaws.com -P 3306 -u <username> -p <password>
```

```sql
SELECT * FROM testdb.test;

+------+-------+
| id   | name  |
+------+-------+
|    1 | Alice |
+------+-------+
|    2 | Bob   |
+------+-------+
```

