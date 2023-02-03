import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const FormCheckboxLabel = ({ label, name, control, rules, ...props }) => {
    const { field, fieldState } = useController({
        name: name,
        control: control,
        rules: rules,
    });
    const { onChange, value, ...fieldProps } = field;

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        {...fieldProps}
                        {...props}
                    />
                }
                label={label}
            />
            {fieldState?.error && fieldState.isTouched && (
                <FormHelperText error>
                    {fieldState?.error.message}
                </FormHelperText>
            )}
        </>
    );
};

export default FormCheckboxLabel;
