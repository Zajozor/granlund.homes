import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import Navbar from "./components/Navbar";

import "./App.css";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme appearance="dark">
        <Navbar />
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
