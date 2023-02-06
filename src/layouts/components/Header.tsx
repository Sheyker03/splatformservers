import React from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import LoginModal from "../../components/authentication/LoginModal";
import AppSettings from '../сontext/AppSettings';

const Header = () => {



    return (
        <Box sx={{height: 'appbar.height'}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            NoReturn
                        </IconButton>
                    </Typography>
                    <LoginModal/>
                    <AppSettings/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;