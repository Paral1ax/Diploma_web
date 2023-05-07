import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";


function LoadingScreen() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box style={{background: colors.primary[400]}}>
            <p>Loading...</p>
        </Box>
    );
}
export default LoadingScreen;