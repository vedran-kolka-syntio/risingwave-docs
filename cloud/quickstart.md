---
id: quickstart
title: Quickstart
description: Get started with RisingWave Cloud in 5 steps.
slug: /quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="step">

<TabItem value="1" label="1. Sign up and log in">

## Sign up and log in

You can use your email to create an account.

1. [Sign up](https://www.risingwave.cloud/auth/signup/) for RisingWave Cloud.

2. [Log in](https://www.risingwave.cloud/auth/signin/) to your account.

---

Or create an account with a third-party service and log in to it.

We prepared a quickstart wizard for an easy and guided setup after you log in. Or you can continue to read the quickstart guide here for detailed instructions.

</TabItem>

<TabItem value="2" label="2. Create a tenant">

## Create a tenant

A tenant is a dedicated RisingWave cluster with its own set of components, such as compute nodes, frontend nodes, a meta server, and etcd service, along with computing and storage resources. Within a tenant, you can create and manage database users and databases.

<defaultButton text="Create a tenant" url="https://risingwave-cloud.com/tenants/"/>

You can choose to create a free tenant or a customizable tenant if you have an invitation code.

See [Choose a tenant plan](https://www.notion.so/Choose-a-tenant-plan-55b61d41701d475aa811fbbe78a14b7e) for details on how to choose a tenant plan and configure the resources.

</TabItem>

<TabItem value="3" label="3. Connect to your tenant">

## Connect to your tenant

After getting a tenant up and running, you need to connect to it so that you can interact with RisingWave.

You can choose from the following two ways to connect to your tenant.

<Tabs>

<TabItem value="console" label="Console">

The console is the most intuitive and easy way to connect to and interact with RisingWave, offering graphical tools for managing data and visualizing results.


To connect via the console:


1. Click **Console** in the top right corner.  

2. Create a new database user.

3. Log in to the database as the database user you just created.

</TabItem>
 
<TabItem value="terminal" label="Terminal">

For terminal enthusiasts, you can still connect to a tenant through your local terminal.

1. [Install `psql` in your environment](https://www.risingwave.dev/docs/current/install-psql-without-postgresql/).

    `psql` is a command-line interface for interacting with PostgreSQL databases, including RisingWave.

2. Select the **Tenants** tab.
    
    
    
3. Click **Connect.**
    
    
    
4. Create a new database user.
    
    
    
5. Copy the connection string and run it in a terminal window.
    
    
    
6. Log in with the password of the database user.

</TabItem>

</Tabs>

</TabItem>

<TabItem value="4" label="4. Explore RisingWave with examples">

## Explore RisingWave with examples

You can kickstart your journey with RisingWave by exploring the following resources.

### RisingWave SQL 101

A beginner's guide to data processing with RisingWave. Discover the most typical and distinctive SQL features of RisingWave on one page. No previous experience with PostgreSQL is required.

<defaultButton text="RisingWave SQL 101" url="https://www.risingwave.dev/docs/current/risingwave-sql-101/"/>


### Example queries

You can easily access the demos available in the console. These demos cover the most common steps in stream processing, such as establishing a connection with a data source, processing data by defining materialized views, and querying the results.


**Note:**

The data sources used in the demos are available in region `us-east-2` only. You cannot access the data sources if you select another region when creating the tenant. Create a new tenant in the `us-east-2` region to access the demo data.

### [TBD] Use cases

A series of guided tours in solving real-world stream processing tasks with simulated data. We are constantly adding new use cases and tutorials.


<defaultButton text="[Link to use cases]" url="https://www.risingwave.dev/docs/current/tutorial/"/>

</TabItem>

<TabItem value="5" label="5. Ingest, process, and deliver data">

## Ingest, process, and deliver data

Congrats, you are now ready to unleash the full potential of RisingWave on your own. Please check out the RisingWave documentation for detailed references.

</TabItem>

</Tabs>