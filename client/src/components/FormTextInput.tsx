import React from "react";
import { Control, Controller, FieldPath } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormInput } from "../domain/types";

interface FormInputProps<T> {
    name: FieldPath<T>
    label: string
    control: Control<T, object>
    [prop: string]: unknown
}

export const FormInputText: React.FC<FormInputProps<FormInput>> = ({ name, control, label, ...props }) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={''}
        render={({
          field: { onChange, value },
          fieldState: { error },
        }) => (
          <TextField
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={onChange}
            autoComplete="off"
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            {...props}
          />
        )}
      />
    );
  };