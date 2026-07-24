import type { Equipment } from "./Equipment";

export type StationConnectionStatus = "online" | "offline" | "connecting";

export type Station = {
  id: string;
  name: string;
  connectionStatus: StationConnectionStatus;
  lastUpdatedAt: Date;
  equipments: Equipment[];
};
