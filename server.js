// server.mjs (or server.js if using Node.js 14+ with ESM support)

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const sessions = [];

app.post('/api/session', (req, res) => {
  const newSession = {
    id: sessions.length + 1,
    players: [req.body.player],
    gameState: 'initialized',
  };
  console.log(newSession)
  sessions.push(newSession);
  res.json(newSession);
});

app.get('/api/session/:id', (req, res) => {
  const sessionId = parseInt(req.params.id);
  const session = sessions.find((s) => s.id === sessionId);
  res.json(session);
});

app.post('/api/session/:id/join', (req, res) => {
  const sessionId = parseInt(req.params.id);
  const session = sessions.find((s) => s.id === sessionId);
  if (session) {
    session.players.push(req.body.player);
    res.json(session);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
