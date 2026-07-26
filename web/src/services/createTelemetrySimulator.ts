import type { Station } from "../domain/Station";

export function createTelemetrySimulator(initialStation: Station) {
  let currentStation = initialStation;

  return {
    start(callback: (station: Station) => void) {
      const intervalId = window.setInterval(() => {
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

        const variation = Math.random() * 0.2 - 0.1;

        currentStation = {
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

        callback(currentStation);
      }, 1000);

      return () => {
        window.clearInterval(intervalId);
      };
    },
  };
}
