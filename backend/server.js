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

// Root route — provide a small HTML page to avoid "Cannot GET /" and help users
app.get('/', (req, res) => {
  const frontendHost = 'http://k8s-beadando-kiss-martin.jcloud.jedlik.cloud';
  const html = `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>k8s-beadando API</title></head>
  <body>
    <h1>k8s-beadando API</h1>
    <p>This endpoint serves the director → movie API.</p>
    <ul>
      <li>Try <a href="${frontendHost}">${frontendHost}</a> for the frontend.</li>
      <li>API: <code>/director/:name</code> — get JSON for a director (e.g. <code>/director/Christopher%20Nolan</code>).</li>
      <li>List directors: <a href="/directors">/directors</a></li>
    </ul>
  </body>
</html>`;
  res.set('Content-Type', 'text/html');
  res.send(html);
});

// Return JSON list of available directors
app.get('/directors', (req, res) => {
  res.json({ directors: Object.keys(directors) });
});

app.listen(3000, () => {
  console.log("Server fut a http://localhost:3000 címen");
});