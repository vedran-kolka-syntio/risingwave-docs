import { JsonSchema } from "@jsonforms/core";
import { UISchema } from "../store";

const StartupMode = ["Earliest", "Latest"];
const RowFormat = ["JSON", "Avro", "Protobuf", "Debezium JSON", "Maxwell JSON"];

export const pulsarSchema: JsonSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    topic: {
      type: "string",
    },
    serviceURL: {
      type: "string",
    },
    adminURL: {
      type: "string",
    },
    startupMode: {
      type: "string",
      enum: StartupMode,
    },
    startupTimestampOffset: {
      type: "string",
    },
    rowFormat: {
      type: "string",
      enum: RowFormat,
    },
    message: {
      type: "string",
    },
    schemaLocation: {
      type: "string",
    },
  },
  required: ["name", "topic", "serviceURL", "adminURL"],
};

export const pulsarUISchema: UISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/name",
        },
        {
          type: "Control",
          scope: "#/properties/topic",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/serviceURL",
        },
        {
          type: "Control",
          scope: "#/properties/adminURL",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/startupMode",
        },
        {
          type: "Control",
          scope: "#/properties/startupTimestampOffset",
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/rowFormat",
      options: {
        trim: true,
      },
    },
    {
      type: "Control",
      scope: "#/properties/message",
    },
    {
      type: "Control",
      scope: "#/properties/schemaLocation",
    },
  ],
};

export const pulsarInitialData = {
  name: "",
  topic: "",
  serviceURL: "",
  adminURL: "",
  startupMode: StartupMode[0],
  startupTimestampOffset: "",
  rowFormat: RowFormat[0],
};
