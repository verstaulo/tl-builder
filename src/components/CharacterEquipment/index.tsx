import { useState } from "react";
import { TCharacterEquipmentStateKeys } from "@store/characterEquipmentSlice/types";
import EquipmentItem from "./EquipmentItem";

const availableEquipment = [
  "main_weapon",
  "secondary_weapon",
  "cloak",
  "head",
  "body",
  "legs",
  "gloves",
  "boots",
  "necklace",
  "bracelet",
  "belt",
  "ring_first",
  "ring_second",
] as TCharacterEquipmentStateKeys[];

interface Props {
  className?: string;
}

const CharacterEquipment = ({ className }: Props) => {
  const [activeElementIndex, setActiveElementIndex] = useState<number | null>(null);

  const clickHandler = (index: number) => {
    if (activeElementIndex === index) setActiveElementIndex(null);
    if (activeElementIndex !== index) setActiveElementIndex(index);
  };

  const resetActiveElementIndex = () => setActiveElementIndex(null);

  return (
    <section className={className}>
      <ul 
      className="flex flex-col gap-2">
        {availableEquipment.map((eq, i) => (
          <EquipmentItem
            key={eq}
            className={
              activeElementIndex !== null && activeElementIndex != i ? "pointer-events-none" : ""
            }
            itemStateKey={eq}
            onClick={() => clickHandler(i)}
            resetActiveElementIndex={resetActiveElementIndex}
          />
        ))}
      </ul>
    </section>
  );
};

export default CharacterEquipment;
