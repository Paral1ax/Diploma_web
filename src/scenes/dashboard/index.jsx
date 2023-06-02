import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "../../components/Project/Dashboard/Card";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from '../../components/firebaseConfig'

const Dashboard = () => {
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
      console.log("Данные о проектк: " + projectData)
      setData(projectData)
    })
    return () => {
      unsubscribe();
    };
  }, [])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="Dashboard" />

      </Box>
      <Box display='flex' justifyContent="start" alignItems="center" p={2}>
        <Typography variant="h3" color={colors.primary}>
          Lets start journey
        </Typography>
      </Box>
      <Box display='block' width={"80%"} sx={{ borderRadius: '16px', border: '1px solid black' }} justifyContent="start" alignItems="center" p={2} style={{ backgroundColor: colors.primary[400] }}>
        <Typography variant="h4" pt={2}>
          1. Connect your profile to Phantom wallet.
        </Typography>
        <Typography variant="h4" pt={2}>
          2. If you work alone, feel free to click on the "Project" tab.
        </Typography>
        <Typography variant="h4" pt={2}>
          3. If you work with team, in order to complete projects, you and your team need to create multisig wallet
        </Typography>
        <Typography variant="h4" pt={2}>
          4. If you want to post a new project, click on the "Create project" tab.
        </Typography>
        <Typography variant="h4" pt={2} pb={2}>
          5. Also, sometimes check the "Arbitration" tab, perhaps it is you who will decide the fate of someones project.
        </Typography>
      </Box>
      <Box display='flex' justifyContent="start" alignItems="center" p={2}>
        <Typography variant="h3" color={colors.primary}>
          New projects
        </Typography>
      </Box>
      <Box
        sx={{ overflowX: 'scroll'}}
        display='flex' justifyContent="start" alignItems="center"
      >
        <Card style={{ backgroundColor: colors.primary[400] }} newProjects={data} projectsId={dataId}>

        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
