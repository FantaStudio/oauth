import React from "react";
import Login from "../scenes/Sign/scenes/Login";
import Register from "../scenes/Sign/scenes/Register";

const routes = {
    register: {
        path: "/register",
        element: <Register />,
    },
    login: {
        path: "/login",
        element: <Login />,
    },
};

export default routes;
