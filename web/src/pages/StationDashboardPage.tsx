
import { useEffect, useState } from "react";
import { EquipmentCard } from "../components/EquipmentCard";
import { StationHeader } from "../components/StationHeader";
import { mockStation } from "../domain/mockStation";
import type { Station } from "../domain/Station";
import { createTelemetrySimulator } from "../services/createTelemetrySimulator";
import { TelemetryChart } from "../components/TelemetryChart";
import { evaluateAlarms } from "../domain/evaluateAlarms";

type TelemetryPoint = {
    timestamp: Date;
    value: number;
};

export function StationDashboardPage() {

    const [station, setStation] = useState<Station>(mockStation);
    const [flowRateHistory, setFlowRateHistory] =
        useState<TelemetryPoint[]>([]);

    useEffect(() => {
        const simulator = createTelemetrySimulator(mockStation);

        const stopSimulator = simulator.start((newStation) => {
            const evaluatedStation: Station = {
                ...newStation,
                alarms: evaluateAlarms(newStation),
            };

            setStation(evaluatedStation);

            const flowRateMeasurement = evaluatedStation.equipments
                .flatMap((equipment) => equipment.measurements)
                .find((measurement) => measurement.key === "flow-rate");

            if (flowRateMeasurement) {
                setFlowRateHistory((currentHistory) => [
                    ...currentHistory.slice(-29),
                    {
                        timestamp: evaluatedStation.lastUpdatedAt,
                        value: flowRateMeasurement.value,
                    },
                ]);
            }
        });

        return stopSimulator;
    }, []);

    const flowRateMeasurement = station.equipments
        .flatMap((equipment) => equipment.measurements)
        .find((measurement) => measurement.key === "flow-rate");

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
            <div className="mx-auto max-w-7xl">
                <StationHeader station={station} />

                <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {station.equipments.map((equipment) => {
                        const equipmentAlarms = station.alarms.filter(
                            alarm => alarm.equipmentId === equipment.id
                        );

                        return (
                            <EquipmentCard
                                key={equipment.id}
                                equipment={equipment}
                                alarms={equipmentAlarms}
                            />
                        )
                    })}
                </section>
                {flowRateMeasurement && (
                    <section className="mt-8">
                        <TelemetryChart
                            points={flowRateHistory}
                            label={flowRateMeasurement.label}
                            unit={flowRateMeasurement.unit}
                            minValue={flowRateMeasurement.minValue}
                            maxValue={flowRateMeasurement.maxValue}
                        />
                    </section>
                )}
            </div>
        </main>
    );
}