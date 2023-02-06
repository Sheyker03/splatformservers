import React, {useState} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SwipeableDrawer,
    Typography
} from "@mui/material";
import {Masonry} from "@mui/lab";
import {resourcesForI18N} from "../../i18n";
import {useTranslation} from "react-i18next";

const AppSettings = () => {
    const {t, i18n} = useTranslation()
    const [swpDrwOpen, setSwpDrwOpen] = useState(false)
    const [language, setLanguage] = useState<string>(i18n.language)

    const handleOpen = () => {
        setSwpDrwOpen(true)
    }

    const handleCancel = () => {
        setSwpDrwOpen(false)
    }

    const handleChangeLanguage = (lng: any) => {
        setLanguage(lng.target.value)
        i18n.changeLanguage(lng.target.value)
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <SettingsIcon/>
            </IconButton>
            <SwipeableDrawer
                anchor={"right"}
                open={swpDrwOpen}
                onOpen={handleOpen}
                onClose={handleCancel}
            >
                <Container sx={{width: 250, marginTop: 2, alignItems: 'center'}}>
                    <Masonry columns={1} spacing={2}>
                        <Typography variant="h6">
                            {t('App.Settings.Settings')}
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t('App.Settings.Language')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Language"
                                value={language}
                                onChange={handleChangeLanguage}
                            >
                                {Object.keys(resourcesForI18N).map((el) =>
                                    <MenuItem key={el} value={el}>{t(`Languages.${el}`)}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t('App.Settings.Theme')}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Theme"
                            >
                                <MenuItem>Здесь будут темы</MenuItem>
                            </Select>
                        </FormControl>
                    </Masonry>
                </Container>
            </SwipeableDrawer>
        </>
    );
};

export default AppSettings;