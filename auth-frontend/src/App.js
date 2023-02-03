import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import Alert from "./components/Alert";
import Loader from "./components/Loader";
import { store } from "./store";
function App() {
    return (
        <Provider store={store}>
            <Alert />
            <Outlet />
            <Loader />
        </Provider>
    );
}

export default App;
