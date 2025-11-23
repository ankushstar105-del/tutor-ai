const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/api/get_notes", async (req, res) => {
  const topic = req.body.query;
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`);
    const data = await response.json();
    res.json({ answer: data.extract || "No summary found for this topic." });
  } catch (err) {
    console.error(err);
    res.json({ answer: "Error fetching notes from Wikipedia." });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
