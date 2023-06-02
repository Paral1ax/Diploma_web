import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
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
import TextfieldWrapper from './Textfield';
import InputAdornment from '@mui/material/InputAdornment';
import PeopleIcon from '@mui/icons-material/People';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({
  newProjects,
  projectsId,
  ...other
}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  const [expanded, setExpanded] = React.useState(-1);

  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  const handleShowProject = (id) => {
      navigate('/authed/projects/' + id)
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
    <>
      {newProjects.map((item, i) => (
        <Card {...other}
          key={item.projectId}
          sx={{
            marginRight: '20px',
            minWidth: 400,
            borderRadius: '16px',
            borderColor: colors.redAccent[200],
            border: '1px solid black',
          }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }}>
                {item.author}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={item.shortName}
            
            subheader={displayTime(item.startDate.seconds)}
          />
          <CardContent>
            <Box display='inline-flex' sx={{ flexWrap: 'wrap' }}>
              <TextfieldWrapper
                label="main goal"
                multiline={true}
                minRows="2"
                maxRows="2"
                sx={{ m: 1, width: '100%' }}
                defaultValue={item.shortName}
                InputProps={{
                  readOnly: true,
                  style: { fontSize: 22, borderColor: 'black' }
                }}
              />
              <TextfieldWrapper
                label="main platform"
                defaultValue={item.platform}
                sx={{ m: 1, width: '51%' }}
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
              <TextfieldWrapper
                label="payment currency"
                sx={{ m: 1, width: '40%' }}
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
              <TextfieldWrapper
                label="project end date"
                sx={{ m: 1, width: '41%' }}
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
              <TextfieldWrapper
                label="number of people"
                sx={{ m: 1, width: '50%' }}
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

            </Box>

          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              color='third'
              variant='contained'
              onClick={() => handleShowProject(item.projectId)}
              endIcon={<CallMadeIcon style={{ color: colors.black_white[400] }} />}
              sx={{ ml: 16, borderRadius: '10px' }}
            >
              <Typography color={colors.black_white[400]}>
                View project
              </Typography>
            </Button>
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
        </Card>
      ))}
    </>
  );
}

export default DashboardCard