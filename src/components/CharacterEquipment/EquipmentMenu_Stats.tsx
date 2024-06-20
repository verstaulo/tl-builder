import { ITEMGROUPS, TItemTypes, TOptionalStats } from "@store/types";
import { keyToTitle } from "@utils/keyToTitle";
import right_arrow from "../../assets/right_arrow_icon.svg";
import { motion } from "framer-motion";
const groupStats = [
  "main_min_damage",
  "main_max_damage",
  "off_hand_min_damage",
  "off_hand_max_damage",
];
const priorityStats = [
  "attack_range",
  "attack_speed",
  "shield_block_chance",
  "off_hand_weapon_attack_chance",
  "melee_defense",
  "ranged_defense",
  "magic_defense",
  "damage_reduction",
];
interface Props {
  itemGroup: ITEMGROUPS;
  itemLevel: number;
  itemStats: TOptionalStats;
  enchantedStats: TOptionalStats;
  itemType: TItemTypes;
  mode: "info" | "edit";
}
const EquipmentMenu_Stats = ({
  itemGroup,
  itemLevel,
  itemStats,
  enchantedStats,
  itemType,
  mode,
}: Props) => {
  return (
    <motion.div  className="bg-neutral7/95 rounded-xl text-neutral3">
      <ul className="bg-neutral6/50 p-2">
        {itemGroup === "weapon" ? (
          <>
            <li
              key={"damage"}
              className={
                "grid gap-2 " +
                (mode === "edit" && itemLevel < 9
                  ? "grid-cols-[1fr,_25%,_25%]"
                  : "grid-cols-[1fr,_20%]")
              }
            >
              <span>Damage:</span>{" "}
              <span className="justify-self-end">
                {itemStats.main_min_damage} ~ {itemStats.main_max_damage}
              </span>
              {mode === "edit" && itemLevel < 9 && (
                <>
                  <span className="justify-self-end text-secondary flex justify-between w-full items-center">
                    <img src={right_arrow} alt="arrow" className="size-3 inline-block" />
                    {(enchantedStats.main_min_damage ?? 0) +
                      (itemStats.main_min_damage ?? 0)} ~{" "}
                    {(enchantedStats.main_max_damage ?? 0) + (itemStats.main_max_damage ?? 0)}
                  </span>
                </>
              )}
            </li>
            {itemType === "dagger" || itemType === "crossbow" ? (
              <li
                key={"off-hand"}
                className={
                  "grid gap-2 items-center " +
                  (mode === "edit" && itemLevel < 9
                    ? "grid-cols-[1fr,_25%,_25%]"
                    : "grid-cols-[1fr,_20%]")
                }
              >
                <span>Off-Hand Damage:</span>{" "}
                <span className="justify-self-end">
                  {itemStats.off_hand_min_damage} ~ <span>{itemStats.off_hand_max_damage}</span>
                </span>
                {mode === "edit" && itemLevel < 9 && (
                  <>
                    <span className="justify-self-end text-secondary flex justify-between w-full items-center">
                      <img src={right_arrow} alt="arrow" className="size-3 inline-block" />
                      <span>
                        {(enchantedStats.off_hand_min_damage ?? 0) +
                          (itemStats.off_hand_min_damage ?? 0)}{" "}
                        ~{" "}
                        {enchantedStats.off_hand_max_damage ??
                          0 + (itemStats.off_hand_max_damage ?? 0)}
                      </span>
                    </span>
                  </>
                )}
              </li>
            ) : null}
          </>
        ) : null}
        {Object.entries(itemStats).map(([key, value]) => {
          if (priorityStats.includes(key)) {
            return (
              <li
                key={key}
                className={
                  "grid gap-2 items-center " +
                  (mode === "edit" && itemLevel < 9
                    ? "grid-cols-[1fr,_25%,_25%]"
                    : "grid-cols-[1fr,_20%]")
                }
              >
                <span>{keyToTitle(key)}: </span>
                <span className="justify-self-end">{value}</span>
                {mode === "edit" && itemLevel < 9 && (
                  <>
                    <span className="justify-self-end text-secondary flex justify-between w-full items-center">
                      <img src={right_arrow} alt="arrow" className="size-3 inline-block" />
                      {Number(((enchantedStats[key as keyof typeof enchantedStats] ?? 0) +
                        (itemStats[key as keyof typeof itemStats] ?? 0)).toFixed(3))}
                    </span>
                  </>
                )}
              </li>
            );
          }
        })}
      </ul>
      {/* // Secondary Stats //  */}
      <ul className="p-2">
        {Object.entries(itemStats).map(([key, value]) => {
          if (!priorityStats.includes(key) && !groupStats.includes(key)) {
            return (
              <li
                key={key}
                className={
                  "grid gap-2 " +
                  (mode === "edit" && itemLevel < 9
                    ? "grid-cols-[1fr,_25%,_25%]"
                    : "grid-cols-[1fr,_20%]")
                }
              >
                <span>{keyToTitle(key)}: </span>
                <span className="justify-self-end">{value}</span>
                {mode === "edit" && itemLevel < 9 && (
                  <span className="justify-self-end text-secondary flex justify-between w-full items-center">
                    <img src={right_arrow} alt="arrow" className="size-3 inline-block" />
                    {Number(((enchantedStats[key as keyof typeof enchantedStats] ?? 0) +
                      (itemStats[key as keyof typeof itemStats] ?? 0)).toFixed(3))}
                  </span>
                )}
              </li>
            );
          }
        })}
      </ul>
    </motion.div>
  );
};
export default EquipmentMenu_Stats;
