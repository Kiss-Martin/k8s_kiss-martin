const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Egyszerű "adatbázis" — rendező -> film
const directors = {
  "Bong Joon-ho": "Parasite",
  "Chloé Zhao": "Nomadland",
  "Sian Heder": "CODA",
  "Daniel Kwan & Daniel Scheinert": "Everything Everywhere All at Once",
  "Christopher Nolan": "Oppenheimer"
};

app.get("/director/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const movie = directors[name];

  if (movie) {
    res.json({ director: name, movie });
  } else {
    res.json({ error: "Nincs adat ehhez a rendezőhöz" });
  }
});

app.listen(3000, () => {
  console.log("Server fut a http://localhost:3000 címen");
});