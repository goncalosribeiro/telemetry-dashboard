import type { Station } from "./Station";

export const mockStation: Station = {
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
  alarms: [
    {
      id: "alarm-pump-1-temperature",
      type: "high-temperature",
      severity: "critical",
      status: "active",
      equipmentId: "pump-01",
      measurementId: "pump-01-temperature",
      triggeredAt: "2026-07-26T18:30:00Z",
    },
  ],
};
