import React from "react";
import { Box, useTheme, Grid, Typography } from "@mui/material";
import { tokens } from "../../theme";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PeopleIcon from '@mui/icons-material/People';
import Card from '../../../Project/Dashboard/Card';



const ProjectDescription = ({
    projectInfo,
    otherUserProjects,
    ...other
}) => {

    const applyForProject = (i) => {

    }

    return (
        <Box>
            {projectInfo.map((item, i) => (
                <Box>
                    <Box display='inline-flex'>
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {item.author}
                        </Avatar>

                        <View style={{ height: '100%', width: 1, backgroundColor: '#909090' }} />

                        <Typography>
                            {item.startDate}
                        </Typography>
                    </Box>

                    <Box display='flex'>
                        <Typography>
                            {item.shortName}
                        </Typography>
                        <Box>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </Box>

                    </Box>

                    <Box>
                        <Box>
                            <DateRangeIcon />
                            <Typography>
                                {item.endDate}
                            </Typography>
                        </Box>

                        <Box>
                            <PeopleIcon />
                            <Typography>
                                {item.peopleMin + ' — ' + item.peopleMax}
                            </Typography>
                        </Box>
                        <CurrencyBitcoinIcon />
                        <Typography>
                            {item.currency.toUpperCase()}
                        </Typography>
                        <Box>

                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography>
                                Main platform
                            </Typography>
                            <Box>
                                <Typography>
                                    {item.platform}
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography>
                                Award
                            </Typography>
                            <Box>
                                <CurrencyBitcoinIcon />
                                <Typography>
                                    {item.cost + ' ' + item.currency.toUpperCase()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography>
                                Status
                            </Typography>
                            <Typography>
                                Assepting application
                            </Typography>
                            <Button
                                color='third'
                                variant='contained'
                                onClick={applyForProject}
                                endIcon={<CallMadeIcon style={{ color: colors.black_white[400] }} />}
                                sx={{ borderRadius: '10px' }}
                            ></Button>
                        </Box>
                    </Box>

                    <Box>

                        <Box>
                            <Typography>
                                Project description
                            </Typography>

                            <Box>
                                <Typography>
                                    {item.description}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Box>

                        <Typography>
                            Other projects of this user
                        </Typography>

                    </Box>
                    <Box>
                        <Card style={{ backgroundColor: colors.primary[400] }} newProjects={otherUserProjects}>

                        </Card>
                    </Box>
                </Box>

            ))};
        </Box>
    );
}