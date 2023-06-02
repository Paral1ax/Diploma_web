import { AttachFile, InsertEmoticon, MoreVert } from '@mui/icons-material'
import { Stack, Box, Typography, IconButton, styled, TextField, InputAdornment, useTheme } from '@mui/material'
import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { tokens } from '../../theme';
import Message from './Message';
import LoadingScreen from '../../scenes/loadingScreen';
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebaseConfig';
import { Timestamp, arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import Settings from '@mui/icons-material/Settings';

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottom: "12px",
    }
}))

const Converation = ({
    chat,
    ...others
}) => {

    const { userData } = UserAuth()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const scroll = useRef();
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const messArray = []
        const unsubscribe = onSnapshot(doc(db, 'messages', chat.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messageArr)
        })
        setLoading(false)
        return () => {
            unsubscribe()

        }
    }, [chat.chatId])

    const handleSendMessage = async () => {
        if (input !== "") {
            const newMessage = {
                messageId: uuidv4(),
                sentAt: Timestamp.now(),
                changedAt: Timestamp.now(),
                sentBy: userData.id,
                messageText: input,
                type: "msg",
                subtype: ""
            }
            await updateDoc(doc(db, "messages", chat.chatId), {
                messageArr: arrayUnion(newMessage)
            })
        }
    }

    if (chat) {

        return (
            <Stack height="100%" width={"auto"}>
                {/* Chat header*/}
                <Box
                    mt={1}
                    ml={2}
                    mr={2}
                    sx={{ height: "12vh", backgroundColor: colors.primary[400], border: '1px solid black', borderRadius: "10px 10px 0px 0px" }}>
                    <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{ width: "100%", height: "100%" }}>
                        <Stack spacing={2}>
                            <Typography variant="h4" ml={2}>
                                {chat.chatName}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="large"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <MoreVert>

                                    </MoreVert>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <PermMediaIcon fontSize='small'/>
                                </ListItemIcon>
                                Files
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <ManageHistoryIcon fontSize='small'/>
                                </ListItemIcon>
                                <Typography>
                                    Manage Project
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Box>
                {/* Msg*/}
                {console.log(messages.length)}
                <Box
                    mr={2}
                    ml={2}
                    sx={{ flexGrow: 1, height: "65vh", overflowY: "scroll", overflowX: "hidden", backgroundColor: colors.primary[400], border: '1px solid black' }}>
                    <span ref={scroll}></span>
                    {loading ? (<LoadingScreen />) : (messages.length > 0 ? (
                        <Message scroll={scroll} chatHistory={messages} />
                    ) : (
                        <Box justifyContent={"center"} alignItems={"center"}>
                            <Typography mt={3} variant='h3' align='center'>
                                Empty
                            </Typography>
                        </Box>))
                    }
                </Box>
                {/* Chat footer */}
                <Box
                    mb={1}
                    mr={2}
                    ml={2}
                    p={2}
                    sx={{
                        backgroundColor: "#000FFF",
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        backgroundColor: colors.primary[400],
                        border: '1px solid black',
                        borderRadius: "0px 0px 10px 10px"
                    }}>
                    <Stack direction="row" alignItems={"center"} spacing={3} >
                        <StyledInput
                            fullWidth
                            onChange={(e) => {
                                setInput(e.target.value)
                            }}
                            placeholder='Write a message...'
                            variant="filled" InputProps={{
                                disableUnderline: true,
                                startAdornment:
                                    <InputAdornment>
                                        <IconButton>
                                            <AttachFile />
                                        </IconButton>
                                    </InputAdornment>,
                                endAdornment:
                                    <InputAdornment>
                                        <IconButton>
                                            <InsertEmoticon />
                                        </IconButton>
                                    </InputAdornment>,

                            }} />
                        <Box sx={{ height: 40, width: 52, backgroundColor: colors.greenAccent[500], borderRadius: 1.5 }}>
                            <Stack sx={{ height: "100%", width: "100%" }}
                                alignItems="center"
                                justifyContent="center">
                                <IconButton variant="outlined"
                                    onClick={handleSendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        )
    }
}

export default Converation