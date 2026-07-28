import type { StationDto } from "../contracts/stationDto.js";
import type { Station } from "../domain/station.js";

export const toStationDto = (station: Station): StationDto => {
  return {
    id: station.id,
    name: station.name,
    connectionStatus: station.connectionStatus,
    lastUpdatedAt: station.lastUpdatedAt.toISOString(),
    equipments: station.equipments.map((equipment) => ({
      id: equipment.id,
      name: equipment.name,
      type: equipment.type,
      operationalStatus: equipment.operationalStatus,
      measurements: equipment.measurements.map((measurement) => ({
        key: measurement.key,
        label: measurement.label,
        value: measurement.value,
        ...(measurement.unit !== undefined && { unit: measurement.unit }),
        ...(measurement.minValue !== undefined && {
          minValue: measurement.minValue,
        }),
        ...(measurement.maxValue !== undefined && {
          maxValue: measurement.maxValue,
        }),
      })),
      thresholds: equipment.thresholds.map((threshold) => ({
        measurementKey: threshold.measurementKey,
        direction: threshold.direction,
        ...(threshold.warning !== undefined && { warning: threshold.warning }),
        ...(threshold.critical !== undefined && {
          critical: threshold.critical,
        }),
      })),
    })),
    alarms: station.alarms.map((alarm) => ({
      id: alarm.id,
      type: alarm.type,
      severity: alarm.severity,
      status: alarm.status,
      equipmentId: alarm.equipmentId,
      ...(alarm.measurementKey !== undefined && {
        measurementKey: alarm.measurementKey,
      }),
      ...(alarm.direction !== undefined && { direction: alarm.direction }),
      triggeredAt: alarm.triggeredAt,
    })),
  };
};
