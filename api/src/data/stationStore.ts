import type { Station } from "../domain/station.js";
import { initialStation } from "./station.js";

let currentStation: Station = structuredClone(initialStation);

export const getStationSnapshot = (): Station => {
  return structuredClone(currentStation);
};

export const replaceStationSnapshot = (station: Station): void => {
  currentStation = structuredClone(station);
};

export const resetStationSnapshot = (): void => {
  currentStation = structuredClone(initialStation);
};
