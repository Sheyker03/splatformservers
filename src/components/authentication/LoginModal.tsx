import React, {useState} from 'react';
import {Box, Button, Container, Modal, Stack, Typography} from "@mui/material";
import {modalStyle} from "../../styles/styled-components/modalStyle";
import {useTranslation} from "react-i18next";

const LoginModal = () => {
    const [open, setOpen] = useState(false)

    const {t} = useTranslation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleOpen} size={"small"} color={"inherit"}>{t("App.AppHeader.SignIn.LoginButton")}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Container sx={{...modalStyle, width: '30%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant="h5">{t("App.AppHeader.SignIn.LoginModal.Header")}</Typography>
                    <Stack spacing={4} sx={{marginTop: 2}}>
                        
                    </Stack>
                </Container>
            </Modal>
        </>
    );
};

export default LoginModal;