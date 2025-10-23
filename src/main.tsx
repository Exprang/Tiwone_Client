import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./store/queryClient";
// import { AuthProvider } from "./features/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
    {/* <AuthProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </AuthProvider> */}
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
