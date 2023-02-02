import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

type ConnectionType = "All" | "Source" | "Sinks";

export default function Connection() {
  const [type, setType] = useState<ConnectionType>("All");
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [search, setSearch] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as ConnectionType);
  };

  return (
    <Fragment>
      <Typography variant="body2" gutterBottom my={2}>
        Connectors allow Decodable to talk to messaging systems, databases,
        storage systems, or any other system you control. Connections are
        instances of connectors.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
            <InputLabel id="demo-select-small">Connection Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={type}
              label="Connection Type"
              onChange={handleChange}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Sink"}>Sink</MenuItem>
              <MenuItem value={"Source"}>Source</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
            <TextField
              value={search}
              size="small"
              variant="outlined"
              placeholder="Search Connectors..."
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(event.target.value);
                setShowClearIcon(event.target.value === "" ? "none" : "flex");
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{ display: showClearIcon, cursor: "pointer" }}
                    onClick={() => {
                      setSearch("");
                      setShowClearIcon("none");
                    }}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  );
}
