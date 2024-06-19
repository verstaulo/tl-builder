import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@store/index";
import { TCharacterEquipmentStateKeys } from "@store/characterEquipmentSlice/types";
import { TAccessory, TArmor, TWeapon } from "@store/types";
import { putOnEquipment } from "@store/characterEquipmentSlice";
import { setCharacterStats } from "@store/characterStatsSlice";
import EquipmentList from "@components/CharacterEquipment/EquipmentList";
import EquipmentCard from "@components/CharacterEquipment/EquipmentCard";
import EquipmenMenu from "./EquipmentMenu";
import Modal from "@components/Shared/Modal";
import DEFAULT_ITEMS_DATA from "@store/data/DEFAULT_ITEMS_DATA.json";

interface EquipmentItemProps {
  itemStateKey: TCharacterEquipmentStateKeys;
  className?: string;
  onClick?: () => void;
  resetActiveElementIndex: () => void;
}

const EquipmentItem = ({
  itemStateKey,
  className,
  onClick,
  resetActiveElementIndex,
}: EquipmentItemProps) => {
  const [isItemsListVisible, setItemsListVisible] = useState<boolean>(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuFixed, setMenuFixed] = useState(false);
  const [menuMode, setMenuMode] = useState<"info" | "edit">("info");
  const currentItem = useAppSelector((store) => store.characterEquipment[itemStateKey]);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    if (!currentItem) {
      setItemsListVisible(true);
    } else if (currentItem && !isMenuFixed) {
      setMenuFixed(true);
      setMenuVisible(true);
      setMenuMode("edit");
      onClick && onClick();
    } else if (currentItem && isMenuFixed) {
      setMenuFixed(false);
      setMenuVisible(false);
      onClick && onClick();
    }
  };

  const selectItemHandler = (item: TWeapon | TAccessory | TArmor) => {
    dispatch(putOnEquipment({ itemStateKey: itemStateKey, item: item }));
    dispatch(
      setCharacterStats({
        stats: item.stats,
        operationSource: "equipment",
        operationType: "add",
        itemStateKey: itemStateKey,
      })
    );
    setItemsListVisible(false);
  };

  const onRemoveHandler = () => {
    resetActiveElementIndex();
    setMenuVisible(false);
    setMenuFixed(false);
  };

  const equipmentType =
    itemStateKey === "main_weapon" || itemStateKey === "secondary_weapon"
      ? "weapon"
      : itemStateKey === "ring_first" || itemStateKey === "ring_second"
      ? "ring"
      : itemStateKey;

      
  return (
    <motion.li
      className={"rounded-lg flex flex-col gap-2 relative " + (className || "")}
      onClick={clickHandler}
    >
      <EquipmentCard
        className="grow cursor-pointer "
        defaultStyle
        tier={currentItem?.tier || "common"}
        level={currentItem?.level || 0}
        image={currentItem?.image || DEFAULT_ITEMS_DATA[itemStateKey].image}
        title={currentItem?.title || DEFAULT_ITEMS_DATA[itemStateKey].title}
      />

      <AnimatePresence>
        {currentItem && isMenuVisible && (
          <motion.div className="sm:absolute sm:top-0 sm:left-[calc(100%+10px)] sm:w-[400px] lg:block lg:static lg:w-full"
            initial={{ height: 0, opacity:0}}
            animate={{ height: "auto" , opacity:1}}
            exit={{ height: 0, opacity:0}}
          >
            <EquipmenMenu
              item={currentItem}
              mode={menuMode}
              itemStateKey={itemStateKey}
              onRemove={onRemoveHandler}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isItemsListVisible && (
          <Modal
            className="flex justify-center items-center backdrop-blur-md"
            onClose={() => setItemsListVisible(false)}
          >
            <EquipmentList
              itemStateKey={itemStateKey}
              equipmentType={equipmentType}
              handleSelect={selectItemHandler}
            />
          </Modal>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default EquipmentItem;
