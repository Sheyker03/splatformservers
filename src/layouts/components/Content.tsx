import React from 'react';
import {Container} from "@mui/material";

type ContentPropsType = {
    children: any
}

const Content: React.FC<ContentPropsType> = ({children}) => {
    return (
            <Container
                maxWidth={"lg"}
                sx={{
                    minHeight: '84%',
                    border: '1px solid red',
                    p: 1,
                    mb: 1,
                    mt: 1,
                    backgroundColor: 'background.default',
            }}

            >
                {children}
            </Container>
    );
};

export default Content;