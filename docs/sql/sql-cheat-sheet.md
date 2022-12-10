---
id: sql-cheat-sheet
slug: /sql-cheat-sheet
title: SQL command cheat sheet
---

### ALTER USER

Modifies the name, password, privileges, and other properties of an existing user.

```sql title="Alter user name:"
ALTER USER user_name 
    RENAME TO new_user_name
```

```sql title="Alter user properties:"
ALTER USER user_name 
    [ [ WITH ] option [ ... ] ]
```

### CREATE DATABASE

Creates a new database.

```sql
CREATE DATABASE [ IF NOT EXISTS ] database_name;
```

### CREATE MATERIALIZED VIEW

Creates a materialized view. A materialized view can be created based on sources, tables, materialized views, or indexes.

```sql
CREATE MATERIALIZED VIEW mv_name AS select_query;
```

### CREATE SCHEMA

Creates a new schema.

```sql
CREATE SCHEMA [IF NOT EXISTS] [database_name.]schema_name;
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

```sql
CREATE TABLE table_name (col_name data_type [, col_name data_type ...]);
```

### CREATE USER

Creates a new user account in RisingWave.

```sql
CREATE USER user_name 
    [ [ WITH ] option [ ... ] ]
```

### CREATE VIEW

Creates a non-materialized view, which runs every time the view is referenced in a query. A non-materialized view can be created based on sources, tables, views, or indexes.

```sql
CREATE VIEW view_name [ ( column_name [, ...] ) ] AS select_query;
```

### DELETE

Permanently removes rows from a table.

```sql
DELETE FROM table_name
WHERE condition;
```

### DESCRIBE

Displays columns in the specified table, source, or materialized view.

```sql
DESCRIBE table_name;
```