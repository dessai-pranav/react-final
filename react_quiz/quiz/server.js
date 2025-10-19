import fs from "fs";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());

// Read JSON
const data = JSON.parse(fs.readFileSync("./src/data/questions.json", "utf8"));

// Root route
app.get("/", (req, res) => {
  res.send("Server is running. Go to /questions to see data.");
});

// Questions route
app.get("/questions", (req, res) => {
  res.json(data);
});

// Favicon route (optional)
app.get("/favicon.ico", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "favicon.ico"));
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
