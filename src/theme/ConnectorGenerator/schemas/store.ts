import {
  ComposableCondition,
  JsonSchema,
  LeafCondition,
  Rule,
  SchemaBasedCondition,
  UISchemaElement,
} from "@jsonforms/core";
import {
  kafkaSchema,
  kafkaUISchema,
  kafkaInitialdata,
} from "./Source-Kafka/Source-Kafka";
import {
  pulsarSchema,
  pulsarUISchema,
  pulsarInitialData,
} from "./Source-Pulsar/Source-Pulsar";
import {
  kinesisInitialData,
  kinesisSchema,
  kinesisUISchema,
} from "./Source-Kinesis/Source-Kinesis";
import { S3InitialData, S3Schema, S3UISchema } from "./Source-S3/Source-S3";

type Element = {
  type: string;
  rule?: Rule & {
    condition?: LeafCondition | SchemaBasedCondition | ComposableCondition;
  };
  scope?: string;
  label?: string;
  options?: {
    [key: string]: any;
  };
  elements?: Element[];
};

export type UISchema = UISchemaElement & {
  elements: Element[];
};

type InitialData = {
  [key: string]: string;
};

export const mapToSchema = new Map<string, JsonSchema>();
export const mapToUISchema = new Map<string, UISchemaElement>();
export const mapToInitialdata = new Map<string, InitialData>();

mapToSchema.set("Source-Kafka", kafkaSchema);
mapToUISchema.set("Source-Kafka", kafkaUISchema);
mapToInitialdata.set("Source-Kafka", kafkaInitialdata);
mapToSchema.set("Source-Redpanda", kafkaSchema);
mapToUISchema.set("Source-Redpanda", kafkaUISchema);
mapToInitialdata.set("Source-Redpanda", kafkaInitialdata);
mapToSchema.set("Source-Pulsar", pulsarSchema);
mapToUISchema.set("Source-Pulsar", pulsarUISchema);
mapToInitialdata.set("Source-Pulsar", pulsarInitialData);
mapToSchema.set("Source-Astra Streaming", pulsarSchema);
mapToUISchema.set("Source-Astra Streaming", pulsarUISchema);
mapToInitialdata.set("Source-Astra Streaming", pulsarInitialData);
mapToSchema.set("Source-Kinesis", kinesisSchema);
mapToUISchema.set("Source-Kinesis", kinesisUISchema);
mapToInitialdata.set("Source-Kinesis", kinesisInitialData);
mapToSchema.set("Source-S3", S3Schema);
mapToUISchema.set("Source-S3", S3UISchema);
mapToInitialdata.set("Source-S3", S3InitialData);
