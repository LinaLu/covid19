import { FormControlLabel, Checkbox } from "@mui/material";
import React from "react";

import { Control, Controller, FieldPath } from "react-hook-form";
import { FormInput } from "../domain/types";

interface FormInputProps<T> {
    name: FieldPath<T>
    label?: string
    control: Control<T, object>
}

export const FormInputCheckbox: React.FC<FormInputProps<FormInput>> = ({ name, control, label }) => {

  return <Controller
      name={name}
      control={control}
      render={({field: { onChange, value }}) => (        
        <FormControlLabel                    
          control={<Checkbox defaultChecked={false} onChange={onChange} />}
          label={label}
        />        
      )}
    />
};