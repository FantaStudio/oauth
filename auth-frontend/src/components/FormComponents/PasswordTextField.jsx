import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import FormTextField from "./FormTextField";

const PasswordTextField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormTextField
            {...props}
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
                <>
                    {showPassword ? (
                        <IconButton
                            aria-label="hide password"
                            style={{ padding: 0 }}
                            onClick={() => setShowPassword(false)}
                        >
                            <VisibilityOff />
                        </IconButton>
                    ) : (
                        <IconButton
                            aria-label="show password"
                            style={{ padding: 0 }}
                            onClick={() => setShowPassword(true)}
                        >
                            <Visibility />
                        </IconButton>
                    )}
                </>
            }
        />
    );
};

export default PasswordTextField;
