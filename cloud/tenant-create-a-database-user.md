---
id: tenant-create-a-database-user
title: Create a database user
description: Create a database user in a tenant.
slug: /tenant-create-a-database-user
---


Choose one of the following to create a [database user](tenant-manage-database-users.md).

- You can create a database user when connecting to a tenant.

    See [Connect to a tenant](tenant-connect-to-a-tenant.md) for detailed instructions.

- You can click **Create user** in the **Database User** tab on the [tenant details page](tenant-check-status-and-metrics.md#check-the-detailed-metrics-of-a-tenant) to create a new user.
    
    [screenshot]

- You can run the [CREATE USER](https://www.risingwave.dev/docs/current/sql-create-user/) command to create a new user after [connecting to a tenant](tenant-connect-to-a-tenant.md) using the console or terminal.

    Ensure that you have logged in to the tenant with a user that has the CREATEUSER privilege. All users created in the Beta version of RisingWave Cloud have this privilege.
