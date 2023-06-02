import { Typography, Box, Button } from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import CallMadeIcon from '@mui/icons-material/CallMade';
import TextfieldWrapper from "../Dashboard/Textfield";
import { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import LoadingScreen from "../../../scenes/loadingScreen";
import { useNavigate } from "react-router-dom";

const MyProjectCard = ({
    ...other
}) => {

    const [loading, setLoading] = useState(true)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [orders, setOrders] = useState()
    const { userData } = UserAuth()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const userOrders = [];
        console.log("user data in application: " + userData.id)
        const projects = query(collection(db, 'projects'), where("authorId", "==", userData.id))
        const unsubscribe = onSnapshot(projects, (querySnapshot) => {
            console.log("Загрузка заявок: ")
            querySnapshot.forEach((doc) => {
                userOrders.push(
                    doc.data()
                )
            })
            setOrders(userOrders)
            setLoading(false)
        })

        return () => {
            unsubscribe();
        };
    }, [])

    const handleViewProject = (id) => {
        navigate('/authed/chat/' + id)
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <Box display='block'>

            {orders.map((item) => (
                <Box {...other}
                    key={item.projectId}
                    display='flex'
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2, mt: 2, p: 3, minWidth: '100%', borderRadius: '16px', border: '1px solid black', backgroundColor: colors.primary[400] }}>
                    <Box display='flex' gap={3}
                        justifyContent="space-evenly"
                        alignItems="center"
                        width='80%'
                        >
                        <TextfieldWrapper
                            label="main goal"
                            sx={{ m: 1, width: '78%' }}
                            defaultValue={item.shortName}
                            InputProps={{
                                readOnly: true,
                                style: { fontSize: 22, borderColor: 'black' }
                            }}
                        />
                        <Divider orientation="vertical" flexItem width='1%' />

                        <TextfieldWrapper
                            label="Application formation date"
                            sx={{ m: 1, width: '20%' }}
                            defaultValue={item.endDate}
                            InputProps={{
                                readOnly: true,
                                style: { fontSize: 22 }
                            }}

                        />

                    </Box>

                    <Box width='20%'>
                        <Typography align="center">
                            Status:
                        </Typography>
                        <Typography variant="h5" align="center" color='secondary'>
                            {item.status}
                        </Typography>
                    </Box>

                    <Box width='20%'>
                        <Button
                            color='third'
                            variant='contained'
                            onClick={() => {handleViewProject(item.chatId)}}
                            endIcon={<CallMadeIcon style={{ color: colors.black_white[400] }} />}
                            sx={{ borderRadius: '10px' }}
                        >
                            <Typography color={colors.black_white[400]}>
                                View project
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            ))
            }
        </Box>
    )
}

export default MyProjectCard