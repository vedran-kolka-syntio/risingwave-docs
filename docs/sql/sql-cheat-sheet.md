---
id: sql-cheat-sheet
slug: /sql-cheat-sheet
title: SQL command cheat sheet
---

### ALTER USER

Modifies the name, password, privileges, and other properties of an existing user.

```sql title="Rename the user user1 to user001:"
ALTER USER user1 RENAME TO user001;
```

```sql title="Modify the password and privileges of user001:"
ALTER USER user001 NOSUPERUSER CREATEDB PASSWORD '4d2Df1ee5';
```

### CREATE DATABASE

Creates a new database.

```sql
CREATE DATABASE IF NOT EXISTS travel;
```

### CREATE MATERIALIZED VIEW

Creates a materialized view. A materialized view can be created based on sources, tables, materialized views, or indexes.

```sql
CREATE MATERIALIZED VIEW retrans_incidents AS
SELECT
    device_id,
    window_end AS trigger_time,
    metric_value AS trigger_value
FROM
    high_util_tcp_metrics
WHERE
    metric_name = 'retrans_rate'
    AND metric_value > 0.15;
```

### CREATE SCHEMA

Creates a new schema.

```sql
CREATE SCHEMA IF NOT EXISTS schema_1;
```

### CREATE SINK

Creates a sink. A sink is a connection to a stream that RisingWave can send data to. You can create a sink from a materialized source, a materialized view, or a table.

```sql
CREATE SINK [ IF NOT EXISTS ] sink_name 
FROM sink_from
WITH (
   connector='kafka',
   kafka.brokers='broker_address',
   kafka.topic='topic_address',
   format='format'
);
```

### CREATE SOURCE

Establishes the connection to a source. After a connection is established, RisingWave will be able to read data from the source. Sources are resources that RisingWave can read data from.

Supported sources include: [Kafka](create-source/create-source-kafka-redpanda.md). [Redpanda](create-source/create-source-kafka-redpanda.md), [Pulsar](create-source/create-source-pulsar.md), [Kinesis](create-source/create-source-kinesis.md), [PostgreSQL CDC](create-source/create-source-cdc.md), and [MySQL CDC](create-source/create-source-cdc.md).

Supported formats includes Avro, JSON, Protobuf, and Debezium JSON.

