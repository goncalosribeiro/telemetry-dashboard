
import { StationHeader } from "../components/StationHeader";
import { mockStation } from "../domain/mockStation";

// StationDashboardPage.tsx
export function StationDashboardPage() {

    const station = mockStation;

    return (
        <main>
            <StationHeader station={station} />

            <section>
                {station.equipments.map((equipment) => (
                    <article key={equipment.id}>
                        <h2>{equipment.name}</h2>
                        <p>{equipment.operationalStatus}</p>

                        <ul>
                            {equipment.measurements.map((measurement) => (
                                <li key={measurement.key}>
                                    {measurement.label}: {measurement.value}
                                    {measurement.unit ? ` ${measurement.unit}` : ""}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </main>
    );
}