import type { Station } from "../domain/station.js";

export const initialStation: Station = {
  id: "station-braga-north",
  name: "Braga North Pumping Station",
  connectionStatus: "online",
  lastUpdatedAt: new Date(),
  equipments: [
    {
      id: "pump-01",
      name: "Main Pump",
      type: "pump",
      operationalStatus: "running",
      thresholds: [
        {
          measurementKey: "flow-rate",
          direction: "below",
          warning: 14.5,
          critical: 14,
        },
      ],
      measurements: [
        {
          key: "flow-rate",
          label: "Flow rate",
          value: 15.4,
          unit: "m³/h",
          minValue: 14,
          maxValue: 18,
        },
        {
          key: "pressure",
          label: "Pressure",
          value: 4.2,
          unit: "bar",
        },
      ],
    },
    {
      id: "water-quality-01",
      name: "Water Quality Sensor",
      type: "water-quality-sensor",
      operationalStatus: "running",
      thresholds: [
        {
          measurementKey: "ph",
          direction: "below",
          warning: 6.8,
          critical: 6.5,
        },
      ],
      measurements: [
        {
          key: "ph",
          label: "pH",
          value: 7.2,
        },
        {
          key: "temperature",
          label: "Temperature",
          value: 18.4,
          unit: "°C",
        },
        {
          key: "turbidity",
          label: "Turbidity",
          value: 0.8,
          unit: "NTU",
        },
      ],
    },
  ],
  alarms: [],
};
