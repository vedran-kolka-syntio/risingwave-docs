import {
  ComposableCondition,
  JsonSchema,
  LeafCondition,
  Rule,
  SchemaBasedCondition,
  UISchemaElement,
} from "@jsonforms/core";
import { kafkaSchema, kafkaUISchema } from "./Source-Kafka/Source-Kafka";

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

export const mapToSchema = new Map<string, JsonSchema>();
export const mapToUISchema = new Map<string, UISchemaElement>();

mapToSchema.set("Source-Kafka", kafkaSchema);
mapToUISchema.set("Source-Kafka", kafkaUISchema);
