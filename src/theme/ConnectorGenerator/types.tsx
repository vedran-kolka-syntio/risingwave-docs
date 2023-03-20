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

const RowFormat = [
  { value: "JSON", label: "JSON" },
  { value: "Avro", label: "Avro" },
  { value: "Protobuf", label: "Protobuf" },
];

const StartupMode = [
  { value: "Earliest", label: "Earliest" },
  { value: "Latest", label: "Latest" },
  // { value: "Sequence Number", label: "Sequence Number" },
];

const SSLSettings = [
  { value: "SSL without SASL", label: "SSL without SASL" },
  { value: "SASL/PLAIN", label: "SASL/PLAIN" },
  { value: "SASL/SCRAM", label: "SASL/SCRAM" },
  { value: "SASL/GSSAPI", label: "SASL/GSSAPI" },
  { value: "SASL/OAUTHBEARER", label: "SASL/OAUTHBEARER" },
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
