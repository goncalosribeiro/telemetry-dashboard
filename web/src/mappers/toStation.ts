import type { StationDto } from "../contracts/stationDto";
import type { Station } from "../domain/Station";

export const toStation = (stationDto: StationDto): Station => {
  return {
    id: stationDto.id,
    name: stationDto.name,
    connectionStatus: stationDto.connectionStatus,
    lastUpdatedAt: new Date(stationDto.lastUpdatedAt),
    equipments: stationDto.equipments.map((equipment) => ({
      id: equipment.id,
      name: equipment.name,
      type: equipment.type,
      operationalStatus: equipment.operationalStatus,
      measurements: equipment.measurements.map((measurement) => ({
        key: measurement.key,
        label: measurement.label,
        value: measurement.value,
        unit: measurement.unit,
        minValue: measurement.minValue,
        maxValue: measurement.maxValue,
      })),
      thresholds: equipment.thresholds.map((threshold) => ({
        measurementKey: threshold.measurementKey,
        direction: threshold.direction,
        warning: threshold.warning,
        critical: threshold.critical,
      })),
    })),
    alarms: stationDto.alarms.map((alarm) => ({
      id: alarm.id,
      type: alarm.type,
      severity: alarm.severity,
      status: alarm.status,
      equipmentId: alarm.equipmentId,
      measurementKey: alarm.measurementKey,
      direction: alarm.direction,
      triggeredAt: alarm.triggeredAt,
    })),
  };
};
