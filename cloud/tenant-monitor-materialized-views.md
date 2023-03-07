---
id: tenant-monitor-materialized-views
title: Monitor materialized views
description: You can view all materialized views defined in the databases of a tenant.
slug: /tenant-monitor-materialized-views
---

You can view all [materialized views](https://www.risingwave.dev/docs/current/key-concepts/#materialized-views) defined in the databases of a tenant.

1. Go to the [tenant details page](tenant-check-status-and-metrics.md#check-the-detailed-metrics-of-a-tenant).

2. Select the **Materialized Views** tab.
    
3. Click on a materialized view to see the details.

    You can view the direct acyclic graph of streaming executors for maintaining the materialized view. 

    [screenshot]

4. You can click **</\> SQL** to see the query defined in the materialized view (i.e. the `AS` clause).