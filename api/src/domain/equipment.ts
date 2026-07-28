import type { Measurement } from "./measurement.js";

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

export type ThresholdDirection = "above" | "below";

export type EquipmentMeasurementThreshold = {
  measurementKey: string;
  direction: ThresholdDirection;
  warning?: number;
  critical?: number;
};

export type Equipment = {
  id: string;
  name: string;
  type: EquipmentType;
  operationalStatus: EquipmentOperationalStatus;
  measurements: Measurement[];
  thresholds: EquipmentMeasurementThreshold[];
};