Here is an example of connecting RisingWave to a Kafka broker to read data from individual topics.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="avro" label="Avro" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc 
WITH (
   connector='kafka',
   topic='demo_topic',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000',
   properties.group.id='demo_consumer_name'
)
ROW FORMAT AVRO MESSAGE 'main_message'
ROW SCHEMA LOCATION CONFLUENT SCHEMA REGISTRY 'http://127.0.0.1:8081';
```
</TabItem>
<TabItem value="json" label="JSON" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc (
   column1 varchar,
   column2 integer,
)
WITH (
   connector='kafka',
   topic='demo_topic',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000',
   properties.group.id='demo_consumer_name'
)
ROW FORMAT JSON;
```
</TabItem>
<TabItem value="pb" label="Protobuf" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc 
WITH (
   connector='kafka',
   topic='demo_topic',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000',
   properties.group.id='demo_consumer_name'
)
ROW FORMAT PROTOBUF MESSAGE 'main_message'
ROW SCHEMA LOCATION 'https://demo_bucket_name.s3-us-west-2.amazonaws.com/demo.proto';
```

</TabItem>
</Tabs>







Here is an example of connecting RisingWave to a Pulsar broker to read data from individual topics.

<Tabs>
<TabItem value="avro" label="Avro" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc 
WITH (
   connector='pulsar',
   topic='demo_topic',
   service.url='pulsar://localhost:6650/',
   admin.url='http://localhost:8080',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000'
)
ROW FORMAT AVRO MESSAGE 'FooMessage'
ROW SCHEMA LOCATION 'https://demo_bucket_name.s3-us-west-2.amazonaws.com/demo.avsc';
```
</TabItem>
<TabItem value="json" label="JSON" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc (
   column1 string,
   column2 integer,
)
WITH (
   connector='pulsar',
   topic='demo_topic',
   service.url='pulsar://localhost:6650/',
   admin.url='http://localhost:8080',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000'
)
ROW FORMAT JSON;
```
</TabItem>
<TabItem value="pb" label="Protobuf" default>

```sql
CREATE MATERIALIZED SOURCE IF NOT EXISTS source_abc (
   column1 string,
   column2 integer,
)
WITH (
   connector='pulsar',
   topic='demo_topic',
   service.url='pulsar://localhost:6650/',
   admin.url='http://localhost:8080',
   scan.startup.mode='latest',
   scan.startup.timestamp_millis='140000000'
)
ROW FORMAT PROTOBUF MESSAGE 'FooMessage'
ROW SCHEMA LOCATION 'https://demo_bucket_name.s3-us-west-2.amazonaws.com/demo.proto';
```
</TabItem>
</Tabs>







Here is an example of connecting RisingWave to Kinesis Data Streams to read data from individual streams.

<Tabs>
<TabItem value="avro" label="Avro" default>

```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name
WITH (
   connector='kinesis',
   stream='kafka',
   aws.region='user_test_topic',
   endpoint='172.10.1.1:9090,172.10.1.2:9090',
   aws.credentials.session_token='AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT+FvwqnKwRcOIfrRh3c/L To6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE/IvU1dYUg2RVAJBanLiHb4IgRmpRV3z rkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb/AXlzBBko7b15fjrBs2+cTQtp Z3CYWFXG8C5zqx37wnOE49mRl/+OtkIKGO7fAE',
   aws.credentials.role.arn='arn:aws-cn:iam::602389639824:role/demo_role',
   aws.credentials.role.external_id='demo_external_id'
) 
ROW FORMAT AVRO MESSAGE 'main_message'
ROW SCHEMA LOCATION 'https://demo_bucket_name.s3-us-west-2.amazonaws.com/demo.avsc';
```
</TabItem>
<TabItem value="json" label="JSON" default>

```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name (
   column1 varchar,
   column2 integer,
) 
WITH (
   connector='kinesis',
   stream='kafka',
   aws.region='user_test_topic',
   endpoint='172.10.1.1:9090,172.10.1.2:9090',
   aws.credentials.session_token='AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT+FvwqnKwRcOIfrRh3c/L To6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE/IvU1dYUg2RVAJBanLiHb4IgRmpRV3z rkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb/AXlzBBko7b15fjrBs2+cTQtp Z3CYWFXG8C5zqx37wnOE49mRl/+OtkIKGO7fAE',
   aws.credentials.role.arn='arn:aws-cn:iam::602389639824:role/demo_role',
   aws.credentials.role.external_id='demo_external_id'
) 
ROW FORMAT JSON;
```
</TabItem>
<TabItem value="pb" label="Protobuf" default>

```sql
CREATE [MATERIALIZED] SOURCE [IF NOT EXISTS] source_name
WITH (
   connector='kinesis',
   stream='kafka',
   aws.region='user_test_topic',
   endpoint='172.10.1.1:9090,172.10.1.2:9090',
   aws.credentials.session_token='AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT+FvwqnKwRcOIfrRh3c/L To6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE/IvU1dYUg2RVAJBanLiHb4IgRmpRV3z rkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb/AXlzBBko7b15fjrBs2+cTQtp Z3CYWFXG8C5zqx37wnOE49mRl/+OtkIKGO7fAE',
   aws.credentials.role.arn='arn:aws-cn:iam::602389639824:role/demo_role',
   aws.credentials.role.external_id='demo_external_id'
) 
ROW FORMAT PROTOBUF MESSAGE 'main_message'
ROW SCHEMA LOCATION 'https://demo_bucket_name.s3-us-west-2.amazonaws.com/demo.proto';
```
</TabItem>
</Tabs>









Here is an example of connecting RisingWave to a CDC service to read data from individual streams.

```sql
CREATE MATERIALIZED SOURCE [IF NOT EXISTS] source_name (
   column1 varchar,
   column2 integer,
   PRIMARY KEY (column1)
) 
WITH (
   connector='kafka',
   topic='user_test_topic',
   properties.bootstrap.server='172.10.1.1:9090,172.10.1.2:9090',
   scan.startup.mode='earliest',
   properties.group.id='demo_consumer_name'
) 
ROW FORMAT DEBEZIUM_JSON;
```







```sql title="Avro syntax:"
ROW FORMAT AVRO 
MESSAGE 'main_message' 
ROW SCHEMA LOCATION [ 'location' | CONFLUENT SCHEMA REGISTRY 'schema_registry_url' ]
```

```sql title="JSON syntax:"
ROW FORMAT JSON
```

```sql title="Protobuf syntax:"
ROW FORMAT PROTOBUF 
MESSAGE 'main_message' 
ROW SCHEMA LOCATION 'local_or_remote_location'
```

```sql title="Debezium JSON syntax:"
ROW FORMAT DEBEZIUM_JSON
```

### CREATE TABLE

Creates a new table.

```sql title="Create a table with three columns:"
CREATE TABLE taxi_trips(
    id VARCHAR,
    distance DOUBLE PRECISION,
    city VARCHAR
);
```

```sql title="Create a table that includes nested tables:"
CREATE TABLE taxi_trips(
    id VARCHAR,
    distance DOUBLE PRECISION,
    duration DOUBLE PRECISION,
    fare STRUCT<initial_charge DOUBLE PRECISION, subsequent_charge DOUBLE PRECISION, surcharge DOUBLE PRECISION, tolls DOUBLE PRECISION>
);
```

### CREATE USER

```sql title="Create a user account with the name "user1" and password 'pAssword12345':"
CREATE USER user1 
    WITH PASSWORD 'pAssword12345';
