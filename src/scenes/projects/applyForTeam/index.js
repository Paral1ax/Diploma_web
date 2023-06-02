import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme, Button, MenuItem } from "@mui/material";
import { tokens } from "../../../theme";
import SendIcon from '@mui/icons-material/Send';
import Header from "../../../components/Header";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from "@mui/material/Select";
import { mockDataTeams } from "../../../data/mockTeams";
import TextfieldWrapper from "../../../components/FormsUI/Textfield";
import { v4 as uuidv4 } from 'uuid';
import { serverTimestamp, doc, getDoc, setDoc, collection, getDocs, query, where } from "firebase/firestore";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { db, auth } from "../../../components/firebaseConfig";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../loadingScreen";
import { UserAuth } from "../../../components/Context/AuthContext";

const initValues = {
    applicationId: uuidv4(),
    projectId: "",
    projectAuthorId: "",
    projectName: "",
    peopleCount: 1,
    formationDate: serverTimestamp(),
    status: "Under consideration",
    statusId: 0,
    walletAddress: "",
    team: []
};

const validationForm = Yup.object().shape({
    walletAddress: Yup.string().required("Multisig address required"),
});

const ApplyForProject = () => {
    const { userData } = UserAuth()
    const [teams, setTeams] = useState([]);
    const [chosenTeam, setChosenTeam] = useState({});
    const [loading, setLoading] = useState(true)
    const [applicationData, setApplicationData] = useState(initValues);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams();
    const [error, SetError] = useState('')
    const [projectInfo, setProjectDescription] = useState()
    const [assepting, setAssepting] = useState()
    const colRef = collection(db, 'applications')
    const navigate = useNavigate();

    useEffect(() => {
        const getProjectById = async () => {
            try {
                console.log("project apply = " + id)
                const projectRef = doc(db, 'projects', id)
                await getDoc(projectRef).then((doc) => {
                    if (doc.exists()) {
                        setProjectDescription(doc.data())
                        if (doc.data().statusId === 0)
                            setAssepting(true)
                        else setAssepting(false)
                    }
                    else console.log("Project not found")
                })
            } catch (e) {
                console.log(e.message)
            }
        }
        const getTeamByUserId = async () => {
            const teamsColRef = query(collection(db, 'teams'), where("authorId", '==', auth.currentUser.uid))
            const querySnapshot = await getDocs(teamsColRef)
            const teamsData = [];
            querySnapshot.forEach((doc) => {
                teamsData.push(
                    doc.data()
                )
                console.log('teams data', teamsData)
            });
            console.log(teamsData)
            setTeams(teamsData)
        }
        return () => {
            getProjectById().then(() => {
                getTeamByUserId().then(() => {
                    setLoading(false)
                })
            })
        }
    }, [])

    const boxConfig = {
        borderRadius: '16px',
        border: '1px solid black',
        backgroundColor: colors.primary[400],
        p: 2,
        m: 1,
        gap: '15px',
        ml: 4,
        mr: 4
    }

    return (
        <>
            {loading ? (<LoadingScreen />) : (
                <Formik
                    initialValues={{ ...initValues }}
                    validationSchema={validationForm}
                    onSubmit={async (values) => {
                        SetError('')
                        try {
                            const defTeam =
                            {
                                authorId: auth.currentUser.uid,
                                teamId: uuidv4(),
                                changeDate: serverTimestamp(),
                                formationDate: serverTimestamp(),
                                teamName: 'default',
                                teamMultiWallet: '',
                                members: [
                                    {
                                        memberId: 1,
                                        name: userData.name,
                                        lastName: userData.lastName,
                                        email: userData.email,
                                        likes: userData.likes,
                                        dislikes: userData.dislikes,
                                        mainPlatform: userData.mainPlatform,
                                        countCompletedProjects: userData.countCompletedProjects,
                                        aboutMe: userData.aboutMe
                                    },
                                ]
                            }
                            values.projectId = projectInfo.projectId
                            values.projectAuthorId = projectInfo.authorId
                            values.projectName = projectInfo.shortName
                            if (JSON.stringify(chosenTeam) === '{}') {
                                values.team = defTeam
                            } else {
                                values.team = chosenTeam
                            }
                            console.log(values)
                            const applicationRef = doc(colRef, values.applicationId)
                            await setDoc(applicationRef, values)
                            console.log('completed')
                            navigate('/authed/dashboard')
                        } catch (e) {
                            SetError(e.message)
                            console.log(e.message)
                        }
                    }}>
                    {props => (
                        <Form>
                            <Box>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <Header title="Apply For Project" />

                                </Box>
                                <Box display='block' sx={boxConfig}>
                                    <Typography variant="h4" pt={2}>
                                        1. This page is intended for making an application for a project.
                                    </Typography>
                                    <Typography variant="h4" pt={2}>
                                        2. If you work alone, enter the address of your phantom wallet and click the "working alone" button
                                    </Typography>
                                    <Typography variant="h4" pt={2}>
                                        3. If you work in a team, enter the multisig wallet address of your team
                                    </Typography>
                                </Box>
                                <Box display='flex' sx={boxConfig}>
                                    <TextfieldWrapper
                                        fullWidth={false}
                                        name="walletAddress"
                                        label="Input Multisig wallet addresses if you are working in a team, or your phantom wallet address if you are working alone"
                                        color="secondary"
                                        value={props.values.walletAddress}
                                        onChange={(e, previous) => {
                                            try {
                                                props.setFieldValue("walletAddress", e.target.value)
                                            } catch (e) {
                                                console.log(e.message)
                                            }

                                        }}
                                    />

                                    <Select
                                        name="team"
                                        label="Choose Team"
                                        color="secondary"

                                    >
                                        {teams.map((item, i) => {
                                            return (
                                                <MenuItem
                                                    key={item.teamId}
                                                    value={item.teamName}
                                                    onClick={(previous) => {
                                                        try {
                                                            setChosenTeam(item)
                                                            props.setFieldValue("walletAddress", item.teamMultiWallet)
                                                            console.log("team multiWallet = " + item.teamMultiWallet)
                                                        } catch (e) {
                                                            console.log(e.message)
                                                        }
                                                    }}>
                                                    {item.teamName}
                                                </MenuItem>
                                            )
                                        })}

                                    </Select>

                                </Box>

                                <Box sx={{ ml: 5, mt: 2, mr: 5 }} display='flex' justifyContent='space-between'>
                                    <FormControlLabel
                                        control={<Checkbox sx={{
                                            color: colors.greenAccent[400],
                                            '&.Mui-checked': {
                                                color: colors.greenAccent[300],
                                            }
                                        }}
                                        />}
                                        label="Click here if you are working alone" />

                                    <Button
                                        size='large'
                                        color='secondary'
                                        variant='outlined'
                                        type="submit"
                                        endIcon={<SendIcon style={{ color: colors.greenAccent[400] }} />}
                                        sx={{ borderRadius: '10px', mt: 3, width: '15%' }}

                                    >
                                        <Typography color='secondary'>
                                            Apply
                                        </Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    )
}

export default ApplyForProject