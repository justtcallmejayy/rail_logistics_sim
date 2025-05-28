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
// GET all cargo items (with optional shipment_id filter)
app.get("/cargo", (req, res) => {
  const { shipment_id } = req.query;
  let sql = "SELECT * FROM cargo_items";
  const params = [];

  if (shipment_id) {
    sql += " WHERE shipment_id = ?";
    params.push(shipment_id);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Error querying cargo items:", err.message);
      return res.status(500).json({ error: "Failed to fetch cargo items" });
    }
    res.json(rows);
  });
});

// GET a single cargo item by ID
app.get("/cargo/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cargo_items WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching cargo item:", err.message);
      return res.status(500).json({ error: "Failed to fetch cargo item" });
    }
    if (!row) return res.status(404).json({ error: "Cargo item not found" });
    res.json(row);
  });
});
// GET all repair history (with optional train_id filter)
app.get("/repairs", (req, res) => {
  const { train_id } = req.query;
  let sql = "SELECT * FROM repair_history";
  const params = [];

  if (train_id) {
    sql += " WHERE train_id = ?";
    params.push(train_id);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Error querying repairs:", err.message);
      return res.status(500).json({ error: "Failed to fetch repair history" });
    }
    res.json(rows);
  });
});

// GET a single repair record by ID
app.get("/repairs/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM repair_history WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching repair record:", err.message);
      return res.status(500).json({ error: "Failed to fetch repair record" });
    }
    if (!row) return res.status(404).json({ error: "Repair record not found" });
    res.json(row);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
