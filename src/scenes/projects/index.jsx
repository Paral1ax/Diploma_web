import { Box, useTheme, Grid, Card } from "@mui/material";
import { tokens } from "../../theme";
import ProjectTabs from "../../components/Project/ShowProjects/Projects";

const Projects = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
        <Box color={colors.blueAccent[400]}>
            <ProjectTabs>
                        
            </ProjectTabs>

        </Box>
    );
};

export default Projects;