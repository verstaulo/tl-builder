import { TOptionalStats } from "@store/types";
import { keyToTitle } from "@utils/keyToTitle";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Select from "./EquipmentMenu_Traits_Select";

function filterTraits(
  availableTraits: TOptionalStats,
  selectedTraits: TOptionalStats | undefined
): [string, number][] {
  if (!selectedTraits) return Object.entries(availableTraits);

  const filteredTraitsList = Object.entries(availableTraits).filter(
    ([key]) => !Object.prototype.hasOwnProperty.call(selectedTraits, key)
  );

  return filteredTraitsList;
}

interface Props {
  mode: "info" | "edit";
  selectedTraits: TOptionalStats | undefined;
  availableTraits: TOptionalStats;
  markTraitsChanges: () => void;
  setSelectedTraits: Dispatch<SetStateAction<TOptionalStats | undefined>>;
}
const EquipmentMenu_Traits = ({
  mode = "info",
  selectedTraits,
  availableTraits,
  markTraitsChanges,
  setSelectedTraits,
}: Props) => {
  const [openedSelectIndex, setOpenedSelectIndex] = useState<number | null>(null);

  const filteredTraitsList = filterTraits(availableTraits, selectedTraits);

  const selectTitles = selectedTraits
    ? Object.entries(selectedTraits).reduce((acc, [key, value]) => {
        acc.push(key + " " + value);
        return acc;
      }, [] as Array<string>)
    : [null, null, null];

  const toggleOpenHandler = (index: number) => {
    if (!openedSelectIndex || openedSelectIndex !== index) setOpenedSelectIndex(index);
    if (openedSelectIndex === index) setOpenedSelectIndex(null);
  };

  const selectHandler = (index: number) => (value: [string, number]) => {
    setSelectedTraits((prevTraits) => {
      if (!prevTraits) return { [value[0]]: value[1] * 4 };
      const newValue = [...Object.entries(prevTraits)];
      newValue[index] = [value[0], value[1] * 4];
      return Object.fromEntries(newValue);
    });

    setOpenedSelectIndex(null);
    markTraitsChanges();
  };

  return (
    <motion.div exit={{ opacity: 0 }} className="bg-neutral7/95 rounded-xl text-neutral4">
      {!selectedTraits && mode === "info" ? (
        <>
          <p className="bg-neutral6/50 p-2 w-full text-left">Available Traits</p>
          <ul className="p-2">
            {Object.entries(availableTraits).map(([key, value]) => (
              <li key={key}>
                <span>{keyToTitle(key)}: </span>{" "}
                <span>
                  {value} ~ {value * 4}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : selectedTraits && mode === "info" ? (
        <>
          <p className="bg-neutral6/50 p-2 w-full text-left">Traits</p>
          <ul className="p-2">
            {Array.from({ length: 3 }).map((_, i) => {
              const currentTraits = Object.entries(selectedTraits);

              if (currentTraits[i])
                return (
                  <li key={i}>
                    <span>{keyToTitle(currentTraits[i][0])}: </span>{" "}
                    <span>{currentTraits[i][1]}</span>
                  </li>
                );
              else
                return (
                  <li key={i} className="text-red-500">
                    Empty Trait Slot...
                  </li>
                );
            })}
          </ul>
        </>
      ) : null}

      {mode === "edit" ? (
        <motion.div transition={{ ease: "linear" }} className="flex flex-col ">
          <Select
            title={selectTitles[0] ?? "Choose Trait"}
            isOpen={openedSelectIndex === 0}
            options={filteredTraitsList}
            selectHandler={selectHandler(0)}
            onClick={() => toggleOpenHandler(0)}
          />
          <Select
            title={selectTitles[1] ?? "Choose Trait"}
            isOpen={openedSelectIndex === 1}
            options={filteredTraitsList}
            selectHandler={selectHandler(1)}
            onClick={() => toggleOpenHandler(1)}
          />
          <Select
            title={selectTitles[2] ?? "Choose Trait"}
            isOpen={openedSelectIndex === 2}
            options={filteredTraitsList}
            selectHandler={selectHandler(2)}
            onClick={() => toggleOpenHandler(2)}
          />
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default EquipmentMenu_Traits;
