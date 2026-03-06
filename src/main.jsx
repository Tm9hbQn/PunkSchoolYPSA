import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/animations.css";
import PunkSchoolBase from "./PunkSchoolBase";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PunkSchoolBase />
  </StrictMode>
);
