import type { StationDto } from "./stationDto.js";

export type StationSnapshotMessage = {
  type: "station.snapshot";
  station: StationDto;
};
