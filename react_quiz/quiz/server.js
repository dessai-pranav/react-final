import fs from "fs";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Read the JSON file
const data = JSON.parse(fs.readFileSync("./src/data/questions.json", "utf8"));

// Route to send questions
app.get("/questions", (req, res) => {
  res.json(data);
  console.log(data);
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
