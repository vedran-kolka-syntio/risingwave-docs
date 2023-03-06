---
id: tenant-choose-a-tenant-plan
title: Choose a tenant plan
description: hello
slug: /tenant-choose-a-tenant-plan
---

# Choose a tenant plan

When creating a tenant, you can choose a tenant plan and configure tenant resources according to your needs.

Select the plan below to see the details.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>

<TabItem value="free" label="Free plan">

The free tier plan provides all the necessary resources for you to test and explore all the features of RisingWave Cloud — at no cost.

[screenshot]

:::note
Tenants created under the free tier plan will expire after five days. Do not choose this plan for production.
:::

#### Configuration

- **Tenant name**

    Name of the tenant. Assigning a descriptive name to each tenant can be helpful when managing multiple tenants.

- **Region**

    Regions are isolated from each other. We’ve set up a demo data source in `us-east-2`. Select `us-east-2` if you’d like to try our demo queries.

</TabItem>

<TabItem value="customized" label="Customized plan">

If you signed up for early access and received an invitation code, you can select the **Customized plan for invited users**.

Please talk to our sales at [https://www.risingwave-labs.com/contact/](https://www.risingwave-labs.com/contact/) to get your invitation code. 

Redeem your invitation code to continue.

[screenshot]

The customized plan offers the flexibility of configuring the resources to better suit your demand.

#### Configuration

- **Tenant name**

    Name of the tenant. Assigning a descriptive name to each tenant can be helpful when managing multiple tenants.

- **Region**

    Regions are isolated from each other. We’ve set up a demo data source in `us-east-2`. Select `us-east-2` if you’d like to try our demo queries.

- **Configure nodes**

    Configure the instance resources and numbers of each node according to your actual needs.
    - Compute node —
    - Frontend node —
    - Meta node —
    - Compactor node —
    - ETCD —

</TabItem>

</Tabs>