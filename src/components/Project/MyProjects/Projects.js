import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { mockDataProjects } from "../../../data/mockProject";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import TabPanel from '../../TabPanel';
import MyProjectCard from "./MyOrders"
import Applications from "./Application";
import { mockApplication } from "../../../data/mockApplication";
import MyPerfomanceCard from "./MyPerfomances";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MyProjectsTabs() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary" centered indicatorColor="secondary">
                <Tab label="My orders" {...a11yProps(0)} style={{ minWidth: '25%' }} />
                <Tab label="My performances" {...a11yProps(1)} style={{ minWidth: '25%' }} />
                <Tab label="Applications" {...a11yProps(2)} style={{ minWidth: '25%' }} />
            </Tabs>
            <Box>
                <TabPanel value={value} index={0} >
                    <MyProjectCard>

                    </MyProjectCard>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MyPerfomanceCard>

                    </MyPerfomanceCard>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <Applications>

                    </Applications>
                </TabPanel>
            </Box>
        </Box>
    )
}
