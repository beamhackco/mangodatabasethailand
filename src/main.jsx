import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Route from "./route.jsx";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Prompt",
        },
        components: {
          Statistic: {
            titleFontSize: "18px",
          },
        },
      }}
    >
      <Route />
    </ConfigProvider>
  </React.StrictMode>
);
