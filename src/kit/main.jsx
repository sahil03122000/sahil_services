import React from "react";
import {createRoot} from "react-dom/client";
import Kit from "./Kit";
import "./kit.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Kit />
  </React.StrictMode>
);
