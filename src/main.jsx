import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./authContext.jsx";
import "./input.css";

const loadingMarkup = (
  <div className="fixed top-[50%] mx-auto text-center">
    <h3>Loading..</h3>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallblack={loadingMarkup}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Suspense>
);
