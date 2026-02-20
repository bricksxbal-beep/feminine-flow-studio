import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Apply dark mode from localStorage before render to avoid flash
const darkMode = localStorage.getItem('ciclo_dark_mode');
if (darkMode === 'true') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
