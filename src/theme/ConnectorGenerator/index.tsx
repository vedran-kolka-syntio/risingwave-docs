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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Component from "mson-react/lib/component";
import { Connectors, KafkaConnector, Sinks } from "./types";

type ConnectorType = "Source" | "Sink";

type Props = {};

function ConnectorGenerator({}: Props) {
  const [connectorType, setConnectorType] = useState<ConnectorType>("Source");
  const [connector, setConnectoer] = useState("Kafka");

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConnectorType((event.target as HTMLInputElement).value as ConnectorType);
  };

  const handleConnectorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConnectoer((event.target as HTMLInputElement).value);
  };

  return (
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

      <FormControl variant="standard" sx={{ mt: 1.5, minWidth: 350 }} fullWidth>
        <InputLabel id="demo-simple-select-standard-label">
          Select connector
        </InputLabel>
        <Select
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
        {connector === "Kafka" && connectorType === "Source" && (
          <Component
            className={styles.kafkaConnector}
            definition={KafkaConnector}
            onSubmit={({ component }) => {
              alert(JSON.stringify(component.getValues()));
            }}
          />
        )}
      </FormControl>
    </Box>
  );
}

export default ConnectorGenerator;
