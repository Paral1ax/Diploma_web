import React from "react";
import LikeDislike from "../LikeDislike";
import { Card, useTheme, Box, CardHeader, Avatar, CardContent, CardActions } from "@mui/material";
import { tokens } from "../../theme";
import TextfieldWrapper from "../Project/Dashboard/Textfield";
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


const UserCard = ({
    userData,
    ...others
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
    };

    const handleShowProject = (i) => {

    }

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    return (
        
        <Box  display ="flex" sx={{ overflowX: 'scroll', m: 2}}>
            {userData.map((userInfo, i) => (
            <Card key={userInfo.memberId} sx={{
                borderRadius: '16px',
                minWidth: '25%',
                border: '1px solid black',
                backgroundColor: colors.primary2[400],
                m: 2
            }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                            {userInfo.name[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={userInfo.name + ' ' + userInfo.lastName}
                    subheader={
                        <LikeDislike likes={userInfo.likes} dislikes={userInfo.dislikes}>

                        </LikeDislike>}
                />
                <CardContent>
                    <TextfieldWrapper
                        label="Main platform"
                        sx = {{ width : '65%'}}
                        defaultValue={userInfo.mainPlatform}
                        InputProps={{
                            readOnly: true,
                            style: { fontSize: 18, borderColor: 'black' }
                        }}
                    />

                    <TextfieldWrapper
                        sx = {{width : '20%', ml: 2}}
                        label="Number of completed projects"
                        defaultValue={userInfo.countCompletedProjects}
                        InputProps={{
                            readOnly: true,
                            style: { fontSize: 18, borderColor: 'black' }
                        }}
                    />
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded === i}
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={expanded === i}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Box display='flex'>
                            <TextfieldWrapper
                                label="About me"
                                multiline={true}
                                minRows="7"
                                maxRows="7"
                                defaultValue={userInfo.aboutMe}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontSize: 14, borderColor: 'black' }
                                }}
                            />

                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
            ))}
        </Box>
    );

}

export default UserCard