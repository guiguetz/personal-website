import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// O HTML dentro de #root foi pré-renderizado (SSG) e pinta instantaneamente;
// o React monta por cima em seguida (sem hidratação, evitando mismatches).
createRoot(document.getElementById("root")!).render(<App />);
