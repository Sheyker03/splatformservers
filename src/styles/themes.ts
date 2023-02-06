import {createTheme} from "@mui/material";
import {darkTheme} from "./styled-components/themes/DarkTheme";
import {lightTheme} from "./styled-components/themes/LightTheme";

export const themes = {
    Dark:createTheme(darkTheme),
    Light:createTheme(lightTheme)
}