import React from "react";
import { TextField } from "@mui/material";


const TextfieldWrapper = ({
    ...other
}) => {


    const config = {
        ...other,
        fullWidth: true,
        variant: 'outlined',
    };
    return(
        <TextField {...config} />
    );
};

export default TextfieldWrapper;