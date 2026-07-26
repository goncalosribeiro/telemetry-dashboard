import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  CirclePlay,
  CircleStop,
  TriangleAlert,
} from "lucide-react";

import type { EquipmentOperationalStatus } from "../../domain/Equipment";

export type EquipmentStatusPresentation = {
  label: string;
  badgeClassName: string;
  icon: LucideIcon;
};

export const equipmentStatusPresentation: Record<
  EquipmentOperationalStatus,
  EquipmentStatusPresentation
> = {
  running: {
    label: "Running",
    badgeClassName: "bg-green-100 text-green-700",
    icon: CirclePlay,
  },
  stopped: {
    label: "Stopped",
    badgeClassName: "bg-slate-100 text-slate-700",
    icon: CircleStop,
  },
  fault: {
    label: "Fault",
    badgeClassName: "bg-red-100 text-red-700",
    icon: TriangleAlert,
  },
  unknown: {
    label: "Unknown",
    badgeClassName: "bg-amber-100 text-amber-700",
    icon: CircleHelp,
  },
};
