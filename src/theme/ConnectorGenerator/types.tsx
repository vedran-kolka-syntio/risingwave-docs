import { Face } from "@mui/icons-material";
import {
  TypedField,
  FieldType,
  OneTyped,
  OneSlotFactory,
  OtherComboSlot,
  OtherItemsSlot,
  datetime,
  sleep,
} from "react-declarative";

export const Connectors = [
  "Kafka",
  "Redpanda",
  "Pulsar",
  "Astra Streaming",
  "Kinesis",
  "S3",
  "MySQL CDC",
  "PostgreSQL CDC",
];

export const Sinks = ["Kafka", "JDBC"];

const RowFormat = ["JSON", "Avro", "Protobuf"];

const StartupMode = [
  "Earliest",
  "Latest",
  // "Sequence Number"
];

const SSLSettings = [
  "SSL without SASL",
  "SASL/PLAIN",
  "SASL/SCRAM",
  "SASL/GSSAPI",
  "SASL/OAUTHBEARER",
];

export const KafkaConnector = {
  component: "Form",
  fields: [
    {
      name: "name",
      component: "TextField",
      required: true,
      block: false,
      label: "Source Name",
    },
    {
      name: "topic",
      component: "TextField",
      required: true,
      block: false,
      label: "Topic",
    },
    {
      name: "bootstrapServers",
      component: "TextField",
      required: true,
      fullWidth: true,
      label: "Bootstrap Servers",
    },
    {
      name: "startupMode",
      component: "ChainedSelectField",
      label: "Startup Mode",
      fullWidth: true,
      options: StartupMode,
    },
    {
      name: "startupTimestampOffset",
      component: "TextField",
      fullWidth: true,
      label: "Startup Timestamp Offset",
    },
    {
      name: "rowFormat",
      component: "ChainedSelectField",
      required: true,
      label: "Row Format",
      fullWidth: true,
      options: [
        ...RowFormat,
        { value: "Debezium JSON", label: "Debezium JSON" },
        { value: "Maxwell JSON", label: "Maxwell JSON" },
      ],
    },
    {
      name: "schema",
      fullWidth: true,
      component: "TextField",
      label: "Schema",
    },
    {
      name: "message",
      component: "TextField",
      fullWidth: true,
      label: "Message",
    },
    {
      name: "schemaLocation",
      component: "TextField",
      fullWidth: true,
      label: "Schema Location",
    },
    {
      name: "confluentSchemaRegistryUrl",
      component: "TextField",
      fullWidth: true,
      label: "Confluent Schema Registry URL",
    },
    {
      name: "SSLandSASLSettings",
      fullWidth: true,
      component: "ChainedSelectField",
      label: "SSL and SASL Settings",
      options: SSLSettings,
    },
  ],
};
