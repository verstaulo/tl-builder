import { useAppSelector } from "@store/index";
import CharacterStats_Item from "./CharacterStats_Item";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ulVariants = {
  hidden: { height: 0 },
  show: {
    height: "auto",
    transition: { staggerChildren: 0.05 },
  },
  exit: { height: 0 },
};
const liVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const CharacterStats_Group__Weapon = () => {
  const currentWeapon = useAppSelector((store) => store.characterEquipment.main_weapon?.type);
  const [isListOpen, setListOpen] = useState(true);

  return (
    <motion.div
      layout="position"
      className="bg-neutral7/95 rounded-xl overflow-hidden min-w-[21.875rem]"
    >
      <button
        onClick={() => setListOpen(!isListOpen)}
        className="bg-neutral6/50 p-2 w-full text-neutral3 text-center hover:bg-neutral6/75"
      >
        Weapons
      </button>
      <AnimatePresence>
        {isListOpen && (
          <motion.ul
            layout
            variants={ulVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={"select-none"}
          >
            <motion.li
              layout
              className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
              key="damage"
              variants={liVariants}
            >
              Base Damage:{" "}
              <div>
                <CharacterStats_Item stateKey={"main_min_damage"} />
                {" ~ "}
                <CharacterStats_Item stateKey={"main_max_damage"} />
              </div>
            </motion.li>
            {currentWeapon === "dagger" || currentWeapon === "crossbow" ? (
              <>
                <motion.li
                  layout
                  className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
                  key="off_hand"
                  variants={liVariants}
                >
                  Off Hand Damage:{" "}
                  <div>
                    <CharacterStats_Item stateKey={"off_hand_min_damage"} />
                    {" ~ "}
                    <CharacterStats_Item stateKey={"off_hand_max_damage"} />
                  </div>
                </motion.li>
                <motion.li
                  layout
                  className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
                  key="off_hand_chance"
                  variants={liVariants}
                >
                  Off Hand Weapon Attack Chance:{" "}
                  <CharacterStats_Item stateKey={"off_hand_weapon_attack_chance"} />
                </motion.li>
              </>
            ) : null}
            {currentWeapon === "shield" ? (
              <>
                <motion.li
                  layout
                  className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
                  key="block"
                  variants={liVariants}
                >
                  Shield Block Chance: <CharacterStats_Item stateKey={"shield_block_chance"} />
                </motion.li>
                <motion.li
                  layout
                  className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
                  key="damage_reduction"
                  variants={liVariants}
                >
                  {" "}
                  Damage Reduction: <CharacterStats_Item stateKey={"damage_reduction"} />
                </motion.li>
              </>
            ) : null}

            <motion.li
              layout
              className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
              key="block"
              variants={liVariants}
            >
              Attack Speed <CharacterStats_Item stateKey={"attack_speed"} />
            </motion.li>
            <motion.li
              layout
              className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2"
              key="damage_reduction"
              variants={liVariants}
            >
              {" "}
              Attack Range: <CharacterStats_Item stateKey={"attack_range"} />
            </motion.li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CharacterStats_Group__Weapon;
