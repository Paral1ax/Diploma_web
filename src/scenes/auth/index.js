import React from "react";
import AuthorizeForm from "../../components/Project/Auth/AuthForm";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";


const AuthForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  

    return (
        <Box>
            <AuthorizeForm>

            </AuthorizeForm>
        </Box>
    )
}

export default AuthForm