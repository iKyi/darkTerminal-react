import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import StoreProvider from "./providers/StoreProvider";
import RouterProvider from "./providers/RouterProvider";
import AuthProvider from "./providers/AuthProvider";
import DarkTerminalThemeProvider from "./lib/theme";

ReactDOM.render(
  <React.StrictMode>
    <DarkTerminalThemeProvider>
      <AuthProvider>
        <StoreProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </StoreProvider>
      </AuthProvider>
    </DarkTerminalThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
