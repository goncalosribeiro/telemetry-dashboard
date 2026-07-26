import type { ThresholdDirection } from "./Equipment";

export type AlarmSeverity = "warning" | "critical";

export type AlarmStatus = "active" | "acknowledged" | "resolved";

export type AlarmType = "measurement-threshold-exceeded" | "maintenance-due";

export type Alarm = {
  id: string;
  type: AlarmType;
  severity: AlarmSeverity;
  status: AlarmStatus;
  equipmentId: string;
  measurementKey?: string;
  direction?: ThresholdDirection;
  triggeredAt: string;
};
