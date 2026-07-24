import type { Equipment } from "../domain/Equipment";
import { formatEquipmentType } from "../utils/formatEquipmentType";

type EquipmentCardProps = {
    equipment: Equipment;
};

export function EquipmentCard({
    equipment,
}: EquipmentCardProps) {
    return (
        <article>
            <header>
                <h2>{equipment.name}</h2>
                <p>{formatEquipmentType(equipment.type)}</p>
                <p>{equipment.operationalStatus}</p>
            </header>
            <ul>
                {equipment.measurements.map((measurement) => (
                    <li key={measurement.key}>
                        <span>{measurement.label}</span>

                        <span>
                            {measurement.value}
                            {measurement.unit && ` ${measurement.unit}`}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}