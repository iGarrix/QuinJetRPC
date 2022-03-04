import React from "react";

// import types
import { countries, FieldParamsCountry } from "./types";
import { Autocomplete, Box, TextField } from "@mui/material";
import { gender } from "../FormikFieldGender/types";

const FormikFieldCountry : React.FC<FieldParamsCountry> = ({field, onChange, placeholder, value="", touched=null, error=null,}: FieldParamsCountry) => {

    return (

      <Autocomplete
      options={countries}
      defaultValue={countries.filter(f => f.label === value)[0]}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
          />
          {option.label} ({option.code}) +{option.phone}
          </Box>
      )}
      renderInput={(params) => (
          <TextField
          {...params}
          type={"text"}
          id={field}
          name={field}
          className="texter"
          onSelect={onChange}
          helperText={(touched && error) ? error : ""}
          label={placeholder}
          error={(touched && error) ? true : false}
          />
      )}
      />
    )
  }; 
  
  export default FormikFieldCountry;