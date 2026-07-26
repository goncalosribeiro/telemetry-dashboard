# AquaPulse Telemetry Dashboard

AquaPulse is a full-stack industrial telemetry platform designed to monitor pumping stations and water infrastructure in real time.

The project aims to demonstrate the architecture and implementation of a modern industrial monitoring platform, combining real-time telemetry, interactive process visualisation and scalable full-stack engineering.

Inspired by industrial SCADA systems, AquaPulse focuses on clean architecture, modular design and modern web technologies while remaining approachable as a portfolio project.

---

## Overview

AquaPulse enables operators to monitor pumping stations through multiple complementary views.

The dashboard provides live telemetry, equipment status and historical trends, while the Visual Flow module offers an interactive representation of the monitored installation, making it easier to understand how equipment is connected and how data flows through the system.

The project is intentionally designed to evolve incrementally into a production-inspired industrial monitoring platform.

---

## Architecture

```text
                    Industrial Equipment
                             │
                             ▼
                    Telemetry Gateway
                             │
                  REST API & WebSockets
                             │
                             ▼
                     Node.js Backend
                             │
            Business Logic & Domain Services
                             │
                             ▼
                    PostgreSQL Database
                             │
                             ▼
               React Telemetry Dashboard
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
     Telemetry Dashboard             Visual Flow
```

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Apache ECharts
- React Flow *(planned)*

### Backend

- Node.js
- Express
- REST API
- WebSockets

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

---

## Project Structure

```text
src/
│
├── app/
├── pages/
├── features/
│   ├── dashboard/
│   ├── station/
│   ├── equipment/
│   ├── telemetry/
│   └── visual-flow/
│
├── domain/
├── services/
├── shared/
└── utils/
```

The project follows a feature-oriented architecture with a clear separation between domain logic, presentation and infrastructure.

---

## Core Modules

### Telemetry Dashboard

Provides operators with a complete overview of the monitored installation.

Features include:

- Station overview
- Equipment monitoring
- Live telemetry
- Operational status
- Historical charts
- Threshold indicators
- Responsive dashboard

---

### Visual Flow

An interactive process view representing the complete installation.

Instead of analysing telemetry only through tables and charts, operators can inspect the physical process and understand how equipment interacts within the system.

Planned capabilities include:

- Interactive process diagrams
- Drag-and-drop editor
- Equipment placement
- Pipe and connection modelling
- Live telemetry overlays
- Equipment status indicators
- Alarm highlighting
- Zoom & pan navigation
- Custom plant layouts

---

## Planned Features

- Multiple pumping stations
- Alarm management
- Historical telemetry analysis
- Equipment detail pages
- Telemetry filtering
- User authentication
- Role-based permissions
- Persistent telemetry storage
- MQTT integration
- OPC-UA integration
- Docker deployment

---

## Engineering Principles

AquaPulse is designed to demonstrate software engineering practices commonly used in modern industrial applications.

Key concepts include:

- Feature-first architecture
- Domain-driven frontend modelling
- Strong TypeScript typing
- Immutable state updates
- Separation of concerns
- Component composition
- Reusable domain models
- Scalable frontend architecture
- Real-time application design
- Interactive process visualisation
- Graph-based user interfaces
- Clean Code principles

---

## Data Visualisation

Telemetry is visualised using Apache ECharts, providing rich and interactive time-series charts for industrial monitoring.

The Visual Flow module complements traditional dashboards by representing the monitored process as an interactive graph, enabling operators to understand equipment relationships and system behaviour at a glance.

---

## Why This Project?

Industrial telemetry platforms combine several engineering challenges rarely found together in typical portfolio projects.

AquaPulse brings together frontend architecture, backend services, real-time communication, interactive visualisation and domain modelling in a single application inspired by real industrial systems.

The objective is not simply to build a dashboard, but to demonstrate the design of a complete monitoring platform that could evolve towards a production-ready solution.
