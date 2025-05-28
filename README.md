# Rail Logistics Simulation

A simple REST API to manage trains, shipments, cargo items, and repair history.

## Setup

```bash
git clone <repo-url>
cd rail-logistics-sim
npm install
npm run dev
```

## Database

* SQLite DB is created on startup.
* Seed data with:

```bash
npm run seed
```

## API Endpoints

* **Trains**:
  `GET /trains`, `POST /trains`, `GET /trains/:id`, `PUT /trains/:id`, `DELETE /trains/:id`
* **Shipments**:
  `GET /shipments`, `POST /shipments`, `GET /shipments/:id`, `PUT /shipments/:id`, `DELETE /shipments/:id`
* **Cargo**:
  `GET /cargo`, `POST /cargo`, `GET /cargo/:id`, `PUT /cargo/:id`, `DELETE /cargo/:id`
* **Repairs**:
  `GET /repairs`, `POST /repairs`, `GET /repairs/:id`, `PUT /repairs/:id`, `DELETE /repairs/:id`

## Notes

* Add a `.env` file for environment variables if needed.
* The server runs on `http://localhost:3000` by default.
