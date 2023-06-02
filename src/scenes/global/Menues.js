import React from "react";
import Sidebar from "./Sidebar2";
import Topbar from "./TopBar2";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import { UserAuth } from "../../components/Context/AuthContext";
import { useEffect } from "react";

const AppLayout = () => {

    return (
    <Sidebar/>
    )
}
export default AppLayout