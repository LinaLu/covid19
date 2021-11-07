import React from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller, FieldPath } from "react-hook-form";
import { FormInput, GenderOptions } from "../domain/types";

interface RadioGroupInputProps<T> extends FormInputProps<T> {
    options: GenderOptions
}

interface FormInputProps<T> {
    name: FieldPath<T>
    label: string
    control: Control<T, object>
}

export const FormInputRadio: React.FC<RadioGroupInputProps<FormInput>> = ({ name, control, options }) => {

  const generateRadioOptions = () => { 
    return options.map((option) => (
      <FormControlLabel        
        key={option.value}
        value={option.value}
        label={option.label}
        control={<Radio />}
      />
    ));
  };  

  return <Controller
      name={name}
      control={control}
      defaultValue={options[0].value}
      render={({field: { onChange, value },fieldState: { error }}) => (
        <RadioGroup row value={value} onChange={onChange}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
};