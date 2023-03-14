import React from "react";
import {Autocomplete, TextField} from "@mui/material";

interface IProps {
    label: string
    options: {label: string, id: string}[]
    disabled: boolean
    onChange?: (event: React.SyntheticEvent, newValue: any) => void
    onInputChange?: (event: React.SyntheticEvent, newValue: string) => void
}

export function AutoComplete(props: IProps) {

    const {label, options, disabled, onInputChange, onChange} = props;

    return (
        <Autocomplete
            onInputChange={(event, newValue) => {
                onInputChange && onInputChange(event, newValue)
            }}
            onChange={(event, newValue) => {
                onChange && onChange(event, newValue)
            }}
            disablePortal
            disabled={disabled}
            disableClearable
            fullWidth
            options={options}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    )
}
