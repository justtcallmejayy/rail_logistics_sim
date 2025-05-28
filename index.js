import express from "express";
import db from "./db.js";
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// a simple health check
app.get("/", (req, res) => {
  res.send("🚂 Rail Logistics Simulation API is up!");
});
app.get("/trains", (req, res) => {
  const sql = "SELECT * FROM trains";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error querying trains:", err.message);
      return res.status(500).json({ error: "Failed to fetch trains" });
    }
    res.json(rows);
  });
});
// GET all shipments (with optional train_id filter)
app.get("/shipments", (req, res) => {
  const { train_id } = req.query;
  let sql = "SELECT * FROM shipments";
  const params = [];

  if (train_id) {
    sql += " WHERE train_id = ?";
    params.push(train_id);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Error querying shipments:", err.message);
      return res.status(500).json({ error: "Failed to fetch shipments" });
    }
    res.json(rows);
  });
});

// GET a single shipment by ID
app.get("/shipments/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM shipments WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching shipment:", err.message);
      return res.status(500).json({ error: "Failed to fetch shipment" });
    }
    if (!row) return res.status(404).json({ error: "Shipment not found" });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
