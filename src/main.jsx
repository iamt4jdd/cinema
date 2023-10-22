import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { DataProvider, AuthProvider } from "./Context";
import "./input.css";

const loadingMarkup = (
  <div className="fixed top-[50%] mx-auto text-center">
    <h3>Loading..</h3>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <AuthProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AuthProvider>
    </React.StrictMode>
  </Suspense>
);
