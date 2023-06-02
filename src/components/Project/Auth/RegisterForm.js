import React from "react";
import TextfieldWrapper from "../../FormsUI/Textfield";
import { Box, Typography, Checkbox, Grid, Button } from "@mui/material";
import mockPlatform from "../../../data/mockPlatform.json";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import * as Yup from 'yup';
import { Formik, Form, replace } from 'formik';
import SelectWrapper from "../../FormsUI/Select";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ButtonWrapper from "../../FormsUI/Button";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { UserData } from "../../Context/UserContext";
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";


const initValues = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    regDate: serverTimestamp(),
    changeDate: serverTimestamp(),
    wallet: '',
    mainPlatform: '',
    likes: 0,
    dislikes: 0,
    aboutMe: '',
    countCompletedProjects: 0,
    chats: []
}

const validationForm = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email().required("email is required"),
    mainPlatform: Yup.string().required("Required"),
    password: Yup.string().required("Password is required"),
});

const RegisterForm = () => {


    const [values, setValues] = useState(initValues)
    const [error, SetError] = useState(false)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const { createUser, user } = UserAuth()
    const userColRef = collection(db, 'users')
    const teamColRef = collection(db, 'teams')

    return (
        <Formik
            initialValues={{ ...initValues }}
            validationSchema={validationForm}
            onSubmit={
                async (values) => {
                    SetError('')
                    try {
                        await createUser(values.email, values.password)
                            .then(async () => {
                                const userData = {
                                    id: auth.currentUser.uid,
                                    name: values.name,
                                    lastName: values.lastName,
                                    email: values.email,
                                    regDate: serverTimestamp(),
                                    changeDate: serverTimestamp(),
                                    wallet: values.wallet,
                                    mainPlatform: values.mainPlatform,
                                    likes: values.likes,
                                    dislikes: values.dislikes,
                                    aboutMe: values.aboutMe,
                                    countCompletedProjects: values.countCompletedProjects,
                                    chats: values.chats,
                                }
                                console.log('Create new user')
                                const userRef = doc(userColRef, userData.id)
                                await setDoc(userRef, userData)
                                console.log('Creating completed')

                            }).then(async () => {
                                const team = {
                                    authorId: auth.currentUser.uid,
                                    teamId: uuidv4(),
                                    formationDate: serverTimestamp(),
                                    changeDate: serverTimestamp(),
                                    teamMultiWallet: "",
                                    teamName: "My Team 1",
                                    members: [
                                        {
                                            memberId: 1,
                                            name: values.name,
                                            lastName: values.lastName,
                                            email: values.email,
                                            likes: values.likes,
                                            dislikes: values.dislikes,
                                            mainPlatform: values.mainPlatform,
                                            countCompletedProjects: values.countCompletedProjects,
                                            aboutMe: values.aboutMe
                                        }
                                    ]
                                }
                                console.log('Create new team')
                                const teamRef = doc(teamColRef, team.teamId)
                                await setDoc(teamRef, team)
                                console.log('Creating completed')
                            })
                        navigate('/authed/dashboard', { replace: true })
                    } catch (e) {
                        SetError(true)
                        console.log(e.message)
                    }
                }

            }>
            <Form>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            pl: 3,
                            pr: 3,
                            pt: 1,
                            pb: 1,
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
                            Sign up
                        </Typography>
                        <Box sx={{ mt: 3 }}>
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
                                        name='email'
                                        label='Input your email address'
                                        color='secondary'
                                    >

                                    </TextfieldWrapper>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextfieldWrapper
                                        sx={{ mt: 1 }}
                                        name="password"
                                        label="Input password"
                                        color='secondary'
                                        type='password'

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
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                <Typography color={colors.greenAccent[400]} variant="h5">
                                    Sign up
                                </Typography>
                            </Button>
                            <Grid container justifyContent="center" mt={1}>
                                <Grid item>
                                    {error ? (<Typography color={colors.redAccent[400]}>
                                        Такой email уже зарегистрирован
                                    </Typography>) : (<></>)}
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end" mt={1}>
                                <Grid item>
                                    <Link href="/" variant="body2" color='secondary'>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Form>

        </Formik>
    )

}

export default RegisterForm