import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Card from "../../components/Project/Dashboard/Card";
import { mockDataProjects } from "../../data/mockProject";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Header title="DASHBOARD" />

      </Box>
      <Box display='flex' justifyContent="start" alignItems="center" p={2}>
        <Typography variant="h3" color={colors.primary}>
          New projects
        </Typography>
      </Box>
      <Box
        display='flex' justifyContent="start" alignItems="center"
      >
        <Card style = {{backgroundColor: colors.primary[400]}} newProjects={mockDataProjects}>

        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
