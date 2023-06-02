import { useState, useMemo } from "react";
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
import SingleChat from "./scenes/chats";
import Arbitraging from "./scenes/arbitration";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    [solNetwork]
  );
  const [theme, colorMode] = useMode();

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
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
                    <Route path="/authed/projects" element={< Projects />} />
                    <Route path='/authed/projects/:id' element={<ProjectDescription />} />
                    <Route path="/authed/apply/:id" element={<ApplyForProject />} />
                    <Route path="/authed/my_projects" element={<MyProject />} />
                    <Route path="/authed/chat/:id" element={<SingleChat />} />
                    <Route path="/authed/arbitration" element={<Arbitraging />} />
                  </Route>
                </Routes>
              </AuthContextProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  );
}

export default App;
