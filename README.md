# AquaPulse Telemetry Dashboard

AquaPulse is a portfolio project for monitoring a water pumping station. It demonstrates a React and TypeScript frontend consuming a Node.js backend that exposes simulated operational telemetry in real time.

## Current capabilities

- dashboard for a pumping station and its equipment;
- current measurements, operational status and alarms;
- recent flow-rate chart built with Apache ECharts;
- REST endpoint for the initial station snapshot;
- WebSocket stream for real-time station snapshots;
- in-memory backend simulation that updates telemetry and evaluates critical alarm thresholds.

## Architecture

The backend owns the operational state. It maintains the current station snapshot in memory, simulates telemetry, evaluates alarms and exposes the result through REST and WebSocket.

The frontend loads the initial snapshot with REST, receives later snapshots through WebSocket and keeps only the short history needed to render the chart.

```text
Backend in-memory store
  ├─ GET /api/stations/:stationId → initial snapshot
  └─ WebSocket /ws               → real-time snapshots
                                    ↓
                             React dashboard
```

## Stack

- React, TypeScript, Vite and Tailwind CSS;
- Apache ECharts;
- Node.js, Express, TypeScript and `ws`.

## Local development

Start the backend:

```bash
cd api
npm install
npm run dev
```

In another terminal, start the frontend:

```bash
cd web
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to the backend on port `3000`. The WebSocket server is available at `ws://localhost:3000/ws`.

Copy each `.env.example` file to `.env` when local configuration needs to change. Vite loads `web/.env` automatically; the backend currently uses the `PORT` environment variable supplied by the shell.

## Scope

This project intentionally has no Docker, database, persistence or authentication. Future increments may add a monitoring map and a visual automation-flow editor, but the current focus is a clear real-time telemetry foundation.
