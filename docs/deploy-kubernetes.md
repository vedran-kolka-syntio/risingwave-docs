---
id: deploy-kubernetes
title: Deploy a RisingWave cluster in Kubernetes
description: Deploy a RisingWave cluster in Kubernetes with the Kubernetes Operator for RisingWave.
slug: /deploy-kubernetes
---

You can use the [Kubernetes Operator for RisingWave](https://github.com/risingwavelabs/risingwave-operator) (hereinafter ‘the Operator’) to deploy a RisingWave cluster in Kubernetes.

The Operator is a deployment and management system for RisingWave. It runs on top of Kubernetes and provides functionalities like provisioning, upgrading, scaling, and destroying the RisingWave instances inside the cluster. 

## Prerequisites

* Install kubectl
    
    kubectl is a Kubernetes command-line tool for deploying and managing applications on Kubernetes.

    Ensure that kubectl is installed in your environment. See [Install and Set Up kubectl](http://pwittrock.github.io/docs/tasks/tools/install-kubectl/) for instructions.

* Install psql

    Ensure that the PostgreSQL interactive terminal [psql](https://www.postgresql.org/docs/current/app-psql.html) is installed in your environment. See [PostgreSQL Downloads](https://www.postgresql.org/download/) for instructions.

* Install and run Docker Desktop
    
    Ensure that [Docker Desktop](https://www.docker.com/products/docker-desktop/) is installed in your environment and running. See [Get Docker](https://docs.docker.com/get-docker/) for instructions.



## Create a Kubernetes cluster

Before deployment, ensure that the following requirements are satisfied.

* [Docker](https://docs.docker.com/install/) version ≥ 18.09
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) version ≥ 1.12
* [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) version ≥ 0.8.0
* For Linux, set the value of the sysctl parameter [net.ipv4.ip_forward](https://linuxconfig.org/how-to-turn-on-off-ip-forwarding-in-linux) to 1.

Follow the steps to create a Kubernetes cluster.

1. Install kind.

    [kind](https://kind.sigs.k8s.io/) is a tool for running local Kubernetes clusters using Docker containers as cluster nodes. 

    See [kind Installation](https://kind.sigs.k8s.io/docs/user/quick-start#installation) for instructions. You can see the available tags of kind on [Docker Hub](https://hub.docker.com/r/kindest/node/tags).

1. Create a cluster by running the following command.

    ```
    kind create cluster
    ```

1. ***(Optional)*** Check if the cluster is created successfully by running the following command.

    ```
    kubectl cluster-info
    ```

## Deploy the Operator

1. Install [cert-manager](https://cert-manager.io/docs/installation/).

1. Install the Operator by running the following command.
    ```
    kubectl apply -f https://github.com/risingwavelabs/risingwave-operator/releases/latest/download/risingwave-operator.yaml
    ```

1. ***(Optional)*** Check if the Pods are running by running the following commands.

    ```
    kubectl -n cert-manager get pods
    kubectl -n risingwave-operator-system get pods
    ```

## Deploy a RisingWave instance

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="storage_selection">
<TabItem value="minio" label="etcd+MinIO" default>

RisingWave supports using MinIO as the object storage.

Deploy a RisingWave instance with MinIO as the object storage by running the following command.

```
kubectl apply -f https://raw.githubusercontent.com/risingwavelabs/risingwave-operator/main/examples/risingwave/risingwave-etcd-minio.yaml
```

</TabItem>
<TabItem value="s3" label="etcd+S3" default>

RisingWave supports using Amazon S3 as the object storage.

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


You can check the status of the RisingWave instance by running the following command.

```
kubectl get risingwave
```

If the instance is running properly, the output should look like this:

<Tabs groupId="storage_selection">
<TabItem value="minio" label="etcd+MinIO" default>

```
NAME                    RUNNING   STORAGE(META)   STORAGE(OBJECT)   AGE
risingwave-etcd-minio   True      etcd            MinIO             30s
```

</TabItem>
<TabItem value="s3" label="etcd+S3" default>

```
NAME                    RUNNING   STORAGE(META)   STORAGE(OBJECT)   AGE
risingwave-etcd-s3      True      etcd            S3                30s
```

</TabItem>
</Tabs>


## Connect to RisingWave

<Tabs>
<TabItem value="clusterip" label="ClusterIP" default>

By default, the Operator creates a service for the frontend component, through which you can interact with RisingWave, with the type of `ClusterIP`. But it is not accessible outside Kubernetes. Therefore, you need to create a standalone Pod for PostgreSQL inside Kubernetes.

1. Create a Pod by running the following command.

    ```
    kubectl apply -f examples/psql/psql-console.yaml
    ```

1. Attach to the Pod by running the following command so that you can execute commands inside the container.

    ```
    kubectl exec -it psql-console bash
    ```

1. Connect to RisingWave via psql by running the following command.

    ```
    psql -h risingwave-etcd-s3/minio-frontend -p 4567 -d dev -U root
    ```

</TabItem>
<TabItem value="nodeport" label="NodePort" default>

You can connect to RisingWave from Nodes such as EC2 in Kubernetes

1. Set the Service type to `NodePort`.

    ```
    # ...
    spec:
      global:
        serviceType: NodePort
    # ...
    ```

1. Connect to RisingWave by running the following commands on the Node.

    ```
    export RISINGWAVE_NAME=risingwave-etcd-s3/minio
    export RISINGWAVE_NAMESPACE=default
    export RISINGWAVE_HOST=`kubectl -n ${RISINGWAVE_NAMESPACE} get node -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}'`
    export RISINGWAVE_PORT=`kubectl -n ${RISINGWAVE_NAMESPACE} get svc -l risingwave/name=${RISINGWAVE_NAME},risingwave/component=frontend -o jsonpath='{.items[0].spec.ports[0].nodePort}'`

    psql -h ${RISINGWAVE_HOST} -p ${RISINGWAVE_PORT} -d dev -U root
    ```

</TabItem>
<TabItem value="loadbalancer" label="LoadBalancer" default>

If you are using EKS, GCP, or other managed Kubernetes services provided by cloud vendors, you can expose the Service to the public network with a load balancer in the cloud. 

1. Set the Service type to `LoadBalancer`.

    ```
    # ...
    spec:
      global:
        serviceType: LoadBalancer
    # ...
    ```

1. Connect to RisingWave with the following commands.

    ```
    export RISINGWAVE_NAME=risingwave-etcd-s3/minio
    export RISINGWAVE_NAMESPACE=default
    export RISINGWAVE_HOST=`kubectl -n ${RISINGWAVE_NAMESPACE} get svc -l risingwave/name=${RISINGWAVE_NAME},risingwave/component=frontend -o jsonpath='{.items[0].status.loadBalancer.ingress[0].ip}'`
    export RISINGWAVE_PORT=`kubectl -n ${RISINGWAVE_NAMESPACE} get svc -l risingwave/name=${RISINGWAVE_NAME},risingwave/component=frontend -o jsonpath='{.items[0].spec.ports[0].port}'`

    psql -h ${RISINGWAVE_HOST} -p ${RISINGWAVE_PORT} -d dev -U root
    ```


</TabItem>
</Tabs>

    
You can now [connect a streaming source to RisingWave](sql/commands/sql-create-source.md) and [issue SQL queries to manage your data](query-manage-data.md).


