import { getStationSnapshot, replaceStationSnapshot } from "../data/stationStore.js";
import { evaluateAlarms } from "../domain/evaluateAlarms.js";
import type { Station } from "../domain/station.js";

const FLOW_RATE_VARIATION_RANGE = 0.2;
const SIMULATION_INTERVAL_MS = 1000;

type CreateTelemetrySimulatorOptions = {
  onStationUpdated?: (station: Station) => void;
};

export const createTelemetrySimulator = (
  options: CreateTelemetrySimulatorOptions = {},
) => {
  let intervalId: NodeJS.Timeout | null = null;

  const tick = () => {
    const currentStation = getStationSnapshot();

    const targetEquipment = currentStation.equipments.find(
      (equipment) => equipment.id === "pump-01",
    );

    if (!targetEquipment) {
      return;
    }

    const targetMeasurement = targetEquipment.measurements.find(
      (measurement) => measurement.key === "flow-rate",
    );

    if (!targetMeasurement) {
      return;
    }

    const variation =
      Math.random() * FLOW_RATE_VARIATION_RANGE -
      FLOW_RATE_VARIATION_RANGE / 2;

    const nextStation = {
      ...currentStation,
      lastUpdatedAt: new Date(),
      equipments: currentStation.equipments.map((equipment) => {
        if (equipment.id !== targetEquipment.id) {
          return equipment;
        }

        return {
          ...equipment,
          measurements: equipment.measurements.map((measurement) => {
            if (measurement.key !== targetMeasurement.key) {
              return measurement;
            }

            return {
              ...measurement,
              value: measurement.value + variation,
            };
          }),
        };
      }),
    };

    const evaluatedStation = {
      ...nextStation,
      alarms: evaluateAlarms(nextStation),
    };

    replaceStationSnapshot(evaluatedStation);
    options.onStationUpdated?.(evaluatedStation);
  };

  return {
    start() {
      if (intervalId) {
        return;
      }

      intervalId = setInterval(tick, SIMULATION_INTERVAL_MS);
    },
    stop() {
      if (!intervalId) {
        return;
      }

      clearInterval(intervalId);
      intervalId = null;
    },
  };
};
