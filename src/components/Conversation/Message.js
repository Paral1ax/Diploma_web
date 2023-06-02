import { Box, Stack } from '@mui/material'
import React from 'react'
import { TextMessage, TimeLine } from './MsgType'

const Message = ({
    chatHistory,
    scroll
}) => {
    scroll.current.scrollIntoView({ behavior: "smooth" });

    return (
        <Box p={3}>
            <Stack spacing={3} >
                {chatHistory.map((el) => {
                    switch (el.type) {
                        case "divider":
                            return <TimeLine/>
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    break;
                                case "doc":
                                    break;
                                case "link":
                                    break;
                                case "reply":
                                    break;
                                default:
                                    return <TextMessage el={el} />
                            }
                            break;
                        default:
                            return <></>
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message