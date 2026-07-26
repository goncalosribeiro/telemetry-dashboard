import type { Alarm } from "../../domain/alarm";
import { getAlarmPresentation } from "./alarmPresentation";


type AlarmBadgeProps = {
    alarm: Alarm;
};

export const AlarmBadge = ({ alarm }: AlarmBadgeProps) => {
    const presentation = getAlarmPresentation(alarm);

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${presentation.className}`}
        >
            {presentation.label}
        </span>
    );
};