import { StationHeader } from "../components/StationHeader";

// StationDashboardPage.tsx
export function StationDashboardPage() {
    return (
        <main>
            <StationHeader
                stationName="Braga Norte Pumping Station"
                operationalStatus="running"
                connectionStatus="online"
                lastUpdatedAt={new Date()}
            />
        </main>
    );
}