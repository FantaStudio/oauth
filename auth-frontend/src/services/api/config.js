import axios from "axios";
import routes from "../../router/routes";
import { store } from "../../store";
import { showErrorAlert } from "../components/alert/slice";
import tokenHelper from "../token";

const apiInstance = axios.create({
    baseURL: "http://localhost:5000/api/user/",
    headers: {
        "Content-Type": "application/json",
    },
});

/// Если имеется Access Token, добавляем его в заголовки по дефолту
apiInstance.interceptors.request.use(
    (config) => {
        const token = tokenHelper.getLocalAccessToken();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const data = error?.response;
        const originalConfig = error.config;

        /// Если произошла ошибка авторизации, пытаемся рефрешнуть Access Token
        if (
            data?.status === 401 &&
            originalConfig.url !== routes.login.path &&
            !originalConfig._retry
        ) {
            originalConfig._retry = true;
            try {
                const refreshTokenResponse = await apiInstance.post(
                    "/refreshToken",
                    {
                        refreshToken: tokenHelper.getLocalRefreshToken(),
                    }
                );

                const { accessToken } = refreshTokenResponse.data;
                tokenHelper.updateLocalAccessToken(accessToken);

                return apiInstance(originalConfig);
            } catch (_error) {
                return Promise.reject(_error);
            }
        } else if (data?.status === 403) {
            store.dispatch(showErrorAlert("Ошибка доступа"));
        } else if (data?.status === 500) {
            store.dispatch(showErrorAlert(data?.message));
        }
        console.log(data);
        return Promise.reject(error);
    }
);

const headers = () => {
    const token = tokenHelper.getLocalAccessToken();
    return token ? { "x-access-token": token } : null;
};

const post = (url, data, authorized = false) => {
    return apiInstance.post(url, data, {
        headers: authorized ? headers() : {},
    });
};

const get = (url, params, authorized = false) => {
    return apiInstance.get(url, {
        headers: authorized ? headers() : {},
        params,
    });
};

const api = {
    get,
    post,
};

export default api;
