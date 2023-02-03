import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import * as React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import loginSchema from "../../../../../../utils/validation/loginValidation";
import FormTextField from "../../../../components/FormComponents/FormTextField";
import PasswordTextField from "../../../../components/FormComponents/PasswordTextField";
import routes from "../../../../router/routes";
import { selectAuthInfo, userLogin } from "../../../../services/auth/slice";

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { isValid },
        setError,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
        resolver: yupResolver(loginSchema),
    });

    const dispatch = useDispatch();
    const authInfo = useSelector(selectAuthInfo);

    /// Устанавливаем ошибку под нужным полем с бэка
    useEffect(() => {
        if (authInfo.fieldError?.field && authInfo.fieldError?.message) {
            setError(authInfo.fieldError.field, {
                type: "custom",
                message: authInfo.fieldError?.message,
            });
        }
    }, [authInfo.fieldError, setError]);

    const onSubmit = (data) => {
        dispatch(userLogin(data));
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
                    Авторизация
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

                <PasswordTextField
                    control={control}
                    margin="normal"
                    id="password"
                    label="Пароль"
                    name="password"
                    required
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isValid}
                >
                    Отправить
                </Button>
                <Grid container justifyContent="center">
                    <Grid
                        fontFamily="Roboto,Helvetica,Arial,sans-serif"
                        textAlign="center"
                    >
                        <p>Ещё нет аккаунта?</p>
                        <Link to={routes.register.path}>
                            Зарегистрироваться
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;
