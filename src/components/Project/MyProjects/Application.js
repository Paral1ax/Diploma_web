import React from "react";
import UserCard from "../../Users/UserCard";
import { useTheme, Card, CardContent, CardActions, Box, Typography, } from "@mui/material";
import { tokens } from "../../../theme";
import IconButton from '@mui/material/IconButton';
import TextfieldWrapper from "../Dashboard/Textfield";
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { mockUserInfo } from "../../../data/userInfo";


const Applications = ({
    applicationInfo,
    ...other
}) => {

    //Получаем информацию о проекте по id проекта


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
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    return (
        <>
            {applicationInfo.map((item, i) => (
                <Card {...other} key={item.applicationId}
                    sx={{ mb: 2, mt: 2, p: 1, minWidth: '100%', borderRadius: '16px', border: '1px solid black', backgroundColor: colors.primary[400] }}>
                    <CardContent>
                        <Box display='flex' sx={{ flexWrap: 'wrap' }}>
                            <TextfieldWrapper
                                label="main goal"
                                sx={{ m: 1, width: '60%' }}
                                defaultValue={item.projectName}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontSize: 22, borderColor: 'black' }
                                }}
                            />
                            <TextfieldWrapper
                                label="Application formation date"
                                sx={{ m: 1, width: '20%' }}
                                defaultValue={item.formationDate}
                                InputProps={{
                                    readOnly: true,
                                    style: { fontSize: 22 }
                                }}

                            />
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" color="secondary">
                                    <CheckIcon fontSize="large"/>
                                </IconButton>
                                <IconButton aria-label="share" color="red">
                                    <CloseIcon fontSize="large"/>
                                </IconButton>
                                <ExpandMore
                                    expand={expanded === i}
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expanded === i}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon fontSize="large"/>
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography ml ={2} variant="h4">
                                        Executors
                                    </Typography>
                                    <UserCard userData={mockUserInfo}>

                                    </UserCard>
                                </CardContent>
                            </Collapse>

                        </Box>

                    </CardContent>

                </Card>
            ))}
        </>
    );
}

export default Applications