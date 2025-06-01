import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; // o AppRouter, según cómo lo exportes
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ Muy importante */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
