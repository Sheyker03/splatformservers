import React, {createContext, useContext, useState} from 'react';
import {Stack} from "@mui/material";
import {DispatchedActionType, FieldValidEnum, FieldValidState} from "./validation/FieldValid";

type FormValidatorPropsType = {
    children?: any,
    validations?: ValidationDataType[]
}

type ValidationDataType = {
    validationId: string | number | boolean,
    rules: RuleType[]
}

type RuleType = {
    rule: (val: string | number | undefined) => boolean,
    output: DispatchedActionType[]
}

type FormValidatorTypes = {
    addValidField: (key: string | number, ref: FieldValidState) => void,
    checkValid: () => void
}

const FormValidatorContext = createContext<FormValidatorTypes | null>(null)

const FormValidator: React.FC<FormValidatorPropsType> = (
    {children, validations}
) => {
    const [fieldsState, setFieldsState] = useState<Map<number | string, FieldValidState>>(new Map())

    const addValidField = (key: string | number, validState: FieldValidState) => {
        setFieldsState(fieldsState.set(key, validState))
    }

    const checkValid = () => {
        fieldsState.forEach((field) => {
            field.reset()
        })

        validations?.forEach((valid) => {
            fieldsState.forEach((field) => {
                if (field.validationId?.includes(valid.validationId) || valid.validationId === true){
                    valid.rules.forEach((rule) => {
                        if(rule.rule((field.ref.current! as {value: any}).value)){
                            rule.output.forEach((output) => {
                                field.dispatch(output)
                            })
                        }
                    })
                }
            })
        })
    }


    return (
        <FormValidatorContext.Provider value={{
            addValidField,
            checkValid
        }}>
            <Stack spacing={2}>
                {children}
            </Stack>
        </FormValidatorContext.Provider>
    );
};

export const useFormValidator = () => useContext(FormValidatorContext)
export default FormValidator;
