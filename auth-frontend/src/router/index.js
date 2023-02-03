import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ErrorPage";
import Home from "../scenes/Home";
import routes from "./routes";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            {Object.keys(routes).map((routeKey) => (
                <Route key={routeKey} {...routes[routeKey]} />
            ))}
        </Route>
    )
);

export default router;
