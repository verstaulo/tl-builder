import { TItem, TOptionalStats } from "@store/types";
import EquipmentTraits from "./EquipmentMenu_Traits";
import { useRef, useState } from "react";
import { enchantEquipmentStats } from "@utils/enchantStats";
import { mergeStats } from "@utils/mergeStats";
import { AnimatePresence, motion } from "framer-motion";
import close_icon from "../../assets/close_icon.svg";
import {
  addTraitsToEquipment,
  improveEquipment,
  takeOffEquipment,
} from "@store/characterEquipmentSlice";
import { TCharacterEquipmentStateKeys } from "@store/characterEquipmentSlice/types";
import { useAppDispatch } from "@store/index";
import EquipmentMenu_Stats from "./EquipmentMenu_Stats";
import EquipmentMenu_Perk from "./EquipmentMenu_Perk";
import { setCharacterStats } from "@store/characterStatsSlice";
import remove_icon from "../../assets/remove_icon.svg";
import EquipmentMenu_SetBonuses from "./EquipmentMenu_SetBonuses";

interface Props {
  item: TItem;
  mode: "info" | "edit";
  itemStateKey?: TCharacterEquipmentStateKeys;
  onRemove?: () => void;
}

const colorStyle = {
  legendary: "text-legendary",
  epic: "text-epic",
  epic2: "text-epic",
  rare: "text-rare",
  uncommon: "text-uncommon",
  common: "text-common",
};

const EquipmenMenu = ({ item, mode, onRemove, itemStateKey }: Props) => {
  const [enchantedStats, setEnchantedStats] = useState<TOptionalStats>({});
  const [selectedTraits, setSelectedTraits] = useState<TOptionalStats | undefined>(
    item.selectedTraits
  );
  const [level, setLevel] = useState(item.level);

  const isStatsChanged = useRef<boolean>(false);
  const isTraitsChanged = useRef<boolean>(false);

  const dispatch = useAppDispatch();

  const enchantHandler = () => {
    if (level === 9) return;
    setEnchantedStats((prev) =>
      mergeStats(prev, enchantEquipmentStats(item.stats, item.type, level))
    );

    setLevel((level) => level + 1);
    isStatsChanged.current = true;
  };

  const acceptChangesHandler = () => {
    if (isStatsChanged.current) {
      dispatch(
        improveEquipment({
          itemStateKey: itemStateKey!,
          stats: enchantedStats,
          itemLevel: level,
        })
      );
      dispatch(
        setCharacterStats({
          stats: enchantedStats,
          operationSource: "enchant",
          operationType: "add",
          itemStateKey: itemStateKey,
        })
      );
    }

    if (isTraitsChanged.current) {
      dispatch(
        setCharacterStats({
          stats: item.selectedTraits!,
          operationSource: "equipment",
          operationType: "remove",
          itemStateKey: itemStateKey,
        })
      );
      dispatch(
        setCharacterStats({
          stats: selectedTraits!,
          operationSource: "equipment",
          operationType: "add",
          itemStateKey: itemStateKey,
        })
      );
      dispatch(addTraitsToEquipment({ itemStateKey: itemStateKey!, stats: selectedTraits! }));
    }
    setEnchantedStats({});
    isStatsChanged.current = false;
    isTraitsChanged.current = false;
  };

  const declineChangesHandler = () => {
    setLevel(item.level);
    setEnchantedStats({});
    setSelectedTraits(item.selectedTraits);
    isStatsChanged.current = false;
    isTraitsChanged.current = false;
  };

  const markTraitsChanges = () => {
    isTraitsChanged.current = true;
  };

  const removeHandler = () => {
    onRemove && onRemove();
    dispatch(takeOffEquipment({ item: item, itemStateKey: itemStateKey! }));
    dispatch(
      setCharacterStats({
        stats: item.stats,
        itemStateKey: itemStateKey,
        operationType: "remove",
        operationSource: "equipment",
      })
    );
  };

  return (
    <div
      className="bg-neutral6 p-2 rounded-xl w-[400px] select-none text-sm flex flex-col gap-2 mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center gap-2 mb-2">
        <div className="flex flex-col grow">
          <p className={"text-xl " + colorStyle[item.tier]}>{item.title}</p>
          <p className={"capitalize " + colorStyle[item.tier]}>{item.tier}</p>
          <div className="flex items-center">
            <span>Level - {level} </span>{" "}
            {mode === "edit" && item.level < 9 && (
              <button className="px-2" onClick={enchantHandler}>
                <svg
                  className="rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66699 10.0003L10.0003 13.3337M10.0003 13.3337L13.3337 10.0003M10.0003 13.3337V6.66699M18.3337 10.0003C18.3337 14.6027 14.6027 18.3337 10.0003 18.3337C5.39795 18.3337 1.66699 14.6027 1.66699 10.0003C1.66699 5.39795 5.39795 1.66699 10.0003 1.66699C14.6027 1.66699 18.3337 5.39795 18.3337 10.0003Z"
                    stroke="hsla(142, 70%, 56%, 1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="text-neutral4 flex justify-between items-center min-h-7">
            <div>
              {item.type.split("_").map((item) => (
                <span key={item} className="capitalize">
                  {item}{" "}
                </span>
              ))}
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-end gap-2"
              >
                {mode === "edit" && (isStatsChanged.current || isTraitsChanged.current) && (
                  <>
                    <button
                      disabled={!isStatsChanged.current && !isTraitsChanged.current}
                      onClick={declineChangesHandler}
                      className="px-4 transition-all py-2 disabled:bg-neutral5/50 rounded-md bg-neutral7 h-[1.7rem] flex justify-center items-center hover:bg-neutral7/50"
                    >
                      <img src={close_icon} alt="close" />
                    </button>
                    <button
                      onClick={acceptChangesHandler}
                      disabled={!isStatsChanged.current && !isTraitsChanged.current}
                      className="px-4 transition-all bg-primary h-[1.7rem] rounded-md flex justify-center items-center disabled:bg-primary/50"
                    >
                      <svg
                        width="17"
                        height="12"
                        viewBox="0 0 17 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.1995 1L6.03288 10.1667L1.86621 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>{" "}
                  </>
                )}
                {mode === "edit" && (
                  <button>
                    <img
                      onClick={removeHandler}
                      onMouseEnter={(e) => e.stopPropagation()}
                      className="h-full"
                      src={remove_icon}
                      alt="remove"
                    />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <img className="size-24" src={item.image} alt={item.itemGroup} draggable={false} />
      </div>

      <EquipmentMenu_Stats
        mode={mode}
        itemGroup={item.itemGroup}
        itemLevel={item.level}
        itemStats={item.stats}
        itemType={item.type}
        enchantedStats={enchantedStats}
      />

      {item.perk && (
        <EquipmentMenu_Perk
          image={item.perk.image}
          title={item.perk.title}
          description={item.perk.description}
        />
      )}

      {item.traits && (
        <EquipmentTraits
          mode={mode}
          availableTraits={item.traits}
          selectedTraits={selectedTraits}
          setSelectedTraits={setSelectedTraits}
          markTraitsChanges={markTraitsChanges}
        />
      )}

      {item.setInfo && <EquipmentMenu_SetBonuses setInfo={item.setInfo} />}
    </div>
  );
};
export default EquipmenMenu;