```

### CREATE VIEW

Creates a non-materialized view, which runs every time the view is referenced in a query. A non-materialized view can be created based on sources, tables, views, or indexes.

```sql title="Create views based a user-defined table and a materialized source, and then create a new view based on the existing views:"
-- Create a table and add some records.

CREATE TABLE t1 (a int, b int, c int);

INSERT INTO t1 VALUES (115, 1, 8), (585, 2, 3), (601, 3, 7);

-- Create a source (whose data is generated by the built-in generator).

CREATE MATERIALIZED SOURCE s1 (i1 int, c1 varchar) 
WITH (
     connector = 'datagen',
     fields.i1.kind = 'sequence',
     fields.i1.start = '1',
     fields.c1.kind = 'random',
     fields.c1.length = '16',
     fields.c1.seed = '3',
     datagen.rows.per.second = '10'
 ) ROW FORMAT JSON;

-- Create views based on the table, source, and existing views.

CREATE VIEW v1 (a1, b1) AS SELECT a, b FROM t1;

CREATE VIEW v2 AS SELECT * FROM s1 ORDER BY i1;

CREATE VIEW v3 AS SELECT a1, i1, c1 FROM v1 LEFT JOIN v2 ON v1.b1=v2.i1;
```

### DELETE

Permanently removes rows from a table.

```sql title="Remove the record with id 3 from the table:"
DELETE FROM taxi_trips 
WHERE id = 3;
```

### DESCRIBE

Displays columns in the specified table, source, or materialized view.

```sql
DESCRIBE taxi_trips;
```

### DROP DATABASE

Removes a database from your RisingWave instance. Before you can remove a database, you must use `DROP SCHEMA` to remove all its dependent schemas.

```sql title="Remove the "rw_db" database which contains two schemas, "rw_schema" and "public" (default schema):"
DROP SCHEMA rw_db.rw_schema;
DROP SCHEMA rw_db.public;
DROP DATABASE rw_db;
```


### DROP MATERIALIZED VIEW

Removes a materialized view from the database. Before you can remove a materialzied view, you must remove all its dependent materialzied views.

```sql title="Remove the "ad_ctr_5min" materialized view in the default schema ("public") from the database:"
DROP MATERIALIZED VIEW ad_ctr_5min;
```

```sql title="Removes the "ad_ctr_5min" materialized view in the "rw_schema" schema from the database:"
DROP MATERIALIZED VIEW IF EXISTS rw_schema.ad_ctr_5min;
```


### DROP SCHEMA

Removes a schema from a database. Before you can remove a schema, you must remove all its dependent objects (tables, materialized views, etc.).

```sql title="Remove the "rw_schema" schema from the "rw_db" database:"
DROP SCHEMA rw_db.rw_schema;
```

```sql title="Remove the "rw_schema" schema from the "dev" database (default database):"
DROP SCHEMA rw_schema;
```

```sql title="Use this statement if you don't want RisingWave to return an error if the schema you want to remove does not exist:"
DROP SCHEMA IF EXISTS rw_schema;
```

### DROP SOURCE

Removes a source if you no longer need the data inflow from the source. Before you can remove a source, you must use 'DROP MATERIALIZED VIEW' to remove all its dependent materialized views.

```sql title="Remove the "rw_source" source in the default schema ("public") from the database:"
DROP SOURCE rw_source;
```

```sql title="Remove the "rw_source" source in the "rw_schema" schema from the database:"
DROP SOURCE IF EXISTS rw_schema.rw_source;
```


### DROP TABLE

Removes a table from the database. Before you can remove a table, you must remove all its dependent objects (indexes, materialized views, etc.).

```sql title="Remove the "taxi_trips" table in the default schema ("public") from the database:"
DROP TABLE taxi_trips;
```

```sql title="Remove the "taxi_trips" table in the "rw_schema" schema from the database:"
DROP TABLE IF EXISTS rw_schema.taxi_trips;
```


### DROP USER

Removes a user from RisingWave.

```sql title="Remove the user with the name "user1":"
DROP USER user1;
```


### EXPLAIN

Shows the execution plan of a statement.

```sql title="Shows the execution plan of a SELECT statement:"
EXPLAIN SELECT
    o_orderpriority,
    count(*) AS order_count
