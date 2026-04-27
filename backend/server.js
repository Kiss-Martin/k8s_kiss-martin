const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS explicit beállítás (nem kötelező, de stabilabb)
app.use(cors({
  origin: "*", // vagy konkrétan: "http://k8s-beadando-kiss-martin.jcloud.jedlik.cloud"
  methods: ["GET"]
}));

app.use(express.json());

// Egyszerű "adatbázis"
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
    res.status(404).json({ error: "Nincs adat ehhez a rendezőhöz" });
  }
});

app.get('/', (req, res) => {
  const frontendHost = 'http://k8s-beadando-kiss-martin.jcloud.jedlik.cloud';

  res.send(`
    <h1>k8s-beadando API</h1>
    <ul>
      <li><a href="${frontendHost}">Frontend</a></li>
      <li><code>/director/Christopher%20Nolan</code></li>
      <li><a href="/directors">/directors</a></li>
    </ul>
  `);
});

app.get('/directors', (req, res) => {
  res.json({ directors: Object.keys(directors) });
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server fut: http://0.0.0.0:${PORT}`);
});