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


const AuthorizeForm = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const link = '/authed'

    const [userEmail, SetEmail] = useState('');
    const [userPassword, SetPassword] = useState('');
    const [error, SetError] = useState('');

    const { signIn } = UserAuth()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        SetError('');
        try {
            await signIn(userEmail, userPassword)
                
            console.log('login success')
            navigate("/authed/dashboard")
            
        } catch(e) {
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        color="secondary"
                        autoFocus
                        value={userEmail}
                        onChange={(e) => SetEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        color="secondary"
                        id="password"
                        autoComplete="current-password"
                        value={userPassword}
                        onChange={(e) => SetPassword(e.target.value)}
                    />


                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary" />}
                        label="Remember me"
                    />
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
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" color={colors.greenAccent[400]}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" color={colors.greenAccent[400]}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    )

}

export default AuthorizeForm