import type { StationDto } from "./stationDto";

export type StationSnapshotMessage = {
  type: "station.snapshot";
  station: StationDto;
};