FROM
    orders
WHERE
    o_orderdate >= date '1997-07-01'
    and o_orderdate < date '1997-07-01' + interval '3' month
    and exists (
        SELECT
            *
        FROM
            lineitem
        WHERE
            l_orderkey = o_orderkey
            and l_commitdate < l_receiptdate
    )
GROUP BY
    o_orderpriority
ORDER BY
    o_orderpriority;
```

```sql title="Execution plan output:"
 BatchExchange { order: [orders.o_orderpriority ASC], dist: Single }
   BatchSort { order: [orders.o_orderpriority ASC] }
     BatchHashAgg { group_key: [orders.o_orderpriority], aggs: [count] }
       BatchExchange { order: [], dist: HashShard(orders.o_orderpriority) }
         BatchHashJoin { type: LeftSemi, predicate: orders.o_orderkey = lineitem.l_orderkey }
           BatchExchange { order: [], dist: HashShard(orders.o_orderkey) }
             BatchProject { exprs: [orders.o_orderkey, orders.o_orderpriority] }
               BatchFilter { predicate: (orders.o_orderdate >= '1997-07-01':Varchar::Date) AND (orders.o_orderdate < ('1997-07-01':Varchar::Date + '3 mons 00:00:00':Interval)) }
                 BatchScan { table: orders, columns: [o_orderkey, o_orderpriority, o_orderdate] }
           BatchExchange { order: [], dist: HashShard(lineitem.l_orderkey) }
             BatchProject { exprs: [lineitem.l_orderkey] }
               BatchFilter { predicate: (lineitem.l_commitdate < lineitem.l_receiptdate) }
                 BatchScan { table: lineitem, columns: [l_orderkey, l_commitdate, l_receiptdate] }
(13 rows)
```




### INSERT

Inserts new rows into an existing table.

```sql title="Insert four new rows into table "taxi_trips":"
INSERT INTO taxi_trips 
    VALUES 
      (1,16,'Dallas'), 
      (2,23,'New York'), 
      (3,6,'Chicago'), 
      (4,9,NULL);
```




### SELECT

Retrieves rows from a table or materialized view. It returns the rows that satisfy the creteria that you specify with the clauses and conditions in your query.

```sql title="Return the total distance and duration of trips that are beyond the initial charge ($2.50) of each taxi from the company "Yellow Taxi" and "FabCab":"
SELECT 
    taxi.taxi_id, 
    sum(trips.distance) AS total_distance, 
    sum(trips.duration) AS total_duration
FROM taxi_trips AS trips
LEFT JOIN taxi ON trips.id = taxi.trip_id
WHERE taxi_id IN (
          SELECT taxi_id
          FROM company
          WHERE company_id IN ('Yellow Taxi', 'FabCab')
      )
      AND trips.fare > 2.50
GROUP BY taxi_id
ORDER BY total_distance, total_duration;
```






### SHOW COLUMNS

Displays columns in the specified table, source, or materialized view.

```sql
SHOW COLUMNS FROM taxi_trips;
```



### SHOW DATABASES

Displays all databases.

```sql
SHOW DATABASES;
```



### SHOW MATERIALIZED VIEWS

Displays existing materialized views.

```sql
SHOW MATERIALIZED VIEWS FROM schema_1;
```


### SHOW SCHEMAS

Displays schemas in the "dev" database.

```sql
SHOW SCHEMAS;
```


### SHOW SOURCES

Displays existing sources.

```sql
SHOW SOURCES;
```


### SHOW TABLES

Displays tables in a particular schema.

```sql
SHOW TABLES FROM schema_1;
```



### UPDATE

Modifies values of existing rows in a table.

```sql title="Update the city name from 'Yerba Buena' to 'San Francisco':"
UPDATE taxi_trips 
SET city = 'San Francisco' 
WHERE city = 'Yerba Buena';
```

```sql title="Converts the distance unit from kilometer to mile':"
UPDATE taxi_trips 
SET distance = distance * 0.6214;
```