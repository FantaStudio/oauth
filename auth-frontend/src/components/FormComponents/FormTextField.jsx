import { FormHelperText, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const FormTextField = ({
    name,
    control,
    rules,
    endAdornment,
    onChange,
    ...props
}) => {
    const { field, fieldState } = useController({
        name: name,
        control: control,
        rules: rules,
    });

    const onChangeInput = (e) => {
        field.onChange(e);
        onChange && onChange(e);
    };

    return (
        <>
            <TextField
                {...field}
                {...props}
                size="small"
                error={!!fieldState?.error}
                fullWidth={true}
                InputProps={{
                    endAdornment: endAdornment && (
                        <InputAdornment
                            style={{ height: "100%" }}
                            position="end"
                        >
                            {endAdornment}
                        </InputAdornment>
                    ),
                }}
                onChange={onChangeInput}
            />
            {fieldState?.error && fieldState.isTouched && (
                <FormHelperText error>
                    {fieldState?.error.message}
                </FormHelperText>
            )}
        </>
    );
};

export default FormTextField;
