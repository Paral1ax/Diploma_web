import React, { useState } from "react";
import { Button, Typography, Checkbox } from "@mui/material";
import { Formik, Form } from 'formik';
import { Box, Grid, useTheme, TextField } from "@mui/material";
import { tokens } from "../../../theme";
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";


const AboutMeForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const link = '/authed'

    const [error, SetError] = useState('');

    const { signIn } = UserAuth()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        SetError('');
        try {
            await signIn(userEmail, userPassword)
            console.log('login success')

            navigate("/authed/dashboard");
        } catch (e) {
            SetError(e.message)
            console.log(e.message)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 15,
                    pl: 3,
                    pr: 3,
                    pt: 2,
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: colors.primary[400],
                    borderRadius: '16px',
                    border: '1px solid black'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: colors.greenAccent[400] }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextfieldWrapper
                                name='name'
                                label='Input your name'
                                color='secondary'>

                            </TextfieldWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextfieldWrapper
                                name='lastName'
                                label='Input your surname'
                                color='secondary'>
                            </TextfieldWrapper>
                        </Grid>
                        <Grid item xs={12}>
                            <SelectWrapper
                                name="mainPlatform"
                                label="Choose your main platform"
                                options={mockPlatform}
                                color="secondary"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextfieldWrapper
                                sx={{ mt: 1 }}
                                name='Describe yourself'
                                label='Input your email address'
                                color='secondary'
                            >

                            </TextfieldWrapper>
                        </Grid>
                        <Grid item xs={12} mb={1}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="secondary" />}
                                label="I accept privacy policy"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="secondary"
                    >
                        <Typography color={colors.primary[400]} variant="h5">
                            Sign in
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Container >
    )

}

export default AboutMeForm