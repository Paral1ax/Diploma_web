import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Projects from "./scenes/projects";
import CreateProject from "./scenes/create_project";
import ProjectDescription from "./scenes/projects/description/showProjectDescription"
import ApplyForProject from "./scenes/projects/applyForTeam";
import MyProject from "./scenes/myProjects";
import RegForm from "./scenes/register";
import AuthForm from "./scenes/auth";
import AppLayout from "./scenes/global/Menues";
import { AuthContextProvider } from "./components/Context/AuthContext";
import ProtectedRoute from "./scenes/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={< AuthForm />} />
            <Route path="/register" element={< RegForm />} >
              
            </Route>

            <Route path="/authed" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/authed/dashboard" element={<Dashboard />} />
              <Route path="/authed/teams" element={<Team />} />
              <Route path="/authed/calendar" element={<Calendar />} />
              <Route path="/authed/create" element={<CreateProject />} />
              <Route path="/authed/projects" element={< Projects />}/>
              <Route path='/authed/projects/:id' element={<ProjectDescription />} />
              <Route path="/authed/apply/:id" element={<ApplyForProject />} />
              <Route path="/authed/my_projects" element={<MyProject />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
