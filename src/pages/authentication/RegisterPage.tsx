import React, {useState} from 'react';
import BasicContent from "../../components/content/user-content/BasicContent";
import {useTranslation} from "react-i18next";
import FormValidator from "../../components/authentication/auth-components/FormValidator";
import FieldValid, {FieldValidEnum} from "../../components/authentication/auth-components/validation/FieldValid";
import ButtonValid from "../../components/authentication/auth-components/validation/ButtonValid";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Zoom} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {LoadingButton} from "@mui/lab";

const RegisterPage = () => {
    const {t} = useTranslation()
    const [discordChecked, setDiscordChecked] = useState(false)

    return (
        <BasicContent
            title={t('App.AppHeader.SignUp.SignUp')}
            titleSize={"h3"}
            widthSize={6}
        >
            <FormValidator
            validations={[
                {
                    validationId: true,
                    rules: [
                        {
                            rule: (val) => {
                                return (val as String) === ""
                            },
                            output: [
                                {
                                    type: FieldValidEnum.ERROR,
                                    payload: true
                                },
                                {
                                    type: FieldValidEnum.HELPER_TEXT,
                                    payload: "123123123"
                                }
                            ]
                        }
                    ],
                }
            ]}
            >
                <FieldValid
                    necessarily
                    size={"small"}
                    label={"Nickname"}
                />
                <FieldValid
                    necessarily
                    size={"small"}
                    label={"Real name"}
                />
                <Grid2 container>
                    <Grid2 xs={10}>
                        <FieldValid
                            necessarily
                            size={"small"}
                            label={"Discord login"}
                        />

                    </Grid2>
                    <Grid2 xs={2}>
                        <LoadingButton variant={"outlined"} onClick={()=>setDiscordChecked(true)}
                                       sx={{height: 40,
                                           width: '100%',
                                           borderColor: 'action.disabled'
                                       }}
                        >
                            <Zoom in={discordChecked} {...(discordChecked ? { timeout: 1000 } : {})}><CheckCircleRoundedIcon sx={{fontSize:40, position: 'absolute'}} color={"success"}></CheckCircleRoundedIcon></Zoom>
                            <RadioButtonUncheckedIcon color={discordChecked ? "success" : "primary"} sx={{fontSize: 40}}/>
                        </LoadingButton>
                    </Grid2>
                </Grid2>
                <FieldValid
                    necessarily
                    typeField={"select"}
                    size={"small"}
                    label={"Gender"}
                    items={[{value: "Male", label: "Male"}, {value: "Female", label: "Female"}]}
                />
                <FieldValid
                    necessarily
                    typeField={"date"}
                    size={"small"}
                    label={"Date of birth"}
                    items={[{value: "Male", label: "Male"}, {value: "Female", label: "Female"}]}
                />
                <FieldValid
                    size={"small"}
                    label={"Addable Info"}
                    multiline
                />
                <ButtonValid/>
            </FormValidator>
        </BasicContent>
    );
};

export default RegisterPage;