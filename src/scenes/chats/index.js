import React from "react";
import { Box, Grid } from "@mui/material";
import Converation from "../../components/Conversation";
import { useState, useEffect } from "react";
import LoadingScreen from "../loadingScreen";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../components/firebaseConfig";
import { UserAuth } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";

const SingleChat = () => {
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const [chat, setChat] = useState()
    const navigate = useNavigate()
    const { userData } = UserAuth()

    useEffect(() => {
        const getChatById = async () => {
            console.log("chat curid = " + id)
            const chatRef = doc(db, 'chats', id)
            const chatSnap = await getDoc(chatRef)

            if (chatSnap.exists()) {
                const participant = chatSnap.data().members.some(member => member === userData.email)
                if (!participant) {
                    navigate('/authed/dashboard')
                }
                setChat(chatSnap.data())
            }
            else console.log("Project not found")
        }
        return () => {
            getChatById()
            setLoading(false)
        }
    }, [])

    if (loading || !chat) {
        return <LoadingScreen/>
    }

    return (
        <Box
        sx={{
            height: "100%",
        }}
        >
            <Converation chat={chat}/>
        </Box>

    )
}

export default SingleChat