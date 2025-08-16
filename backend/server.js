const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;
const dataPath = path.join(__dirname, "characters.json");

app.use(cors());
app.use(express.json());

const readData = () => JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

app.get("/characters", (req, res) => {
  res.json(readData().characters);
});

app.post("/characters", (req, res) => {
  const { name, realName, universe } = req.body;
  if (!name || !realName || !universe) return res.status(400).json({ message: "Missing fields" });

  const data = readData();
  const nextId = data.characters.length ? Math.max(...data.characters.map(c => c.id)) + 1 : 1;
  const newChar = { id: nextId, name, realName, universe };

  data.characters.push(newChar);
  writeData(data);
  res.status(201).json(newChar);
});

app.put("/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, realName, universe } = req.body;
  const data = readData();

  const idx = data.characters.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: "Character not found" });

  data.characters[idx] = { id, name, realName, universe };
  writeData(data);
  res.json(data.characters[idx]);
});

app.delete("/characters/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();
  const before = data.characters.length;

  data.characters = data.characters.filter(c => c.id !== id);
  if (data.characters.length === before) return res.status(404).json({ message: "Character not found" });

  writeData(data);
  res.json({ message: "Character deleted" });
});

app.listen(PORT, () => console.log(` API up: http://localhost:${PORT}`));