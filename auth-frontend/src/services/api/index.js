import api from "./config";

const signUp = (user) => {
    return api.post("/signUp", user);
};

const login = (authData) => {
    return api.post("/login", authData);
};

const checkEmail = (email) => {
    return api.post("/checkEmail", { email: email });
};

const testJwt = () => {
    return api.get("/test", undefined, true);
};

export default { signUp, login, checkEmail, testJwt };
