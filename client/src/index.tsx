import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/dropzone/styles.css";
import "@mantine/core/styles.css";
import App from "./App";
import { MantineProvider, createTheme } from "@mantine/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  fontFamily: "syncSwap, sans-serif",
  other: { bodyBackground: "#efeefe" },
});

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
