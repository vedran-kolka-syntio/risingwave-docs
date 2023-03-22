import React, { useState, Fragment, useEffect, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import CodeBlock from "@theme/CodeBlock";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useColorMode } from "@docusaurus/theme-common";

import sleep from "../../utils/sleep";
import styles from "./styles.module.css";
import { Connectors, Sinks } from "./types";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";

import { kafkaInitialdata } from "./schemas/Source-Kafka/Source-Kafka";
import { mapToInitialdata, mapToSchema, mapToUISchema } from "./schemas/store";

type ConnectorType = "Source" | "Sink";

type SourceData = {
  name?: string;
  topic?: string;
  bootstrapServers?: string;
  scanStartupMode?: string;
  startupTimestampOffset?: string;
  [key: string]: string;
};

type Props = {};
export const ConnectorGenerator = ({}: Props) => {
  const [loading, setLoading] = useState(false);
  const [connector, setConnectoer] = useState("Kafka");
  const [data, setData] = useState<SourceData>(kafkaInitialdata);
  const [connectorType, setConnectorType] = useState<ConnectorType>("Source");

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConnectorType((event.target as HTMLInputElement).value as ConnectorType);
  };

  const handleConnectorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConnectoer((event.target as HTMLInputElement).value);
  };

  useEffect(() => {
    setData(mapToInitialdata.get(`${connectorType}-${connector}`));
  }, [connector, connectorType]);

  useEffect(() => {
    setConnectoer("Kafka");
  }, [connectorType]);

  const { colorMode } = useColorMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box className={styles.mainContainer}>
        <FormControl className={styles.formContainer}>
          <FormLabel
            id="demo-controlled-radio-buttons-group"
            className={styles.labelText}
          >
            Connector type:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={connectorType}
            onChange={handleTypeChange}
          >
            <FormControlLabel
              value="Source"
              control={<Radio />}
              label="Source"
              className={styles.radioLabel}
            />
            <FormControlLabel
              value="Sink"
              control={<Radio />}
              label="Sink"
              className={styles.radioLabel}
            />
          </RadioGroup>
        </FormControl>
        <Divider light sx={{ marginTop: "1rem" }} />
        <Typography variant="h5" gutterBottom className={styles.header}>
          {connectorType === "Source" ? "Create source" : "Create sink"}
        </Typography>

        <FormControl
          variant="standard"
          sx={{ mt: 1.5, minWidth: 350 }}
          fullWidth
        >
          <Stack sx={{ width: "50%" }} mb={1}>
            <InputLabel id="demo-simple-select-standard-label">
              Select connector
            </InputLabel>
            <Select
              fullWidth
              className={styles.selectConnector}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={connector}
              onChange={handleConnectorChange}
              label="Connector"
            >
              {connectorType === "Source"
                ? Connectors?.map((conn, idx) => (
                    <MenuItem value={conn} key={idx}>
                      {conn}
                    </MenuItem>
                  ))
                : Sinks?.map((conn, idx) => (
                    <MenuItem value={conn} key={idx}>
                      {conn}
                    </MenuItem>
                  ))}
            </Select>
          </Stack>

          {mapToSchema.get(`${connectorType}-${connector}`) && (
            <div className="jsonForms">
              <JsonForms
                key={`${connectorType}-${connector}`}
                schema={mapToSchema.get(`${connectorType}-${connector}`)}
                uischema={mapToUISchema.get(`${connectorType}-${connector}`)}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => setData(data)}
              />
            </div>
          )}
        </FormControl>
        <Stack flexDirection="row" justifyContent="end" my={2}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<RocketLaunchIcon />}
            variant="contained"
            onClick={() => {
              setLoading(true);
              sleep(1000).then(() => {
                setLoading(false);
              });
            }}
          >
            Generate SQL statement
          </LoadingButton>
        </Stack>
        <CodeBlock language="sql">
          {`CREATE ${connectorType.toUpperCase()} IF NOT EXISTS ${
            data?.sourceName || `${connectorType.toLowerCase()}_name`
          } 
WITH (
  connector='${connector.toLowerCase()}',  
  topic='${data?.topic || "demo_topic"}', 
  properties.bootstrap.server='${
    data?.bootstrapServers || "172.10.1.1:9090,172.10.1.2:9090"
  }', 
  scan.startup.mode='${data?.scanStartupMode || "earliest"}', 
  scan.startup.timestamp_millis='${
    data?.startupTimestampOffset || "140000000"
  }', 
  properties.group.id='demo_consumer_name' 
) 
ROW FORMAT ${data?.rowFormat || "JSON"} ${
            data?.message ? "MESAAGE '" + data?.message + "'" : ""
          }
ROW SCHEMA LOCATION CONFLUENT
SCHEMA REGISTRY 'http://127.0.0.1:8081';`}
        </CodeBlock>
      </Box>
    </ThemeProvider>
  );
};

export default ConnectorGenerator;
