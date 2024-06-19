import { TOptionalStats } from "@store/types";

export const filteredSecondaryStats = (stats: TOptionalStats) => {
  const filteredStats = Object.keys(stats)
    .filter((key) => {
      if (
        key != "main_max_damage" &&
        key != "main_min_damage" &&
        key != "attack_speed" &&
        key != "attack_range" &&
        key != "shield_block_chance" &&
        key != "off_hand_weapon_attack_chance" &&
        key != "damage_reduction"
      ) {
        return key;
      }
    })
    .reduce((resultObj: TOptionalStats, key) => {
      resultObj[key as keyof TOptionalStats] = stats[key as keyof TOptionalStats];
      return resultObj;
    }, {});
  return filteredStats;
};
