import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/slice";
import alertReducer from "./services/components/alert/slice";
import loaderReducer from "./services/components/loader/slice";
import userReducer from "./services/user/slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        alert: alertReducer,
        loader: loaderReducer,
    },
});
