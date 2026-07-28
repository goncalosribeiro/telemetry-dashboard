import type { StationSnapshotMessage } from "../contracts/realtimeMessage";
import { toStation } from "../mappers/toStation";

const webSocketBaseUrl =
  import.meta.env.VITE_WS_BASE_URL ?? "ws://localhost:3000";
const STATION_STREAM_URL = `${webSocketBaseUrl}/ws`;

type ConnectToStationStreamOptions = {
  onStationSnapshot: (station: ReturnType<typeof toStation>) => void;
};

export const connectToStationStream = ({
  onStationSnapshot,
}: ConnectToStationStreamOptions) => {
  const socket = new WebSocket(STATION_STREAM_URL);

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data) as StationSnapshotMessage;

    if (message.type !== "station.snapshot") {
      return;
    }

    onStationSnapshot(toStation(message.station));
  });

  return () => {
    socket.close();
  };
};
