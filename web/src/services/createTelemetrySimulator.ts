import type { Station } from "../domain/Station";

export function createTelemetrySimulator(initialStation: Station) {
  let currentStation = initialStation;

  return {
    start(callback: (station: Station) => void) {
      const intervalId = window.setInterval(() => {
        const firstEquipment = currentStation.equipments[0];

        if (!firstEquipment) {
          return;
        }

        const firstMeasurement = firstEquipment.measurements[0];

        if (!firstMeasurement) {
          return;
        }

        const variation = Math.random() * 0.2 - 0.1;

        currentStation = {
          ...currentStation,
          lastUpdatedAt: new Date(),
          equipments: currentStation.equipments.map((equipment, index) => {
            if (index !== 0) {
              return equipment;
            }

            return {
              ...equipment,
              measurements: equipment.measurements.map(
                (measurement, measurementIndex) => {
                  if (measurementIndex !== 0) {
                    return measurement;
                  }

                  return {
                    ...measurement,
                    value: measurement.value + variation,
                  };
                },
              ),
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
