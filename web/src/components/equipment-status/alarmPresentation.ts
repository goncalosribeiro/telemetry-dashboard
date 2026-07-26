import type { AlarmType, AlarmSeverity, Alarm } from "../../domain/alarm";
import type { ThresholdDirection } from "../../domain/Equipment";

type AlarmPresentation = {
  label: string;
  className: string;
};

const alarmTypeLabels: Record<AlarmType, string> = {
  "measurement-threshold-exceeded": "Measurement Threshold Exceeded",
  "maintenance-due": "Maintenance Due",
};

const alarmSeverityClassNames: Record<AlarmSeverity, string> = {
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  critical: "border-red-500/30 bg-red-500/10 text-red-300",
};

const directionLabels: Record<ThresholdDirection, string> = {
  above: "High",
  below: "Low",
};

export const getAlarmPresentation = (alarm: Alarm): AlarmPresentation => ({
  label: getAlarmTitle(alarm),
  className: alarmSeverityClassNames[alarm.severity],
});

export const getAlarmTitle = (alarm: Alarm): string => {
  if (alarm.type === "maintenance-due") {
    return alarmTypeLabels[alarm.type];
  }

  if (alarm.direction) {
    return `${directionLabels[alarm.direction]} ${alarm.measurementKey ?? "measurement"}`;
  }

  return alarmTypeLabels[alarm.type];
};
