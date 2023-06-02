import React from 'react'
import { Box, Grid, Typography, Divider, Button } from '@mui/material'
import { Formik } from 'formik'

export const ChangeProject = ({
    projectInfo
}) => {

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
        <Box>
            <Box display='flex' flexDirection='column'>
                <Box display='flex' justifyContent='space-between' sx={boxConfig}>
                    <Grid container>
                        <Grid item>
                            <Typography variant="h2" sx={{ mt: 1, ml: 2 }}>
                                {projectInfo.shortName}
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item>
                            <Typography variant="h3" sx={{ ml: 1 }}>
                                {projectInfo.cost}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3" color='#c99d66' sx={{ ml: 1 }}>
                                {projectInfo.currency}
                            </Typography>
                        </Grid>
                    </Grid>


                </Box>
                <Box width='50%' display='block' justifyContent='center' alignItems='center'>
                    <Typography variant="h5" align="center">
                        Project description
                    </Typography>

                    <Box {...boxConfig} minHeight='180px'>
                        <Typography variant="h4">
                            {projectInfo.description}
                        </Typography>
                    </Box>
                </Box>
                <Box display='flex' width='100%' justifyContent='space-between' alignItems='center'>
                    <Box {...boxConfig} width='40%'>
                        <Formik>
                            <Form>
                                <Grid container>
                                    <Grid item>
                                        <DateTimePicker
                                            name="endDate"
                                            label="Date of project ending"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button>
                                            Extend Project deadline
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Formik>
                    </Box>
                    <Button>
                        Close project
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default ChangeProject
