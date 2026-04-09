import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'dist' (generada por Vite)
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// Ruta de salud para el servidor
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Cualquier otra ruta sirve el index.html de la SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
