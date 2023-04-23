import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const DateTimePicker = ({
    name,
    ...props
}) => {
  const[field, meta] = useField(name)

  const config = {
    ...field,
    ...props,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
        shrink: true
    },
    InputProps: {
        sx: {
          "& .MuiSvgIcon-root": { color: "blue" }
        }
    }
  }

  if (meta && meta.touched && meta.error) {
    config.error = true;
    config.helperText = meta.error;
  }
    return (
        <TextField {...config}>
        </TextField>
    );
};

export default DateTimePicker;