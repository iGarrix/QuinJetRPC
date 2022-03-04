import React from "react";

// import types
import { gender, FieldParamsGender } from "./types";
import { Autocomplete, Box, TextField } from "@mui/material";

const FormikFieldGender : React.FC<FieldParamsGender> = ({field, onChange, placeholder, value, touched=null, error=null,}: FieldParamsGender) => {

    return (

        <Autocomplete
        
        options={gender}
        defaultValue={value}
        renderInput={(params) => <TextField {...params} 
        type={"text"}
          id={field}
          name={field}
          className="texter"
          onSelect={onChange}
          helperText={(touched && error) ? error : ""}
          label={placeholder}
          error={(touched && error) ? true : false}
        />}
      />
    )
  }; 
  
  export default FormikFieldGender;