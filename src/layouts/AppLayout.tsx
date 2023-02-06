import React, {useState} from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import {Outlet} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import {themes} from "../styles/themes";

// type AppLayoutPropsType = {
//     children: any
// }

const AppLayout = () => {
    const [theme] = useState(themes.Light)

    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Content>
                <Outlet/>
            </Content>
            <Footer/>
        </ThemeProvider>
    );
};

export default AppLayout;