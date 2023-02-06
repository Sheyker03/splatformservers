import { Button } from '@mui/material';
import React from 'react';
import {useFormValidator} from "../FormValidator";

const ButtonValid = () => {
    const form = useFormValidator()


    const checkValid = () => {
        form!.checkValid()
    }

    return (
        <Button onClick={checkValid} variant={"contained"}>
            Test
        </Button>
    );
};

export default ButtonValid;