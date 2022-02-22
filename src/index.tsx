import "crypto";
import "crypto-browserify";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StoreProvider from "./providers/StoreProvider";
import RouterProvider from "./providers/RouterProvider";
import DarkTerminalThemeProvider from "./lib/theme";
import AuthProviderWalletWrapper from "./providers/AuthProviderWalletWrapper";
import AuthDarkTerminalClassWrapper from "./providers/AuthDarkTerminalClassWrapper";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <AuthProviderWalletWrapper>
        <AuthDarkTerminalClassWrapper>
          <DarkTerminalThemeProvider>
            <RouterProvider>
              <App />
            </RouterProvider>
          </DarkTerminalThemeProvider>
        </AuthDarkTerminalClassWrapper>
      </AuthProviderWalletWrapper>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
