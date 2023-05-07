import React from "react";
import { Box, useTheme, Grid, Typography, Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PeopleIcon from '@mui/icons-material/People';
import CallMadeIcon from '@mui/icons-material/CallMade';
import Card from '../../../components/Project/Dashboard/Card';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import { tokens } from "../../../theme";
import Divider from '@mui/material/Divider';
import Header from "../../../components/Header";
import { mockDataProjects } from "../../../data/mockProject";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../components/firebaseConfig";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShowStatus from "../../../components/ShowStatus/status";
import { useNavigate } from "react-router-dom";


const ProjectDescription = ({
}) => {

    const { id } = useParams();
    const [projectInfo, setProjectDescription] = useState()
    const [assepting, setAssepting] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const getProjectById = async () => {
            try {
                console.log("project curid = " + id)
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
        return () => {
            getProjectById()
        }
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const applyForProject = () => {
        navigate('/authed/apply/' + id)
        console.log("Applying")
    }

    const alreadyInExecution = () => {
        console.log("Already In Execution")
    }
    const displayTime = (time) => {
        return (new Date(time * 1000).toLocaleDateString())
    }

    const boxConfig = {
        borderRadius: '16px',
        border: '1px solid grey',
        backgroundColor: colors.primary[400],
        p: 2,
        m: 1,
        gap: '15px',
        ml: 4,
        mr: 4
    }

    const nestedBoxConfig = {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <Box>
            {projectInfo && (
                <Box display='flex' flexDirection='column'>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Header title="Project Description" />

                    </Box>
                    <Box display='inline-flex' alignItems='center' justifyContent='flex-start' sx={boxConfig}>
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {projectInfo.authorId[0]}
                        </Avatar>

                        <Typography variant="h4">
                            {projectInfo.authorId[0]}
                        </Typography>

                        <Divider orientation="vertical" flexItem />

                        <Typography variant="h5" color='grey'>
                            {displayTime(projectInfo.startDate.seconds)}
                        </Typography>
                    </Box>

                    <Box display='flex' justifyContent='space-between' sx={boxConfig}>
                        <Typography variant="h2" sx={{ mt: 1, ml: 2}}>
                            {projectInfo.shortName}
                        </Typography>
                        <Box>
                            <IconButton size='large' aria-label="add to favorites">
                                <FavoriteIcon fontSize="large" />
                            </IconButton>
                            <IconButton size='large' aria-label="share">
                                <ShareIcon fontSize="large" />
                            </IconButton>
                        </Box>

                    </Box>

                    <Box sx={boxConfig} justifyContent='space-around' display='flex'>
                        <Box width='20%' display='block' justifyContent='center' alignItems='center'>
                            <Typography align="center" variant="h5">
                                Main platform
                            </Typography>
                            <Box maxWidth='300px' alignItems='center' justifyContent='center' height='50px' sx={{ borderRadius: '16px', border: '1px solid grey', mt: 2 }}>
                                <Typography align="center" variant="h4" sx={{ mt: 1 }}>
                                    {projectInfo.platform}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={nestedBoxConfig}>
                            <DateRangeIcon fontSize="large" sx={{ mr: 2 }} />
                            <Typography variant="h4">
                                {projectInfo.endDate}
                            </Typography>
                        </Box>

                        <Box sx={nestedBoxConfig}>
                            <PeopleIcon fontSize="large" sx={{ mr: 2 }} />
                            <Typography variant="h4">
                                {projectInfo.peopleMin + ' — ' + projectInfo.peopleMax}
                            </Typography>
                        </Box>
                        <Box sx={nestedBoxConfig}>
                            <CurrencyBitcoinIcon fontSize="large" sx={{ mr: 2 }} />
                            <Typography variant="h4">
                                {projectInfo.currency.toUpperCase()}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex' justifyContent='space-between' alignItems='baseline' >
                        <Box width='50%' display='block' justifyContent='center' alignItems='center'>
                            <Typography variant="h5" align="center">
                                Project description
                            </Typography>

                            <Box {...boxConfig} minHeight='180px'>
                                <Typography variant="h4">
                                    {projectInfo.description}
                                </Typography>
                            </Box>
                        </Box>

                        <Box display='block' justifyContent='space-around' alignItems='center'>
                            <Typography variant="h4" align="center">
                                Award
                            </Typography>
                            <Box height='120px' display='flex' justifyContent='center' alignItems='center' sx={boxConfig}>
                                <CurrencyBitcoinIcon fontSize="large" />
                                <Typography variant="h3" sx={{ ml: 1 }}>
                                    {projectInfo.cost}
                                </Typography>
                                <Typography variant="h3" color='#c99d66' sx={{ ml: 1 }}>
                                    {projectInfo.currency}
                                </Typography>
                            </Box>
                        </Box>
                        <Box display='block' justifyContent='center' alignItems='center'>
                            <Typography variant="h4" align="center">
                                Status
                            </Typography>
                            {assepting ?
                                (<ShowStatus
                                    status={projectInfo.status}
                                    statusBool={assepting}
                                    buttonStatus='Apply'
                                    buttonColor={colors.greenAccent[400]}
                                    applyForProject={applyForProject}
                                />)
                                :
                                (<ShowStatus
                                    status={projectInfo.status}
                                    statusBool={assepting}
                                    buttonStatus='Accepted for execution'
                                    buttonColor={colors.redAccent[400]}
                                    applyForProject={alreadyInExecution} />
                                )}
                        </Box>
                    </Box>

                    <Box sx={{ mt: 2, mb: 2, ml: 5 }}>
                        <Typography variant="h3">
                            Other projects of this user
                        </Typography>
                    </Box>
                    <Box display='flex' sx={{ m: 4 }}>
                        <Card style={{ backgroundColor: colors.primary[400] }} newProjects={mockDataProjects}>

                        </Card>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default ProjectDescription