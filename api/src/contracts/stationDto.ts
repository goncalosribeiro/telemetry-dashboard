export type MeasurementDto = {
  key: string;
  label: string;
  value: number;
  unit?: string;
  minValue?: number;
  maxValue?: number;
};

export type EquipmentMeasurementThresholdDto = {
  measurementKey: string;
  direction: "above" | "below";
  warning?: number;
  critical?: number;
};

export type EquipmentDto = {
  id: string;
  name: string;
  type: "pump" | "water-quality-sensor" | "flow-meter" | "valve";
  operationalStatus: "running" | "stopped" | "fault" | "unknown";
  measurements: MeasurementDto[];
  thresholds: EquipmentMeasurementThresholdDto[];
};

export type AlarmDto = {
  id: string;
  type: "measurement-threshold-exceeded" | "maintenance-due";
  severity: "warning" | "critical";
  status: "active" | "acknowledged" | "resolved";
  equipmentId: string;
  measurementKey?: string;
  direction?: "above" | "below";
  triggeredAt: string;
};

export type StationDto = {
  id: string;
  name: string;
  connectionStatus: "online" | "offline" | "connecting";
  lastUpdatedAt: string;
  equipments: EquipmentDto[];
  alarms: AlarmDto[];
};
