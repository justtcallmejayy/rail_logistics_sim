import express from "express";
import expressLayouts from "express-ejs-layouts";
import methodOverride from "method-override";
import db from "./db.js";

const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layouts/main");
app.use(expressLayouts);

// body parsing & method override
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// a simple health check
app.get("/", (req, res) => {
  // res.send("🚂 Rail Logistics Simulation API is up! <a href='/ui/trains'>Go to UI</a>");
  res.render("index", { title: "Rail Logistics Simulation" });
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

// index.js

app.use(methodOverride("_method")); // enable HTML forms to fake PUT/DELETE

// Render the trains page
app.get("/ui/trains", (req, res) => {
  db.all("SELECT * FROM trains", [], (err, rows) => {
    if (err) return res.status(500).send("Database error");
    res.render("trains", { trains: rows });
  });
});

// Handle new train form submission
app.post("/ui/trains", (req, res) => {
  const { train_number, model, capacity } = req.body;
  db.run(
    `INSERT INTO trains (train_number, model, capacity) VALUES (?, ?, ?)`,
    [train_number, model, capacity],
    (err) => {
      if (err) console.error(err);
      res.redirect("/ui/trains");
    }
  );
});

// Handle train deletion (via method-override)
app.delete("/ui/trains/:id", (req, res) => {
  db.run(`DELETE FROM trains WHERE id = ?`, [req.params.id], (err) => {
    if (err) console.error(err);
    res.redirect("/ui/trains");
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
