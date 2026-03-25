import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply saved theme before first paint to prevent flash
const saved = localStorage.getItem("theme");
if (saved === "dark") document.documentElement.classList.add("dark");

// Activate dot grid background
document.body.classList.add("bg-dots");

createRoot(document.getElementById("root")!).render(<App />);
