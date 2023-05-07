import React from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { useField } from "formik";
import { TextField } from "@mui/material";


const TextfieldWrapper = ({
    name,
    ...other
}) => {
    const[field, mata] = useField(name);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const config = {
        ...field,
        ...other,
        fullWidth: true,
        variant: 'outlined',
    };

    if (mata && mata.touched && mata.error) {
        console.log("текущее значение =" +field.value)
        config.error = true;
        config.helperText = mata.error;
    }

    return(
        <TextField {...config} />
    );
};

export default TextfieldWrapper;