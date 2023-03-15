type RowFormat = "JSON" | "Avro" | "Protobuf" | "Debezium JSON" | "Maxwell JSON";
type StartupMode = "Earliest" | "Latest";

type Connector = {
  name: string;
  topic: string;
  bootstrap_server: string;
  scan_startup_mode?: StartupMode;
  startup_timestamp_offset: string;
  row_format: RowFormat;
  // schema:
  message?: string;
  schema_location?: string;
};
