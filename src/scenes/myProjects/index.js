import { Box, useTheme, Grid, Card } from "@mui/material";
import { tokens } from "../../theme";
import MyProjectsTabs from "../../components/Project/MyProjects/Projects";

const MyProjects = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box color={colors.blueAccent[400]}>
            <MyProjectsTabs>
                        
            </MyProjectsTabs>

        </Box>
    );
};

export default MyProjects;