import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import PublicIcon from "@mui/icons-material/Public";
import { HolidayAPI } from "../../../../HolidayAPI/HolidayAPI";
export default function LocationInput({
  countries,
  country,
  setCountry,
  region,
  setRegion,
}) {
  const [regionActive, setRegionActive] = useState(false);

  const handleCountry = (event, newCountry) => {
    setCountry(newCountry);
    setRegion(null);
    // show the region input only if a location is selected and it has subdivisions
    setRegionActive(Boolean(newCountry));
  };

  const handleRegion = (event, newRegion) => {
    setRegion(newRegion);
  };

  return (
    <div className="Location">
      <div className="LocationHeader">
        <PublicIcon />
        Location
      </div>
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        disableClearable
        value={country}
        options={countries}
        onChange={handleCountry}
        autoHighlight
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose your country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
              type: "search",
            }}
          />
        )}
      />
      {country && country.subdivisions.length > 0 && (
        <Autocomplete
          id="region-select"
          sx={{ width: 300 }}
          value={region}
          options={country.subdivisions}
          onChange={handleRegion}
          autoHighlight
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose your region"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
    </div>
  );
}
