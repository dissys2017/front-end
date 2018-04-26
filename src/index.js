import React from "react";
import ReactDOM from "react-dom";
import { AppRoutes } from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "antd/dist/antd.css";

ReactDOM.render(<AppRoutes />, document.getElementById("root"));
registerServiceWorker();
