import { createServer } from "node:http";
import app from "./app.js";
import type { StationSnapshotMessage } from "./contracts/realtimeMessage.js";
import { getStationSnapshot } from "./data/stationStore.js";
import { toStationDto } from "./mappers/toStationDto.js";
import { createTelemetrySimulator } from "./services/createTelemetrySimulator.js";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT ?? 3000);
const server = createServer(app);
const webSocketServer = new WebSocketServer({
  server,
  path: "/ws",
});

const broadcastStationSnapshot = () => {
  const message: StationSnapshotMessage = {
    type: "station.snapshot",
    station: toStationDto(getStationSnapshot()),
  };

  const serializedMessage = JSON.stringify(message);

  for (const client of webSocketServer.clients) {
    if (client.readyState !== client.OPEN) {
      continue;
    }

    client.send(serializedMessage);
  }
};

webSocketServer.on("connection", (socket) => {
  const message: StationSnapshotMessage = {
    type: "station.snapshot",
    station: toStationDto(getStationSnapshot()),
  };

  socket.send(JSON.stringify(message));
});

const telemetrySimulator = createTelemetrySimulator({
  onStationUpdated: () => {
    broadcastStationSnapshot();
  },
});

telemetrySimulator.start();

server.listen(PORT, () => {
  console.log(`🚀 AquaPulse API running on http://localhost:${PORT}`);
});
