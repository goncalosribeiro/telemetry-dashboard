import type { AlarmType, AlarmSeverity } from "../../domain/alarm";

type AlarmPresentation = {
  label: string;
  className: string;
};

const alarmTypeLabels: Record<AlarmType, string> = {
  "high-temperature": "High Temperature",
  "low-flow": "Low Flow",
  "maintenance-due": "Maintenance Due",
};

const alarmSeverityClassNames: Record<AlarmSeverity, string> = {
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  critical: "border-red-500/30 bg-red-500/10 text-red-300",
};

export const getAlarmPresentation = (
  type: AlarmType,
  severity: AlarmSeverity,
): AlarmPresentation => ({
  label: alarmTypeLabels[type],
  className: alarmSeverityClassNames[severity],
});
