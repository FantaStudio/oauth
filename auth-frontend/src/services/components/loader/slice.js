import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        showLoader(state) {
            state.visible = true;
        },
        hideLoader(state) {
            state.visible = false;
        },
    },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export const selectLoaderInfo = (state) => state.loader;
export default loaderSlice.reducer;
