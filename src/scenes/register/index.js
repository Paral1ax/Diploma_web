import React from "react";
import RegisterForm from "../../components/Project/Auth/RegisterForm";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";


const RegForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

            <RegisterForm>

            </RegisterForm>
    )
}

export default RegForm