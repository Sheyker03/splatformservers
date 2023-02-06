import React, {
    createRef,
    Dispatch,
    MutableRefObject,
    Reducer, RefObject,
    useEffect, useId,
    useReducer,
    useRef,
    useState
} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import {useFormValidator} from "../FormValidator";
import {DatePicker} from "@mui/x-date-pickers";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";

export type FieldValidState = {
    validationId: (string | number | boolean)[],
    ref: RefObject<HTMLInputElement>,
    dispatch: Dispatch<DispatchedActionType>,
    reset: () => void
}

export enum FieldValidEnum {
    HELPER_TEXT,
    ERROR,
    WARNING,
    RESET
}

export type DispatchedActionType = {
    type: FieldValidEnum,
    payload?: string | boolean | FieldValidationDataTypes
}

type FieldValidPropsType = {
    validationId?: (string | number | boolean)[]
    typeField?: "text" | "date" | "numbers" | "discord" | "select",
    idField?: string | number,
    defaultValue?: string,
    label?: string,
    necessarily?: boolean,
    id?: "outlined-required" | "outlined-disabled" | "outlined-password-input" | "outlined-read-only-input" | "outlined-number" | "outlined-search" | "outlined-helperText" | "filled-required" | "filled-disabled" | "filled-password-input" | "filled-read-only-input" | "filled-number" | "filled-search" | "filled-helperText" | "standard-required" | "standard-disabled" | "standard-password-input" | "standard-read-only-input" | "standard-number" | "standard-search" | "standard-helperText",
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>,
    multiline?: boolean,
    helperText?: string | React.ReactElement,
    items?: {value: string | number, label: string}[]
}


type FieldValidationDataTypes = {
    [FieldValidEnum.HELPER_TEXT]: string | React.ReactElement |null,
    [FieldValidEnum.ERROR]: boolean,
    [FieldValidEnum.WARNING]: boolean
}

const reducer = (state: FieldValidationDataTypes, action: DispatchedActionType) => {
    if(action.type === FieldValidEnum.RESET)
        return (action.payload as FieldValidationDataTypes)
    return {...state, [action.type]: action.payload}
}


const FieldValid: React.FC<FieldValidPropsType> = ({
                                                       validationId,
                                                       typeField = "text",
                                                       defaultValue,
                                                       label,
                                                       necessarily = false,
                                                       id = "outlined-required",
                                                       size = "medium",
                                                       multiline = false,
                                                       helperText,
                                                       items
}) => {
    const initialState: FieldValidationDataTypes = {[FieldValidEnum.HELPER_TEXT]: helperText ? helperText : null, [FieldValidEnum.ERROR]: false, [FieldValidEnum.WARNING]: false}
    const [state, dispatch] = useReducer<Reducer<FieldValidationDataTypes, DispatchedActionType>>(reducer, initialState)
    const [value, setValue] = useState<string | number |  undefined>("")

    const identificator = useId()

    const form = useFormValidator()
    const ref = useRef<HTMLInputElement>(null)


    const reset = () => {
        dispatch({
            type: FieldValidEnum.RESET,
            payload: initialState
        })
    }

    useEffect(()=>{
        const validState: FieldValidState = {validationId: validationId!, ref: ref, dispatch: dispatch, reset: reset}
        form!.addValidField(identificator, validState)
    }, [ref, identificator])

    const handleChangeValue = (e: SelectChangeEvent | any) => {
        if(e.target)
            setValue(e.target.value)
        else
            setValue(e)
    }


    return (
        typeField === "text" ? <TextField
                sx={{
                    '& input + fieldset': {borderColor: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'},
                    '& label': {color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}
                }}
                inputRef={ref}
                error={state[FieldValidEnum.ERROR]}
                required={necessarily}
                id={id}
                label={label}
                defaultValue={defaultValue}
                fullWidth
                size={size}
                multiline={multiline}
                rows={multiline ? 4 : 0}
                helperText={typeof state[FieldValidEnum.HELPER_TEXT] === "string" ? <span style={{position: 'absolute', marginTop: -5, color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}}>{state[FieldValidEnum.HELPER_TEXT]}</span> : state[FieldValidEnum.HELPER_TEXT]}
            />:
            typeField === "select" ? <FormControl sx={{ m: 1, minWidth: 120 }} size={size} required={necessarily} error={state[FieldValidEnum.ERROR]}>
                <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
                <Select
                    sx={{
                        '& input + fieldset': {borderColor: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'},
                        '& label': {color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}
                    }}
                    inputRef={ref}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label={label}
                    fullWidth
                    onChange={(e)=>handleChangeValue}
                    value={value}
                >
                    {items?.map((el) => <MenuItem key={el.value} value={el.value}>{el.label}</MenuItem>)}
                </Select>
                <FormHelperText>{typeof state[FieldValidEnum.HELPER_TEXT] === "string" ? <span style={{position: 'absolute', marginTop: -5, color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}}>{state[FieldValidEnum.HELPER_TEXT]}</span> : state[FieldValidEnum.HELPER_TEXT]}</FormHelperText>
            </FormControl> :
                typeField === "date" ?
                    <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue: any) => {
                            handleChangeValue(newValue);
                        }}
                        inputRef={ref}
                        renderInput={(params) => <TextField
                            {...params}
                            sx={{
                                '& input + fieldset': {borderColor: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'},
                                '& label': {color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}
                            }}
                            error={state[FieldValidEnum.ERROR]}
                            required={necessarily}
                            id={id}
                            defaultValue={defaultValue}
                            fullWidth
                            size={size}
                            helperText={typeof state[FieldValidEnum.HELPER_TEXT] === "string" ? <span style={{position: 'absolute', marginTop: -5, color: state[FieldValidEnum.WARNING] ? 'orange' : 'primary'}}>{state[FieldValidEnum.HELPER_TEXT]}</span> : state[FieldValidEnum.HELPER_TEXT]}
                        />}
                    />
                 : <></>
    );
};

export default FieldValid;