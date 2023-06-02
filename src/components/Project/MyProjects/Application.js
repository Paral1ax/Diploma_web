import React from "react";
import UserCard from "../../Users/UserCard";
import { useTheme, Card, CardContent, CardActions, Box, Typography, } from "@mui/material";
import { tokens } from "../../../theme";
import IconButton from '@mui/material/IconButton';
import TextfieldWrapper from "../Dashboard/Textfield";
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { mockUserInfo } from "../../../data/userInfo";
import { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { collection, query, where, onSnapshot, getDocs, getDoc, doc, setDoc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import LoadingScreen from "../../../scenes/loadingScreen";
import { mockApplication } from "../../../data/mockApplication";
import { v4 as uuidv4 } from 'uuid';


const Applications = ({
    ...other
}) => {

    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [applications, setApplications] = useState()
    const { userData } = UserAuth()

    const [expanded, setExpanded] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
    };

    const handleAcceptApplication = async (i) => {
        const batch = writeBatch(db)
        let apps = [...applications]
        console.log(apps.length)
        const currentApp = applications[i];
        if (currentApp.statusId === 0) {
            try {
                //Create chat room
                const getAllMembers = []
                getAllMembers.push(userData.email)
                currentApp.team.members.forEach(member => {
                    getAllMembers.push(member.email)
                })
                const newChat = {
                    projectId: currentApp.projectId,
                    createdAt: serverTimestamp(),
                    createdBy: userData.id,
                    chatId: uuidv4(),
                    members: getAllMembers,
                    modifyAt: serverTimestamp(),
                    chatName: currentApp.projectName,
                    lastMessage: {},
                    type: 1
                }

                const otherProjects = apps.filter(app => currentApp.projectId !== app.projectId)
                const projectRef = doc(db, 'projects', currentApp.projectId)
                batch.update(projectRef, { executors: currentApp.team })
                batch.update(projectRef, { statusId: 1 })
                batch.update(projectRef, { status: 'In progress' })
                batch.update(projectRef, { chatId:  newChat.chatId})
                apps.splice(i, 1)
                const appRef = doc(db, 'applications', currentApp.applicationId)
                batch.update(appRef, { status: "Accepted" })
                batch.update(appRef, { statusId: 1 })
                const curProjects = apps.filter(app => currentApp.projectId === app.projectId)
                curProjects.forEach(async (app) => {
                    const appRef = doc(db, 'applications', app.applicationId)
                    batch.update(appRef, { status: "Canceled" })
                    batch.update(appRef, { statusId: 2 })
                    console.log("changing app completed")
                })
                await batch.commit().then(() => {
                    console.log('Add executors completed')
                })
                setApplications(otherProjects)
                await setDoc(doc(db, "chats", newChat.chatId), newChat);
                await setDoc(doc(db, "messages", newChat.chatId), {messageArr: []});
            }
            catch (e) {
                console.log(e.message)
            }
        }

    }

    const handleDeclineApplication = (i) => {

    }

    useEffect(() => {
        setLoading(true)
        const userApplications = [];
        console.log("user data in application: " + userData.id)
        const applications = query(collection(db, 'applications'), where("projectAuthorId", "==", userData.id), where("statusId", "==", 0))
        const unsubscribe = onSnapshot(applications, (querySnapshot) => {
            console.log("Загрузка заявок: ")
            querySnapshot.forEach((doc) => {
                userApplications.push(
                    doc.data()
                )
                console.log("APP: " + doc.data().projectName)
            })
            setApplications(userApplications)
            setLoading(false)
        })

        return () => {
            unsubscribe();
        };
    }, [])

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <>
            {applications.map((item, i) => (
                <Card {...other} key={item.applicationId}
                    sx={{ mb: 2, mt: 2, p: 1, borderRadius: '16px', border: '1px solid black', backgroundColor: colors.primary[400] }}>
                    <CardContent>
                        <Box display='flex' sx={{ flexWrap: 'wrap' }}>
                            <TextfieldWrapper
                                label="main goal"
                                sx={{ m: 1, width: '60%' }}
                                defaultValue={item.projectName}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontSize: 22, borderColor: 'black' }
                                }}
                            />
                            <TextfieldWrapper
                                label="Application formation date"
                                sx={{ m: 1, width: '20%' }}
                                defaultValue={item.formationDate.toDate().toDateString()}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontSize: 22 }
                                }}

                            />
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" color="secondary" onClick={(() => handleAcceptApplication(i))}>
                                    <CheckIcon fontSize="large" />
                                </IconButton>
                                <IconButton aria-label="share" color="red">
                                    <CloseIcon fontSize="large" />
                                </IconButton>
                                <ExpandMore
                                    expand={expanded === i}
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expanded === i}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon fontSize="large" />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded === i} timeout="auto">
                                <CardContent>
                                    <Typography ml={2} variant="h4">
                                        Executors
                                    </Typography>

                                    <UserCard userData={item.team.members}>

                                    </UserCard>

                                </CardContent>
                            </Collapse>

                        </Box>

                    </CardContent>

                </Card>
            ))}
        </>
    );
}

export default Applications