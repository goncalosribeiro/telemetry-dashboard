import type { Equipment } from "../domain/Equipment";
import { formatEquipmentType } from "../utils/formatEquipmentType";

type EquipmentCardProps = {
    equipment: Equipment;
};

export function EquipmentCard({
    equipment,
}: EquipmentCardProps) {
    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <header className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-semibold">
                    {equipment.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{formatEquipmentType(equipment.type)}</p>
                <p className="mt-3 text-sm font-medium">{equipment.operationalStatus}</p>
            </header>
            <ul className="mt-4 space-y-3">
                {equipment.measurements.map((measurement) => (
                    <li key={measurement.key} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-slate-400">{measurement.label}</span>

                        <span className="font-medium tabular-nums">
                            {measurement.value.toFixed(1)}
                            {measurement.unit && ` ${measurement.unit}`}
                        </span>
                    </li>
                ))}
            </ul>
        </article>
    );
}