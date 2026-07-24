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
          key: "power",
          label: "Power",
          value: 15.8,
          unit: "kW",
        },
        {
          key: "pressure",
          label: "Pressure",
          value: 4.2,
          unit: "bar",
        },
        {
          key: "flow-rate",
          label: "Flow rate",
          value: 38.6,
          unit: "m³/h",
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
};
