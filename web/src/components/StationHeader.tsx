import type { Station } from "../domain/Station";

type StationHeaderProps = {
    station: Station;
};

export function StationHeader({ station }: StationHeaderProps) {
    return (
        <header>
            <h1>{station.name}</h1>

            <p>Connection: {station.connectionStatus}</p>

            <p>
                Last updated:{" "}
                {station.lastUpdatedAt.toLocaleTimeString()}
            </p>
        </header>
    );
}