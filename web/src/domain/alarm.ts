export type AlarmSeverity = "warning" | "critical";

export type AlarmStatus = "active" | "acknowledged";

export type AlarmType = "high-temperature" | "low-flow" | "maintenance-due";

export type Alarm = {
  id: string;
  type: AlarmType;
  severity: AlarmSeverity;
  status: AlarmStatus;
  equipmentId: string;
  measurementId?: string;
  triggeredAt: string;
};
