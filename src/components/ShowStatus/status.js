import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { tokens } from '../../theme';


const ShowStatus = ({
    status,
    statusBool,
    buttonStatus,
    buttonColor,
    applyForProject
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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

    return (
        <Box height='120px' sx={boxConfig} alignItems='center' justifyContent='center'>
            <Typography variant="h3" color = {buttonColor}>
                {status}
            </Typography>
            <Button
                variant='contained'
                onClick={applyForProject}
                endIcon={statusBool ? (<CallMadeIcon/>) : (<CloseIcon/>)}
                sx={{ borderRadius: '10px', mt: 2 }}
                color = { statusBool ? ('secondary') : ('red')}
            >
                <Typography color={colors.black_white[400]} variant="h5">
                    {buttonStatus}
                </Typography>
            </Button>

        </Box>

    )
}

export default ShowStatus