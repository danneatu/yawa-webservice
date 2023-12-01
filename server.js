import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

// Array to store game sessions
let sessions = []; 

// Function to generate a unique session ID
const generateSessionId = () => {
    return sessions.length + 1;
  };
  
  // Endpoint to create a new session
  app.post('/api/session', (req, res) => {
    const newSession = {
      id: generateSessionId(),
      startDate: new Date(),
      players: [],
    };
    sessions.push(newSession);
    res.json(newSession);
  });

// Clear all sessions
app.delete('/api/sessions/clear', (req, res) => {
    try {
      sessions = [];
      res.json({ message: 'All sessions cleared successfully.' });
    } catch (error) {
      console.error('Error clearing sessions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Endpoint to get available sessions
  app.get('/api/sessions', (req, res) => {
    res.json(sessions);
  });
  
  // Endpoint to join a session
  app.post('/api/session/:sessionId/join', (req, res) => {
    const sessionId = parseInt(req.params.sessionId);
    const playerName = req.body.player;
  
    const session = sessions.find((s) => s.id === sessionId);
  
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
  
    if (session.players.length >= 3) {
      return res.status(400).json({ error: 'Session is full' });
    }
  
    session.players.push({ name: playerName, id: session.players.length + 1, joinedAt: new Date() });
  
    res.json(session);
  });


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
