import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProjectCard from './Card';
import { mockDataProjects } from "../../../data/mockProject";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import TabPanel from '../../TabPanel';
import { collection, onSnapshot, query } from "firebase/firestore";
import { db} from '../../firebaseConfig'
import { useState, useEffect } from 'react';


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
  const [data, setData] = useState([])
  const [dataId, setDataId] = useState([])

  // read projects
  useEffect(() => {
    const projects = query(collection(db, 'projects'))
    const unsubscribe = onSnapshot(projects, (querySnapshot) => {
      const projectData = [];
      const ids = [];
      querySnapshot.forEach((doc) => {
        projectData.push(doc.data())
        ids.push(doc.id)
      });
      setDataId(ids)
      console.log(projectData)
      setData(projectData)
    })
    return () => {
      unsubscribe();
    };
  }, [])


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" centered indicatorColor="secondary">
        <Tab label="All projects" {...a11yProps(0)} style={{ minWidth: '25%' }} />
        <Tab label="My favorite" {...a11yProps(1)} style={{ minWidth: '25%' }} />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0} >
          <ProjectCard style={{ backgroundColor: colors.primary[400] }} newProjects={data} projectIds={dataId}>

          </ProjectCard>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </Box>
    </Box>
  );
}