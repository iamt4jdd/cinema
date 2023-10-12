import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./Context"
import "./input.css";

const loadingMarkup = (
  <div className="fixed top-[50%] mx-auto text-center">
    <h3>Loading..</h3>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <Provider>
        <App />
      </Provider>
    </React.StrictMode>
  </Suspense>
);
