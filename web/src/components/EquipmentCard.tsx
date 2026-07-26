import type { Alarm } from "../domain/alarm";
import type { Equipment } from "../domain/Equipment";
import { formatEquipmentType } from "../utils/formatEquipmentType";
import { AlarmBadge } from "./equipment-status/AlarmBadge";
import { OperationalStatusBadge } from "./equipment-status/OperationalStatusBadge";

type EquipmentCardProps = {
    equipment: Equipment;
    alarms: Alarm[];
};

export function EquipmentCard({
    equipment,
    alarms
}: EquipmentCardProps) {
    return (
        <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <header className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-semibold">
                    {equipment.name}</h2>
                <p className="mt-1 text-sm text-slate-400">{formatEquipmentType(equipment.type)}</p>
                <OperationalStatusBadge status={equipment.operationalStatus} />
                {alarms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {alarms.map((alarm) => (
                            <AlarmBadge
                                key={alarm.id}
                                alarm={alarm}
                            />
                        ))}
                    </div>
                )}
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