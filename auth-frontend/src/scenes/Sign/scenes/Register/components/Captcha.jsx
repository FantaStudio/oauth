import { Done } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";

const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function generateCaptcha(length) {
    let captcha = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        captcha += charset.charAt(Math.floor(Math.random() * n));
    }
    return captcha;
}

const Captcha = ({ captchaLength = 6, ...props }) => {
    const refId = useRef(
        Date.now().toString(36) + Math.random().toString(36).substring(2)
    );

    const [captchaOptions, setCaptchaOptions] = useState({
        captcha: generateCaptcha(captchaLength),
        enteredCaptcha: "",
        error: "",
        success: false,
    });

    useEffect(() => {
        let canvas = document.getElementById(`captchaCanvas_${refId.current}`);
        let ctx = canvas.getContext("2d");
        let text = captchaOptions.captcha;
        let lineHeight = 30;
        let lines = text.split("\n");
        const length = captchaLength;

        // Рисуем капчу
        ctx.canvas.width = parseInt(length) * 25;
        ctx.canvas.height = lines.length * lineHeight;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textBaseline = "middle";
        ctx.font = "italic 20px Arial";
        ctx.fillStyle = "white";

        let num = 0;
        for (let i = 0; i < parseInt(length); i++) {
            num = parseInt(num) + 1;
            let height_num = 20 * num;
            ctx.fillText(
                text[i],
                height_num,
                Math.round(Math.random() * (15 - 12) + 12)
            );
        }
    }, [captchaOptions.captcha, refId, captchaLength]);

    const refreshCaptcha = () => {
        setCaptchaOptions((prev) => ({
            ...prev,
            captcha: generateCaptcha(captchaLength),
            error: "",
            success: "",
        }));
    };

    const submitCaptcha = () => {
        if (captchaOptions.enteredCaptcha == captchaOptions.captcha) {
            setCaptchaOptions((prev) => ({
                ...prev,
                error: "",
                success: true,
            }));
            props.onValid?.();
        } else {
            setCaptchaOptions((prev) => ({
                ...prev,
                enteredCaptcha: "",
                error: captchaOptions.enteredCaptcha
                    ? "Капча введена неверно"
                    : "Введите капчу",
                success: false,
            }));
        }
    };

    const onChangeCaptcha = (event) => {
        setCaptchaOptions((prev) => ({
            ...prev,
            enteredCaptcha: event.target.value,
        }));
    };

    return (
        <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex" }}>
                <canvas id={`captchaCanvas_${refId.current}`}></canvas>
                <IconButton sx={{ ml: 1 }} onClick={refreshCaptcha}>
                    <RefreshIcon />
                </IconButton>
            </div>
            <div style={{ marginTop: "20px", display: "flex" }}>
                <TextField
                    id={props.id}
                    required={props.required}
                    helperText={props.helperText}
                    size="small"
                    error={!!captchaOptions.error}
                    label={props.label}
                    autoFocus={props.autoFocus}
                    type="text"
                    InputProps={{
                        endAdornment: captchaOptions.success && (
                            <InputAdornment
                                style={{ height: "100%" }}
                                position="end"
                            >
                                <IconButton>
                                    <Done color="success" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={onChangeCaptcha}
                    value={captchaOptions.enteredCaptcha}
                />
                <Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    onClick={submitCaptcha}
                >
                    Проверить
                </Button>
            </div>
            {captchaOptions?.error && (
                <FormHelperText error>{captchaOptions?.error}</FormHelperText>
            )}
        </div>
    );
};

export default Captcha;
