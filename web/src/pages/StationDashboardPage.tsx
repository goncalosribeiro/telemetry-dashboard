
import { EquipmentCard } from "../components/EquipmentCard";
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
                    <EquipmentCard
                        key={equipment.id}
                        equipment={equipment}
                    />
                ))}
            </section>
        </main>
    );
}