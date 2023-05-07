import React from "react";
import Sidebar from "./Sidebar2";
import Topbar from "./TopBar2";
import { useState } from "react";
import { Outlet } from 'react-router-dom';

const AppLayout = () => {

    const [isSidebar, setIsSidebar] = useState(true);

    return (
    <Sidebar/>
    )
}
export default AppLayout