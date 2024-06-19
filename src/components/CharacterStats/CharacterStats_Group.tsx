import { TCharacterStats } from "@store/types";
import CharacterStats_Item from "./CharacterStats_Item";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { keyToTitle } from "@utils/keyToTitle";

interface Props {
  groupName: "Defense" | "Weapons" | "Attack" | "Protection" | "Others" | "Chance" | "Resist";
  keys: Array<keyof TCharacterStats>;
}
const ulVariants = {
  hidden: { height: 0},
  show: {
    height: "auto",
    transition: { staggerChildren: 0.05 },
  },
  exit: { height: 0},
};

const liVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const CharacterStats_Group = ({ groupName, keys }: Props) => {
  const [isListOpen, setListOpen] = useState(true);

  return (
    <motion.div className="bg-neutral7/95 rounded-xl overflow-hidden min-w-[21.875rem]">
      <button
        onClick={() => setListOpen(!isListOpen)}
        className="bg-neutral6/50 p-2 w-full text-neutral3 text-center hover:bg-neutral6/75"
      >
        {groupName}
      </button>
      <AnimatePresence>
        {isListOpen && (
          <motion.ul
            variants={ulVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={
              "select-none " + (groupName === "Others" && "xl:grid xl:grid-cols-2 xl:gap-x-5")
            }
          >
            {keys.map((stateKey, i) => (
              <motion.li variants={liVariants} className="flex justify-between pr-2 pl-2 last:pb-2 first:pt-2" key={stateKey}>
                <span>{keyToTitle(stateKey)}</span>
                <CharacterStats_Item key={i} stateKey={stateKey} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default CharacterStats_Group;
