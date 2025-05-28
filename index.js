import './db.js';
import express from 'express';
import './db.js';
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// a simple health check
app.get('/', (req, res) => {
  res.send('🚂 Rail Logistics Simulation API is up!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
