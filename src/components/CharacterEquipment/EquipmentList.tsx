import EQUIPMENT_LIST from "@store/data/itemsData/ALL_EQUIPMENT.json";
import { TItem } from "@store/types";
import EquipmentCard from "./EquipmentCard";
import { motion } from "framer-motion";
import { useState } from "react";
import Filters from "./Filter";
import { TCharacterEquipmentStateKeys } from "@store/characterEquipmentSlice/types";

interface Props {
  className?: string;
  itemStateKey: TCharacterEquipmentStateKeys;
  equipmentType:
    | "weapon"
    | "cloak"
    | "head"
    | "body"
    | "legs"
    | "gloves"
    | "boots"
    | "necklace"
    | "bracelet"
    | "belt"
    | "ring";
  handleSelect: (item: TItem) => void;
}

const tierFilters = ["legendary", "epic", "epic2", "rare", "uncommon"];
const weaponFilters = ["staff", "dagger", "wand", "crossbow", "longbow", "greatsword", "shield"];
const armorFilters = ["heavy", "light", "cloth"];

const EquipmentList = ({ equipmentType, className, handleSelect }: Props) => {
  const [activeFilters, setActiveFilters] = useState({
    tierFilter: "epic",
    armorFilter: "heavy",
    weaponFilter: "shield",
  });

  const handleSelectFilter = (key: string, value: string) => {
    setActiveFilters((activeFilters) => ({ ...activeFilters, [key]: value }));
  };

  const items = EQUIPMENT_LIST[equipmentType] as TItem[];

  const filteredItems = items.filter(
    (item) =>
      (item.type === activeFilters.weaponFilter ||
        item.type.includes(activeFilters.armorFilter) ||
        item.type === "cloak" ||
        item.itemGroup === "accessory") &&
      item.tier === activeFilters.tierFilter
  );

  const itemGroup = items[0].itemGroup;
  const itemType = items[0].type;

  return (
    <motion.div
      layout
      onClick={(e) => e.stopPropagation()}
      className={"p-4 bg-neutral6" + (className ? className : "")}
      initial={{ opacity: 0, borderRadius: "12px" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear" }}
    >
      <motion.div layout className="flex flex-col gap-2 mb-4">
        <Filters
          filtersList={tierFilters}
          filterActiveName={activeFilters.tierFilter}
          filterName={"tierFilter"}
          handleSelectFilter={handleSelectFilter}
        />
        {equipmentType === "weapon" ? (
          <Filters
            filtersList={weaponFilters}
            filterActiveName={activeFilters.weaponFilter}
            filterName={"weaponFilter"}
            handleSelectFilter={handleSelectFilter}
          />
        ) : null}
        {itemGroup === "armor" && itemType !== "cloak" ? (
          <Filters
            filtersList={armorFilters}
            filterActiveName={activeFilters.armorFilter}
            filterName={"armorFilter"}
            handleSelectFilter={handleSelectFilter}
          />
        ) : null}
      </motion.div>

      {filteredItems.length === 0 ? (
        <motion.div
          className="h-[100px] rounded-md flex justify-center items-center text-neutral5 bg-neutral7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No Available Items Yet</p>
        </motion.div>
      ) : (
        <ul className="grid gap-4">
          {filteredItems.map((item) => {
            return (
              <motion.li
                key={item.id}
                onClick={() => handleSelect(item)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <EquipmentCard
                  className="cursor-pointer"
                  defaultStyle
                  titleVisibilty
                  tier={item.tier}
                  image={item.image}
                  title={item.title}
                  level={item.level}
                />
              </motion.li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
};

export default EquipmentList;
