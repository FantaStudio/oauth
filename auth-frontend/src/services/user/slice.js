import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { showSuccessAlert } from "../components/alert/slice";
import { hideLoader, showLoader } from "../components/loader/slice";

const initialState = {
    email: "",
    username: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        clearUserInfo(state) {
            state.username = "";
            state.email = "";
        },
    },
});

export const userAccessTest = () => async (dispatch) => {
    try {
        dispatch(showLoader());
        await api.testJwt();
        dispatch(showSuccessAlert("Тест"));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(hideLoader());
    }
};

export const { setUser, clearUserInfo } = userSlice.actions;
export const getUserInfo = (state) => state;
export default userSlice.reducer;
