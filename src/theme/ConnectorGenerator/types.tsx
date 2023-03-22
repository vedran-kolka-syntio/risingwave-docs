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

// const kafka = [
//   {
//     type: FieldType.Group,
//     fields: [
//       {
//         type: FieldType.Text,
//         title: "Source Name *",
//         name: "sourceName",
//         columns: "6",
//         isInvalid({ sourceName }) {
//           if (sourceName === "") {
//             return "Required";
//           }
//           return null;
//         },
//       },
//       {
//         type: FieldType.Text,
//         title: "Topic",
//         name: "topic",
//         columns: "6",
//       },
//       {
//         type: FieldType.Text,
//         title: "Bootstrap Servers",
//         name: "bootstrapServers",
//         columns: "6",
//       },
//       {
//         type: FieldType.Group,
//         fields: [
//           {
//             type: FieldType.Combo,
//             title: "Startup mode",
//             name: "startupMode",
//             columns: "6",
//             async itemList() {
//               await sleep(sleepTime);
//               return StartupMode;
//             },
//             async tr(current) {
//               await sleep(transTime);
//               if (StartupMode.includes(current)) {
//                 return current;
//               } else {
//                 return "";
//               }
//             },
//             defaultValue: StartupMode[0],
//           },
//           {
//             type: FieldType.Text,
//             title: "Startup Timestamp Offset",
//             name: "startupTimestampOffset",
//             columns: "6",
//           },
//           {
//             type: FieldType.Combo,
//             title: "Row Format",
//             name: "rowFormat",
//             columns: "6",
//             async itemList() {
//               await sleep(sleepTime);
//               return RowFormat;
//             },
//             async tr(current) {
//               await sleep(transTime);
//               if (RowFormat.includes(current)) {
//                 return current;
//               } else {
//                 return "";
//               }
//             },
//             defaultValue: RowFormat[0],
//           },
//         ],
//       },
//       {
//         type: FieldType.Text,
//         title: "Message",
//         name: "message",
//         columns: "6",
//       },
//       {
//         type: FieldType.Typography,
//         placeholder: "Please specify one of the following locations:",
//         name: "locationHint",
//         sx: {
//           color: "#363A40",
//           lineHeight: "24px",
//           marginLeft: "2px",
//         },
//       },
//       {
//         type: FieldType.Group,
//         fields: [
//           {
//             type: FieldType.Text,
//             title: "Schema Location",
//             name: "schemaLocation",
//             columns: "5",
//           },
//           {
//             type: FieldType.Typography,
//             placeholder: "OR",
//             name: "locationHint",
//             columns: "1",
//             sx: {
//               textAlign: "center",
//               margin: "auto",
//             },
//           },
//           {
//             type: FieldType.Text,
//             title: "Confluent schema registry URL",
//             name: "confluentSchemaRegistryURL",
//             columns: "6",
//           },
//         ],
//       },
//       {
//         type: FieldType.Combo,
//         title: "SSL and SASL settings",
//         name: "SSLandSASLSettings",
//         columns: "6",
//         sx: {
//           marginTop: "12px",
//         },
//         async itemList() {
//           await sleep(sleepTime);
//           return SSLSettings;
//         },
//         async tr(current) {
//           await sleep(transTime);
//           if (SSLSettings.includes(current)) {
//             return current;
//           } else {
//             return "";
//           }
//         },
//         defaultValue: SSLSettings[0],
//       },
//     ],
//   },
// ];

// const pulsar = [
//   {
//     type: FieldType.Group,
//     fields: [
//       {
//         type: FieldType.Text,
//         title: "Source Name *",
//         name: "sourceName",
//         columns: "6",
//         isInvalid({ sourceName }) {
//           if (sourceName === "") {
//             return "Required";
//           }
//           return null;
//         },
//       },
//       {
//         type: FieldType.Text,
//         title: "Topic",
//         name: "topic",
//         columns: "6",
//       },
//       {
//         type: FieldType.Text,
//         title: "Bootstrap Servers",
//         name: "bootstrapServers",
//         columns: "6",
//       },
//       {
//         type: FieldType.Group,
//         fields: [
//           {
//             type: FieldType.Combo,
//             title: "Startup mode",
//             name: "startupMode",
//             columns: "6",
//             async itemList() {
//               await sleep(sleepTime);
//               return StartupMode;
//             },
//             async tr(current) {
//               await sleep(transTime);
//               if (StartupMode.includes(current)) {
//                 return current;
//               } else {
//                 return "";
//               }
//             },
//             defaultValue: StartupMode[0],
//           },
//           {
//             type: FieldType.Text,
//             title: "Startup Timestamp Offset",
//             name: "startupTimestampOffset",
//             columns: "6",
//           },
//           {
//             type: FieldType.Combo,
//             title: "Row Format",
//             name: "rowFormat",
//             columns: "6",
//             async itemList() {
//               await sleep(sleepTime);
//               return RowFormat;
//             },
//             async tr(current) {
//               await sleep(transTime);
//               if (RowFormat.includes(current)) {
//                 return current;
//               } else {
//                 return "";
//               }
//             },
//             defaultValue: RowFormat[0],
//           },
//         ],
//       },
//       {
//         type: FieldType.Text,
//         title: "Message",
//         name: "message",
//         columns: "6",
//       },
//       {
//         type: FieldType.Typography,
//         placeholder: "Please specify one of the following locations:",
//         name: "locationHint",
//         sx: {
//           color: "#363A40",
//           lineHeight: "24px",
//           marginLeft: "2px",
//         },
//       },
//       {
//         type: FieldType.Group,
//         fields: [
//           {
//             type: FieldType.Text,
//             title: "Schema Location",
//             name: "schemaLocation",
//             columns: "5",
//           },
//           {
//             type: FieldType.Typography,
//             placeholder: "OR",
//             name: "locationHint",
//             columns: "1",
//             sx: {
//               textAlign: "center",
//               margin: "auto",
//             },
//           },
//           {
//             type: FieldType.Text,
//             title: "Confluent schema registry URL",
//             name: "confluentSchemaRegistryURL",
//             columns: "6",
//           },
//         ],
//       },
//       {
//         type: FieldType.Combo,
//         title: "SSL and SASL settings",
//         name: "SSLandSASLSettings",
//         columns: "6",
//         sx: {
//           marginTop: "12px",
//         },
//         async itemList() {
//           await sleep(sleepTime);
//           return SSLSettings;
//         },
//         async tr(current) {
//           await sleep(transTime);
//           if (SSLSettings.includes(current)) {
//             return current;
//           } else {
//             return "";
//           }
//         },
//         defaultValue: SSLSettings[0],
//       },
//     ],
//   },
// ];

// export const mapToForm = new Map<string, TypedField<any, null>[]>();

// mapToForm.set("Source-Kafka", kafka);
// mapToForm.set("Source-Redpanda", kafka);
// mapToForm.set("Source-Pulsar", pulsar);
