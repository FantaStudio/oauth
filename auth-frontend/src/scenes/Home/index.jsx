import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../router/routes";
import tokenHelper from "../../services/token";
import { userAccessTest } from "../../services/user/slice.js";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = tokenHelper.getLocalAccessToken();

    const logout = () => {
        tokenHelper.clearTokens();
        window.location.reload();
    };

    const test = () => {
        dispatch(userAccessTest());
    };

    return (
        <Container>
            <Box sx={{ mt: 1 }}>
                <Typography
                    variant="h5"
                    component="h1"
                    textAlign="center"
                    marginY={3}
                >
                    Главная
                </Typography>
                {!accessToken && (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => navigate(routes.register.path)}
                    >
                        Регистрация
                    </Button>
                )}
                {!accessToken && (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => navigate(routes.login.path)}
                    >
                        Авторизация
                    </Button>
                )}
                {accessToken && (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={test}
                    >
                        Тест
                    </Button>
                )}
                {accessToken && (
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={logout}
                    >
                        Выйти из аккаунта
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default Home;
