import { AppBar, Typography, Toolbar, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export default function NavBar({ darkMode, toggleDarkMode }:Props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">Re-STORE</Typography>
                <IconButton onClick={toggleDarkMode }>
                    {darkMode ? <DarkMode /> : <LightMode sx={{color:'yellow'}} />}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}