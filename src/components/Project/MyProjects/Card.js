import { Typography, Box, Button } from "@mui/material";
import React from "react";
import Divider from '@mui/material/Divider';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import CallMadeIcon from '@mui/icons-material/CallMade';
import TextfieldWrapper from "../Dashboard/Textfield";


const MyProjectCard = ({
    projectsInfo,
    ...other
}) => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleViewProject = () => {

    }

    return (
        <Box display='block'>

            {projectsInfo.map((item) => (
                <Box {...other}
                    display='flex'
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2, mt: 2, p: 3, minWidth: '100%', borderRadius: '16px', border: '1px solid black', backgroundColor: colors.primary[400] }}>
                    <Box display='flex' gap={3}
                        justifyContent="space-evenly"
                        alignItems="center"
                        width='80%'
                        multiline={true}>
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
                            Выполняется
                        </Typography>
                    </Box>

                    <Box width='20%'>
                        <Button
                            color='third'
                            variant='contained'
                            onClick={handleViewProject}
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