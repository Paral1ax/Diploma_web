import { Divider, Stack, Typography, Box, useTheme } from '@mui/material'
import React from 'react'
import { UserAuth } from '../Context/AuthContext'
import { tokens } from '../../theme'


const TextMessage = ({
    el
}) => {

  const { userData } = UserAuth()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack direction="row" justifyContent={el.sentBy === userData.id ? "end" : "start"}>
        <Box p={1.5} sx={{maxWidth: "60%", borderRadius: el.sentBy === userData.id ? "10px 10px 0px 10px" : "10px 10px 10px 0px", backgroundColor: el.sentBy === userData.id ? colors.primary2[400] : colors.primary3[400], width:"max-content"}}>
            <Typography style={{ wordWrap: "break-word" }} variant='h5' color= {el.sentBy === userData.id ? "000FFF" : "FFF000"}>
                {el.messageText}
            </Typography>
        </Box>
    </Stack>
  )
}

const TimeLine = ({ el}) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Divider width="46%">
            <Typography variant='caption' sx = {{color: "#FFF000"}}>
                {el.messageText}
            </Typography>
        </Divider>
    </Stack>
  )
}

export { TimeLine, TextMessage}