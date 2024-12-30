import React from "react";
import './index.css'
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
