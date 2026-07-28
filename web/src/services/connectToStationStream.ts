import type { StationSnapshotMessage } from "../contracts/realtimeMessage";
import { toStation } from "../mappers/toStation";

const STATION_STREAM_URL = "ws://localhost:3000/ws";

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
