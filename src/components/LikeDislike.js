import React from 'react';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { Box, Typography } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const LikeDislike = ({
    likes,
    dislikes,
    ...others
}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box display='flex' justifyContent='start' alignItems='center'>
            <Box p={1}>
                <Box display='flex' alignItems='center' justifyContent='center' gap={1}>
                    <Typography color={colors.greenAccent[400]} variant='h3'>
                        {likes + ' '}
                    </Typography>
                    <ThumbUpOutlinedIcon color='secondary' fontSize='small' />
                </Box>
            </Box>
            <Box p={1}>
                <Box display='flex' alignItems='center' justifyContent='center' gap={1}>
                    <ThumbDownOutlinedIcon color='red' fontSize='small' />
                    <Typography color={colors.redAccent[400]} variant='h3'>
                        {dislikes + ' '}
                    </Typography>

                </Box>
            </Box>
        </Box>
    )
}
export default LikeDislike