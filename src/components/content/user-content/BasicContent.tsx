import React from 'react';
import {Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
const BasicContent = ({
                          children,
                          title,
                          titleSize = "h2",
                          widthSize = 6
}: {
    children?: any,
    title?: string | null,
    titleSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
    widthSize?: 2 | 4 | 6 | 8 | 10 | 12
}) => {
    const indent = (12 - widthSize) / 2
    return (
        <Grid
            container
        >
            <Grid xs={12} sx={{textAlign: 'center'}}>
                <Typography variant={titleSize} color={"primary"}>{title}</Typography>
            </Grid>
            <Grid xsOffset={indent} xs={widthSize} mdOffset={indent} sx={{mt: 2}}>
                {children}
            </Grid>
        </Grid>
    );
};

export default BasicContent;