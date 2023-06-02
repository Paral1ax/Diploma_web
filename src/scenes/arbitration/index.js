import React from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'

export const Arbitraging = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <Stack height='100%' width={"auto"} direction="row">
            {/* Author files */}
            <Box height='100%' width='25%' m={2} sx={{ height: 80, backgroundColor: colors.primary[400], border: '1px solid black', borderRadius: "15px" }}>
                <Stack  alignItems="center" direction="row" justifyContent="space-evenly">
                    <Typography variant='h4'>
                        Author
                    </Typography>

                </Stack>
            </Box>
            {/* Voting grid */}
            <Box height='100%' width='50%' m={2} sx={{ height: 80, backgroundColor: colors.primary[400], border: '1px solid black', borderRadius: "15px" }}>
                <Stack  alignItems="center" direction="row" justifyContent="space-evenly">
                    <Typography variant='h4'>
                        Voting grid
                    </Typography>
                    
                </Stack>
            </Box>

            {/* Implementor files*/}
            <Box height='100%' width='25%' m={2} sx={{ height: 80, backgroundColor: colors.primary[400], border: '1px solid black', borderRadius: "15px" }}>
                <Stack  alignItems="center" direction="row" justifyContent="space-evenly">
                    <Typography variant='h4'>
                        Implementors
                    </Typography>
                    
                </Stack>
            </Box>
        </Stack>
    )
}
export default Arbitraging