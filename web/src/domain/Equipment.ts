import type { Measurement } from "./Measurement";

export type EquipmentType =
  | "pump"
  | "water-quality-sensor"
  | "flow-meter"
  | "valve";

export type EquipmentOperationalStatus =
  | "running"
  | "stopped"
  | "fault"
  | "unknown";

export type Equipment = {
  id: string;
  name: string;
  type: EquipmentType;
  operationalStatus: EquipmentOperationalStatus;
  measurements: Measurement[];
};
