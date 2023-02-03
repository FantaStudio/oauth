import "core-js/actual";
import "promise-polyfill/src/polyfill";
import "whatwg-fetch";
// prettier-ignore
import "abortcontroller-polyfill/dist/polyfill-patch-fetch";

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

export { router };
