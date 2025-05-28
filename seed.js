// seed.js
import db from "./db.js";

db.serialize(() => {
  // 1. Clear any existing data
  db.run(`DELETE FROM repair_history`);
  db.run(`DELETE FROM cargo_items`);
  db.run(`DELETE FROM shipments`);
  db.run(`DELETE FROM trains`);

  // 2. Insert some example trains
  const trains = [
    ["TR1001", "GE ES44AC", 2000],
    ["TR1002", "EMD SD70ACe", 2200],
    ["TR1003", "GE AC4400CW", 2500],
  ];
  const insertTrain = db.prepare(
    `INSERT INTO trains (train_number, model, capacity) VALUES (?, ?, ?)`
  );
  for (const t of trains) insertTrain.run(t);
  insertTrain.finalize();

  // 3. Insert shipments for each train
  const shipments = [
    [1, "Toronto, ON", "Montreal, QC", "2025-05-01", "2025-05-02"],
    [2, "Vancouver, BC", "Calgary, AB", "2025-05-03", "2025-05-05"],
    [3, "Chicago, IL", "Detroit, MI", "2025-05-04", "2025-05-06"],
  ];
  const insertShipment = db.prepare(
    `INSERT INTO shipments (train_id, origin, destination, departure_date, arrival_date) VALUES (?, ?, ?, ?, ?)`
  );
  for (const s of shipments) insertShipment.run(s);
  insertShipment.finalize();

  // 4. Insert cargo items
  const cargo = [
    [1, "Coal", 1500, 10],
    [1, "Steel", 800, 4],
    [2, "Grain", 2000, 20],
    [3, "Automobiles", 500, 5],
  ];
  const insertCargo = db.prepare(
    `INSERT INTO cargo_items (shipment_id, description, weight, quantity) VALUES (?, ?, ?, ?)`
  );
  for (const c of cargo) insertCargo.run(c);
  insertCargo.finalize();

  // 5. Insert repair history
  const repairs = [
    [1, "2025-04-15", "Brake system maintenance", 1200.0, 4.5],
    [2, "2025-04-20", "Engine tune-up", 2500.0, 8.0],
    [3, "2025-05-05", "Wheel replacement", 1800.0, 6.0],
  ];
  const insertRepair = db.prepare(
    `INSERT INTO repair_history (train_id, repair_date, description, cost, downtime_hours) VALUES (?, ?, ?, ?, ?)`
  );
  for (const r of repairs) insertRepair.run(r);
  insertRepair.finalize();

  console.log("Seed data inserted successfully");
  db.close();
});
