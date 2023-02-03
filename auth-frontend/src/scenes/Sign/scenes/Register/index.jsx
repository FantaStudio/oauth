import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerSchema from "../../../../../../utils/validation/registerValidation";
import FormCheckboxLabel from "../../../../components/FormComponents/FormCheckboxLabel";
import FormTextField from "../../../../components/FormComponents/FormTextField";
import PasswordTextField from "../../../../components/FormComponents/PasswordTextField";
import routes from "../../../../router/routes";
import { selectAuthInfo, userRegister } from "../../../../services/auth/slice";
import Captcha from "./components/Captcha";

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: { isValid },
        setError,
    } = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: "",
            passwordConfirmation: "",
            policyConfirmation: false,
        },
        mode: "onBlur",
        resolver: yupResolver(registerSchema),
    });

    const dispatch = useDispatch();
    const authInfo = useSelector(selectAuthInfo);

    const [validCaptcha, setValidCaptcha] = useState(false);

    /// Устанавливаем ошибку под нужным полем с бэка
    useEffect(() => {
        if (authInfo.fieldError?.field && authInfo.fieldError?.message) {
            setError(authInfo.fieldError.field, {
                type: "custom",
                message: authInfo.fieldError?.message,
            });
            setValidCaptcha(false);
        }
    }, [authInfo.fieldError, setError]);

    const onCaptchaSubmit = () => {
        setValidCaptcha(true);
    };

    const onSubmit = (data) => {
        dispatch(userRegister(data));
    };

    return (
        <Container>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{ mt: 1 }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    textAlign="center"
                    marginY={3}
                >
                    Регистрация
                </Typography>

                <FormTextField
                    control={control}
                    margin="normal"
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    required
                />
                <FormTextField
                    control={control}
                    margin="normal"
                    id="username"
                    label="Имя"
                    name="username"
                    autoComplete="name"
                    required
                />
                <PasswordTextField
                    control={control}
                    margin="normal"
                    id="password"
                    label="Пароль"
                    name="password"
                    required
                />
                <PasswordTextField
                    control={control}
                    margin="normal"
                    id="passwordConfirmation"
                    label="Пароль"
                    name="passwordConfirmation"
                    required
                />

                <FormCheckboxLabel
                    label="Подтверждаю, что даю согласие на обработку персональных данных"
                    control={control}
                    id="policyConfirmation"
                    name="policyConfirmation"
                    color="primary"
                    required
                />

                <Captcha onValid={onCaptchaSubmit} captchaLength={8} />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isValid || !validCaptcha}
                >
                    Отправить
                </Button>
                <Grid container justifyContent="center">
                    <Grid
                        fontFamily="Roboto,Helvetica,Arial,sans-serif"
                        textAlign="center"
                    >
                        <p>Уже есть аккаунт?</p>
                        <Link to={routes.login.path}>Войти</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;
