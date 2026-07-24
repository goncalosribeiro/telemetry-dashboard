import type { EquipmentType } from "../domain/Equipment";

export const formatEquipmentType = (equipmentType: EquipmentType): string => {
  return equipmentType
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
