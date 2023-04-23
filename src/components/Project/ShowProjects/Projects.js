import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProjectCard from './Card';
import { mockDataProjects } from "../../../data/mockProject";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, flexDirection: 'column'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProjectTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" centered indicatorColor="secondary">
        <Tab label="Item One" {...a11yProps(0)} style={{ minWidth: '25%' }} />
        <Tab label="Item Two" {...a11yProps(1)} style={{ minWidth: '25%' }} />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0} >
          <ProjectCard style={{ backgroundColor: colors.primary[400] }} newProjects={mockDataProjects}>

          </ProjectCard>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Box>
  );
}