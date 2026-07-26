import type { EquipmentOperationalStatus } from "../../domain/Equipment";
import { equipmentStatusPresentation } from "./equipmentStatusPresentation";

type OperationalStatusBadgeProps = {
    status: EquipmentOperationalStatus;
};

export function OperationalStatusBadge({
    status,
}: OperationalStatusBadgeProps) {
    const presentation = equipmentStatusPresentation[status];
    const Icon = presentation.icon;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${presentation.badgeClassName}`}
        >
            <Icon aria-hidden="true" className="h-3.5 w-3.5" />

            {presentation.label}
        </span>
    );
}