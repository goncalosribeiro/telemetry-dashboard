import { useEffect, useState } from "react";
import { EquipmentCard } from "../components/EquipmentCard";
import { StationHeader } from "../components/StationHeader";
import type { Station } from "../domain/Station";
import { TelemetryChart } from "../components/TelemetryChart";
import { fetchStation } from "../services/fetchStation";

type TelemetryPoint = {
  timestamp: Date;
  value: number;
};

export function StationDashboardPage() {
  const [station, setStation] = useState<Station | null>(null);
  const [flowRateHistory, setFlowRateHistory] = useState<TelemetryPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const loadStation = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const loadedStation = await fetchStation();

        if (isCancelled) {
          return;
        }

        setStation(loadedStation);

        const flowRateMeasurement = loadedStation.equipments
          .flatMap((equipment) => equipment.measurements)
          .find((measurement) => measurement.key === "flow-rate");

        setFlowRateHistory(
          flowRateMeasurement
            ? [
                {
                  timestamp: loadedStation.lastUpdatedAt,
                  value: flowRateMeasurement.value,
                },
              ]
            : [],
        );
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load station data",
        );
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadStation();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Loading station snapshot...
          </p>
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
        <div className="mx-auto max-w-7xl rounded-3xl border border-red-500/30 bg-red-950/20 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-red-300">
            Unable to load telemetry
          </p>
          <p className="mt-3 text-sm text-slate-300">{errorMessage}</p>
        </div>
      </main>
    );
  }

  if (!station) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            No station data available
          </p>
        </div>
      </main>
    );
  }

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
              (alarm) => alarm.equipmentId === equipment.id,
            );

            return (
              <EquipmentCard
                key={equipment.id}
                equipment={equipment}
                alarms={equipmentAlarms}
              />
            );
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
