import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Grid, Button } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import TextfieldWrapper from '../Dashboard/Textfield';
import InputAdornment from '@mui/material/InputAdornment';
import PeopleIcon from '@mui/icons-material/People';
import CallMadeIcon from '@mui/icons-material/CallMade';


const ProjectCard = ({
    newProjects,
    projectIds,
    ...other
}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [expanded, setExpanded] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
    };

    const handleShowProject = (i) => {

    }
    const displayTime = (time) => {
        return (new Date(time * 1000).toLocaleDateString())
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
        <Box>
            {newProjects.map((item, i) => (
                <Card {...other} key={projectIds[i]} sx={{marginBottom:'15px', minWidth: '100%', borderRadius: '16px', border: '1px solid black' }}>

                    <CardContent>
                        <Box display='flex'>
                            <Box display='flex'
                                flexDirection='column'
                                width='10%'
                                justifyContent="center"
                                alignItems="center"
                                sx={{ border: 1, borderRadius: '10px', m: 1 }} >
                                <Box>
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        {item.author}
                                    </Avatar>
                                </Box>
                                <Box>
                                    <Typography>
                                        {item.author}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography>
                                        {displayTime(item.startDate.seconds)}
                                    </Typography>
                                </Box>

                            </Box>
                            <Box display='flex' width='90%' sx={{ flexWrap: 'wrap' }}>
                                <Grid container spacing={2} align="center" justify="center" alignItems="center">
                                    <Grid item xs={8}>
                                        <TextfieldWrapper
                                            label="main goal"
                                            sx={{ m: 1 }}
                                            defaultValue={item.shortName}
                                            InputProps={{
                                                readOnly: true,
                                                style: { fontSize: 22, borderColor: 'black' }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextfieldWrapper
                                            label="payment currency"
                                            sx={{ m: 1 }}
                                            defaultValue={item.cost + ' ' + item.currency.toUpperCase()}
                                            InputProps={{
                                                readOnly: true,
                                                style: { fontSize: 18 },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CurrencyBitcoinIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            color='third'
                                            variant='contained'
                                            onClick={handleShowProject}
                                            endIcon={<CallMadeIcon style={{ color: colors.black_white[400] }} />}
                                            sx={{ borderRadius: '10px' }}
                                        >
                                            <Typography color={colors.black_white[400]}>
                                                View project
                                            </Typography>
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} align="center" justify="center" alignItems="center">
                                    <Grid item xs={6}>
                                        <TextfieldWrapper
                                            label="main platform"
                                            defaultValue={item.platform}
                                            sx={{ m: 1 }}
                                            InputProps={{
                                                style: { fontSize: 18 },
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CodeIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextfieldWrapper
                                            label="project end date"
                                            sx={{ m: 1 }}
                                            defaultValue={item.endDate}
                                            InputProps={{
                                                readOnly: true,
                                                style: { fontSize: 18 },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DateRangeIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <TextfieldWrapper
                                            label="number of people"
                                            sx={{ m: 1 }}
                                            defaultValue={item.peopleMin + ' — ' + item.peopleMax}
                                            InputProps={{
                                                readOnly: true,
                                                style: { fontSize: 18 },
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleIcon />
                                                    </InputAdornment>
                                                ),
                                            }}

                                        />
                                    </Grid>

                                    <Grid item xs={2}>
                                        <Box display='flex' justifyContent= 'center'>
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
                                            <Box>
                                                <ExpandMore
                                                    expand={expanded === i}
                                                    onClick={() => handleExpandClick(i)}
                                                    aria-expanded={expanded === i}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <CardActions disableSpacing>

                        </CardActions>
                        <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                            <CardContent>
                                <TextfieldWrapper
                                    label="Description"
                                    multiline={true}
                                    minRows="2"
                                    maxRows="12"
                                    sx={{ m: 1, width: '100%' }}
                                    defaultValue={item.description}
                                    InputProps={{
                                        readOnly: true,
                                        style: { fontSize: 18, borderColor: 'black' }
                                    }}
                                />
                            </CardContent>
                        </Collapse>

                    </CardContent>

                </Card>
            ))}
        </Box>
    );
}

export default ProjectCard