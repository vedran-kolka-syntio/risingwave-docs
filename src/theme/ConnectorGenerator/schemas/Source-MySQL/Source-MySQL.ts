import { JsonSchema } from "@jsonforms/core";
import { UISchema } from "../store";

export const MySQLSchema: JsonSchema = {
  type: "object",
  properties: {
    host: {
      type: "string",
    },
    port: {
      type: "string",
    },
    username: {
      type: "string",
    },
    password: {
      type: "string",
    },
    databaseName: {
      type: "string",
    },
    tableName: {
      type: "string",
    },
    serverID: {
      type: "string",
    },
    sourceSchema: {
      type: "array",
      items: {
        type: "object",
        properties: {
          columnName: {
            type: "string",
          },
          dataType: {
            type: "string",
          },
          selectAsPrimaryKey: {
            type: "boolean",
          },
        },
      },
    },
  },
  required: ["host", "port", "username", "databaseName", "tableName"],
};

export const MySQLUISchema: UISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/host",
        },
        {
          type: "Control",
          scope: "#/properties/port",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/username",
        },
        {
          type: "Control",
          scope: "#/properties/password",
        },
      ],
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/databaseName",
        },
        {
          type: "Control",
          scope: "#/properties/tableName",
        },
      ],
    },
    {
      type: "Control",
      scope: "#/properties/serverID",
      options: {
        trim: true,
      },
    },
    {
      type: "VerticalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/sourceSchema",
        },
      ],
    },
  ],
};

export const MySQLInitialData = {
  host: "",
  port: "",
  username: "",
  password: "",
  databaseName: "",
  tableName: "",
  sourceSchema: [
    {
      columnName: "column",
      dataType: "varchar",
      selectAsPrimaryKey: true,
    },
  ],
};
