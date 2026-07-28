import express from "express";
import { getStationSnapshot } from "./data/stationStore.js";
import { toStationDto } from "./mappers/toStationDto.js";

const app = express();

/*
 * Middleware
 */
app.use(express.json());

/*
 * Routes
 */
app.get("/", (_request, response) => {
  response.json({
    message: "AquaPulse API",
  });
});

app.get("/api/stations/:stationId", (request, response) => {
  const station = getStationSnapshot();

  if (station.id !== request.params.stationId) {
    response.status(404).json({
      message: "Station not found",
    });

    return;
  }

  response.json(toStationDto(station));
});

export default app;
