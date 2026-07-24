type StationHeaderProps = {
    stationName: string;
    operationalStatus: "running" | "stopped";
    connectionStatus: "online" | "offline";
    lastUpdatedAt: Date;
};

export function StationHeader({
    stationName,
    operationalStatus,
    connectionStatus,
    lastUpdatedAt,
}: StationHeaderProps) {
    return (
        <header>
            <h1>{stationName}</h1>

            <div>
                <dl>
                    <div>
                        <dt>Operational status</dt>
                        <dd>{operationalStatus}</dd>
                    </div>

                    <div>
                        <dt>Connection</dt>
                        <dd>{connectionStatus}</dd>
                    </div>

                    <div>
                        <dt>Last update</dt>
                        <dd>{lastUpdatedAt.toLocaleTimeString()}</dd>
                    </div>
                </dl>
            </div>
        </header>
    );
}