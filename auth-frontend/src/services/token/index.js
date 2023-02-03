const getLocalRefreshToken = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    return tokens?.refreshToken;
};

const getLocalAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    return tokens?.accessToken;
};

const updateLocalAccessToken = (token) => {
    let tokens = JSON.parse(localStorage.getItem("tokens"));
    tokens.accessToken = token;
    localStorage.setItem("tokens", JSON.stringify(tokens));
};

const setLocalTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
};

const clearTokens = () => {
    localStorage.removeItem("tokens");
};

export default {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    setLocalTokens,
    clearTokens,
};
