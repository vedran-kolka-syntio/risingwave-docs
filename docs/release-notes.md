---
id: release-notes
title: Release notes
description: New features and important bug fixes in each release of RisingWave.
slug: /release-notes
---

## Deploy a RisingWave instance

Select an object storage service for data persistence.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="storage_selection">
<TabItem value="minio" label="etcd+MinIO" default>

RisingWave supports using MinIO as the object storage.

Run the following command to deploy a RisingWave instance with MinIO as the object storage.

```
kubectl apply -f https://raw.githubusercontent.com/risingwavelabs/risingwave-operator/main/examples/risingwave/risingwave-etcd-minio.yaml
```

</TabItem>
<TabItem value="s3" label="etcd+S3">

RisingWave supports using Amazon S3 as the object storage.

**Steps:**

1. Create a Secret with the name ‘s3-credentials’ by running the following command.

    ```
    kubectl create secret generic s3-credentials —from-literal AccessKeyID=${ACCESS_KEY} —from-literal SecretAccessKey=${SECRET_ACCESS_KEY} —from-literal Region=${AWS_REGION}
    ```

1. On the S3 console, [create a bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) with the name ‘hummock001’.

1. Deploy a RisingWave instance with S3 as the object storage by running the following command.

    ```
    kubectl apply -f https://raw.githubusercontent.com/risingwavelabs/risingwave-operator/main/examples/risingwave/risingwave-etcd-s3.yaml
    ```

</TabItem>
</Tabs>


## Connect to RisingWave

<Tabs>
<TabItem value="clusterip" label="ClusterIP" default>

By default, the Operator creates a service for the frontend component, through which you can interact with RisingWave, with the type of `ClusterIP`. But it is not accessible outside Kubernetes. Therefore, you need to create a standalone Pod for PostgreSQL inside Kubernetes.

**Steps:**

1. Create a Pod by running the following command.

    ```
    kubectl apply -f examples/psql/psql-console.yaml
    ```

1. Attach to the Pod by running the following command so that you can execute commands inside the container.

    ```
    kubectl exec -it psql-console bash
    ```

1. Connect to RisingWave via psql by running the following command.
<div style={{marginLeft:"2rem"}}>
<Tabs groupId="storage_selection">
<TabItem value="minio" label="etcd+MinIO" default>

    ```
    psql -h risingwave-etcd-minio-frontend -p 4567 -d dev -U root
    ```

</TabItem>
<TabItem value="s3" label="etcd+S3">

    ```
    psql -h risingwave-etcd-s3-frontend -p 4567 -d dev -U root
    ```

</TabItem>
</Tabs>
</div>


</TabItem>
<TabItem value="nodeport" label="NodePort" >


You can connect to RisingWave from Nodes such as EC2 in Kubernetes

**Steps:**

1. Set the Service type to `NodePort`.

    ```
    # ...
    spec:
      global:
        serviceType: NodePort
    # ...
    ```

1. Connect to RisingWave by running the following commands on the Node.


</TabItem>
<TabItem value="loadbalancer" label="LoadBalancer">

If you are using EKS, GCP, or other managed Kubernetes services provided by cloud vendors, you can expose the Service to the public network with a load balancer in the cloud. 

**Steps:**

1. Set the Service type to `LoadBalancer`.

    ```
    # ...
    spec:
      global:
        serviceType: LoadBalancer
    # ...
    ```

1. Connect to RisingWave with the following commands.


</TabItem>
</Tabs>

<br />

You can now [connect a streaming source to RisingWave](sql/commands/sql-create-source.md) and [issue SQL queries to manage your data](query-manage-data.md).


