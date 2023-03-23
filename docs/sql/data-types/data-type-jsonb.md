---
id: data-type-jsonb
slug: /data-type-jsonb
title: JSONB
---

Use the jsonb data type to create a column that can store JSON data in binary format. The jsonb data type provides additional query capabilities and supports indexing.

## Define a jsonb type

Syntax:
`JSONB`

### Examples

The statement below creates a table `x` that contains a jsonb column named `j_data`.

```sql
CREATE TABLE x (j_data JSONB, d INTEGER);
```

The statement below creates a table `y` that contains a jsonb column named `metadata`.

```sql
CREATE TABLE y (id VARCHAR, metadata JSONB);
```

Below is a real world example.

```sql
CREATE TABLE product (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        price NUMERIC,
        attributes JSONB
        );
```


## Add values to a jsonb column

To add values to a jsonb column, use the JSON data format in the SQL statement. For example, `{"key": "value"}`.

### Examples

The statement below adds values to table `x`.

```sql
INSERT INTO x VALUES ('{"a": 3, "b": 4}', 5);
```

The statement below adds values to table `y`.
```sql
INSERT INTO y VALUES ('ABCD1234', '{"color": "blue", "size": "M"}');
```

The statement below adds values to table `product`.

```sql
INSERT INTO product (name, price, attributes)
VALUES 
        (
            'T-Shirt', 
            19.99, 
            '{"color": "red", "size": "L"}'
        );
```


## Retrieve data from a jsonb column

To retrieve data from a jsonb column, use the `->` or `->>` operators to access the JSON object's properties. The `->` operator returns a jsonb value, while the `->>` operator returns a text value.

### Examples

```sql
SELECT j_data -> 'a', d
FROM x;
```

```sql
SELECT metadata ->> 'color'
FROM y;
```

```sql
SELECT id, name, price, attributes ->> 'color' as color
FROM product;
```


## Casting

Jsonb data types can be cast to other data types such as bool, smallint, int, bigint, decimal, real, and double precision. To cast the other data types to jsonb, you can use the `to_jsonb()` function.

### Examples

```sql
SELECT '{"a": 1, "b": 2}'::jsonb;
-----Result
{"a": 1, "b": 2}
```

```sql
SELECT '{"name": "Alice", "age": 30, "city": "New York"}'::jsonb;
-----Result
{"name": "Alice", "age": 30, "city": "New York"}
```



## Operators

The following operators represent a transformation process involving extraction, casting, and reconversion between jsonb and other data types.

`jsonb -> int -> jsonb` <br />
`jsonb -> varchar -> jsonb` <br />
`jsonb ->> int -> varchar` <br />
`jsonb ->> varchar -> varchar` <br />


## Functions

`jsonb_typeof(jsonb) -> varchar` <br />
`jsonb_array_length(jsonb) -> int`