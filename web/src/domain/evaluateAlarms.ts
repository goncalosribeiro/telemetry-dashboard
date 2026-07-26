import type { Alarm } from "./alarm";
import type { ThresholdDirection } from "./Equipment";
import type { Station } from "./Station";

type ThresholdViolationParams = {
  value: number;
  limit: number;
  direction: ThresholdDirection;
};

const isThresholdViolated = ({
  value,
  limit,
  direction,
}: ThresholdViolationParams): boolean => {
  if (direction === "above") {
    return value >= limit;
  }

  return value <= limit;
};

export const evaluateAlarms = (station: Station): Alarm[] => {
  const evaluatedAlarms: Alarm[] = station.alarms.map((alarm) => ({
    ...alarm,
  }));

  for (const equipment of station.equipments) {
    const thresholds = equipment.thresholds ?? [];

    for (const threshold of thresholds) {
      const measurement = equipment.measurements.find(
        ({ key }) => key === threshold.measurementKey,
      );

      if (!measurement) {
        continue;
      }

      if (threshold.critical === undefined) {
        continue;
      }

      const isViolated = isThresholdViolated({
        value: measurement.value,
        limit: threshold.critical,
        direction: threshold.direction,
      });

      const alarmId = `${equipment.id}-${threshold.measurementKey}-critical`;

      const existingAlarm = evaluatedAlarms.find(({ id }) => id === alarmId);

      if (!isViolated) {
        if (existingAlarm && existingAlarm.status !== "resolved") {
          existingAlarm.status = "resolved";
        }

        continue;
      }

      if (existingAlarm) {
        if (existingAlarm.status === "resolved") {
          existingAlarm.status = "active";
          existingAlarm.triggeredAt = new Date().toISOString();
        }

        continue;
      }

      const alarm: Alarm = {
        id: alarmId,
        type: "measurement-threshold-exceeded",
        severity: "critical",
        status: "active",
        equipmentId: equipment.id,
        measurementKey: threshold.measurementKey,
        direction: threshold.direction,
        triggeredAt: new Date().toISOString(),
      };

      evaluatedAlarms.push(alarm);
    }
  }

  return evaluatedAlarms;
};
