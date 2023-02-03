import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: "success",
    open: false,
    message: "",
    title: "",
};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showErrorAlert(state, action) {
            state.type = "error";
            state.open = true;
            state.message = action.payload;
            state.title = "Ошибка";
        },
        showSuccessAlert(state, action) {
            state.type = "success";
            state.open = true;
            state.message = action.payload;
            state.title = "Успешно";
        },
        closeAlert(state) {
            state.type = "success";
            state.open = false;
            state.message = "";
            state.title = "";
        },
    },
});

export const { showErrorAlert, showSuccessAlert, closeAlert } =
    alertSlice.actions;
export const selectAlertInfo = (state) => state.alert;
export default alertSlice.reducer;
