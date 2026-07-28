import type { Alarm } from "./alarm.js";
import type { Equipment } from "./equipment.js";

export type StationConnectionStatus = "online" | "offline" | "connecting";

export type Station = {
  id: string;
  name: string;
  connectionStatus: StationConnectionStatus;
  lastUpdatedAt: Date;
  equipments: Equipment[];
  alarms: Alarm[];
};
