import React from "react";

// import types
import { FieldParams } from "./types";
import { TextField } from "@mui/material";

const FormikField : React.FC<FieldParams> = ({field, onChange, errorClassName, placeholder, value="", touched=null, error=null, type="text"}: FieldParams) => {
    
    return (
        <TextField
        sx={{fontWeigth: 600}}
                label={placeholder}        
                multiline
                type={type}
                name={field}
                className="texter"
                defaultValue={value}
                onChange={onChange}
                helperText={(touched && error) ? error : ""}
                error={(touched && error) ? true : false}/>
    )
  }; 
  
  export default FormikField;