import { createSlice } from "@reduxjs/toolkit";
import { router } from "../../index";
import routes from "../../router/routes";
import api from "../api";
import { showErrorAlert, showSuccessAlert } from "../components/alert/slice";
import { hideLoader, showLoader } from "../components/loader/slice";
import tokenHelper from "../token";
import { setUser } from "../user/slice";

const initialState = {
    error: "",
    fieldError: { field: "", message: "" },
    success: "",
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        setSuccess(state, action) {
            state.success = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setFieldError(state, action) {
            state.fieldError = action.payload;
        },
    },
});

export const { setError, setSuccess, setIsLoading, setFieldError } =
    authSlice.actions;

export const userRegister = (userData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(showLoader());

    try {
        await api.signUp(userData);
        dispatch(showSuccessAlert("Вы успешно зарегистрировались"));

        router.navigate(routes.login.path);
    } catch (error) {
        if (
            error &&
            error.response?.status === 400 &&
            error?.response?.data?.field
        ) {
            dispatch(setFieldError(error.response.data));
        } else {
            dispatch(setError(error?.response?.message));
        }
    } finally {
        dispatch(setIsLoading(false));
        dispatch(hideLoader());
    }
};

export const userLogin = (userData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(showLoader());
    try {
        const response = await api.login(userData);
        tokenHelper.setLocalTokens({
            accessToken: response.data?.accessToken,
            refreshToken: response.data?.refreshToken,
        });
        dispatch(
            setUser({
                username: response.data?.username,
                email: response.data?.email,
            })
        );
        dispatch(showSuccessAlert("Вы успешно вошли в аккаунт"));

        router.navigate("/");
    } catch (error) {
        if (error && error.response?.status === 400) {
            const data = error?.response?.data;
            if (data?.field) {
                dispatch(setFieldError(data));
            } else if (data?.message) {
                dispatch(showErrorAlert(data.message));
            }
        } else {
            dispatch(setError(error?.response?.message));
        }
    } finally {
        dispatch(setIsLoading(false));
        dispatch(hideLoader());
    }
};

export const selectAuthInfo = (state) => state.auth;
export default authSlice.reducer;
