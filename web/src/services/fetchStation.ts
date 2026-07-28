import type { StationDto } from "../contracts/stationDto";
import { toStation } from "../mappers/toStation";

const DEFAULT_STATION_ID = "station-braga-north";

export const fetchStation = async (stationId = DEFAULT_STATION_ID) => {
  const response = await fetch(`/api/stations/${stationId}`);

  if (!response.ok) {
    throw new Error(`Failed to load station (${response.status})`);
  }

  const stationDto = (await response.json()) as StationDto;

  return toStation(stationDto);
};
