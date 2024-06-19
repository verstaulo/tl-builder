import { TAvailableSetNames, TAvailableWeaponTypes, TOptionalStats } from "@store/types.ts";
import { inRange } from "./inRange";
import { TSetBonusCounter } from "@store/characterEquipmentSlice/types.ts";
import pattern from "@store/data/DAMAGE_PER_POINT_PATTERN.json";
import BONUS_STATS from "@store/data/SET_BONUS_STATS.json";
//
interface TConfig {
  stats: TOptionalStats;
  isMainWeapon: boolean;
  weaponType: TAvailableWeaponTypes | null;
  setBonusName: TAvailableSetNames | null;
  currentWeapon: TAvailableWeaponTypes | null;
  currentBonusRange: number;
  currentAttackRange: number;
  defaultAttackRange: number;
  currentStrength: number;
  currentDexterity: number;
  currentWisdom: number;
  currentPerception: number;
  currentMaxDamage: number;
  currentMinDamage: number;
  currentMoveSpeed: number;
  currentMoveSpeedBonus: number;
  currentSetBonusCounter: TSetBonusCounter;
  operationType: "add" | "remove";
}

type TSet = {
  [key in TAvailableSetNames]: TOptionalStats[];
};

//TODO: Attack Speed logic
//TODO: Off-hand logic
//TODO: Shield Block Chance logic
//TODO: Cooldown Speed with DEMINITION
//TODO: FIX Off Hand max damage

export const prepareStats = (config: TConfig): TOptionalStats => {
  const result: TOptionalStats = {};
  const SET_BONUS_STATS: TSet = BONUS_STATS;

  // MAIN LOGIC (default, with weapon, weapon)
  const current_strength_bonus: number = config.currentWeapon
    ? pattern[config.currentWeapon].strength[config.currentStrength - 10]
    : 0;
  const current_dexterity_bonus: number = config.currentWeapon
    ? pattern[config.currentWeapon].dexterity[config.currentDexterity - 10]
    : 0;
  const current_wisdom_bonus: number = config.currentWeapon
    ? pattern[config.currentWeapon].wisdom[config.currentWisdom - 10]
    : 0;
  const current_perception_bonus: number = config.currentWeapon
    ? pattern[config.currentWeapon].perception[config.currentPerception - 10]
    : 0;

  let key: keyof typeof config.stats;

  for (key in config.stats) {
    if (config.stats[key]! > 0) {
      switch (key) {
        case "move_speed_bonus":
          result[key] = config.stats[key];
          result.move_speed = Number(
            (
              600 +
              (600 * (config.currentMoveSpeedBonus + (config.stats[key] ?? 0))) / 100 -
              config.currentMoveSpeed
            ).toFixed(3)
          );
          break;
        case "bonus_range":
          result[key] = config.stats[key];
          if (config.currentAttackRange != 0) {
            result.attack_range = Number(
              (
                config.defaultAttackRange +
                (config.defaultAttackRange *
                  ((config.stats[key] ?? 0) + config.currentBonusRange)) /
                  100 -
                config.currentAttackRange
              ).toFixed(3)
            );
          }
          break;
        case "hit":
          result.magic_hit = (result.magic_hit ?? 0) + (config.stats[key] ?? 0);
          result.ranged_hit = (result.ranged_hit ?? 0) + (config.stats[key] ?? 0);
          result.melee_hit = (result.melee_hit ?? 0) + (config.stats[key] ?? 0);
          break;
        case "critical_hit":
          result.melee_critical_hit = (result.melee_critical_hit ?? 0) + (config.stats[key] ?? 0);
          result.ranged_critical_hit = (result.ranged_critical_hit ?? 0) + (config.stats[key] ?? 0);
          result.magic_critical_hit = (result.magic_critical_hit ?? 0) + (config.stats[key] ?? 0);
          break;
        case "heavy_attack_chance":
          result.melee_heavy_attack_chance =
            (result.melee_heavy_attack_chance ?? 0) + (config.stats[key] ?? 0);
          result.ranged_heavy_attack_chance =
            (result.ranged_heavy_attack_chance ?? 0) + (config.stats[key] ?? 0);
          result.magic_heavy_attack_chance =
            (result.magic_heavy_attack_chance ?? 0) + (config.stats[key] ?? 0);
          break;
        case "strength":
          result[key] = config.stats[key];
          result.melee_defense = (result.melee_defense ?? 0) + 5 * (config.stats[key] ?? 0);
          result.ranged_defense = (result.ranged_defense ?? 0) + 5 * (config.stats[key] ?? 0);
          result.max_health = (result.max_health ?? 0) + 45 * (config.stats[key] ?? 0);
          result.health_regen = (result.health_regen ?? 0) + 3.75 * (config.stats[key] ?? 0);

          if (config.operationType == "add" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              pattern[config.currentWeapon].strength[
                result.strength! + (config.currentStrength - 10)
              ] -
              current_strength_bonus;
            result.main_min_damage =
              (result.main_min_damage ?? 0) +
              pattern[config.currentWeapon].strength[
                result.strength! + (config.currentStrength - 10)
              ] -
              current_strength_bonus;
          }
          if (config.operationType == "remove" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (current_strength_bonus -
                pattern[config.currentWeapon].strength[
                  config.currentStrength - result.strength! - 10
                ]);

            result.main_min_damage =
              (result.main_min_damage ?? 0) +
              (current_strength_bonus -
                pattern[config.currentWeapon].strength[
                  config.currentStrength - result.strength! - 10
                ]);
          }
          break;
        case "dexterity":
          result[key] = config.stats[key];
          // result.attack_speed -= 0.002 * (stats[key] ?? 0);
          result.melee_evasion = (result.melee_evasion ?? 0) + 2 * (config.stats[key] ?? 0);
          result.ranged_evasion = (result.ranged_evasion ?? 0) + 2 * (config.stats[key] ?? 0);
          result.magic_evasion = (result.magic_evasion ?? 0) + 2 * (config.stats[key] ?? 0);
          result.melee_critical_hit =
            (result.melee_critical_hit ?? 0) + 5 * (config.stats[key] ?? 0);
          result.ranged_critical_hit =
            (result.ranged_critical_hit ?? 0) + 5 * (config.stats[key] ?? 0);
          result.magic_critical_hit =
            (result.magic_critical_hit ?? 0) + 5 * (config.stats[key] ?? 0);

          if (config.operationType == "add" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (pattern[config.currentWeapon].dexterity[
                result.dexterity! + (config.currentDexterity - 10)
              ] -
                current_dexterity_bonus);
          }

          if (config.operationType == "remove" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (current_dexterity_bonus -
                pattern[config.currentWeapon].dexterity[
                  config.currentDexterity - 10 - result.dexterity!
                ]);
          }
          break;
        case "wisdom":
          result[key] = config.stats[key];
          result.max_mana = (result.max_mana ?? 0) + 45 * (config.stats[key] ?? 0);

          result.mana_regen = (result.mana_regen ?? 0) + 3.75 * (config.stats[key] ?? 0);

          result.cooldown_speed = (result.cooldown_speed ?? 0) + 0.25 * (config.stats[key] ?? 0);

          if (config.operationType == "add" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (pattern[config.currentWeapon].wisdom[result.wisdom! + config.currentWisdom - 10] -
                current_wisdom_bonus);
          }
          if (config.operationType == "remove" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (current_wisdom_bonus -
                pattern[config.currentWeapon].dexterity[
                  config.currentWisdom - result.wisdom! - 10
                ]);
          }
          break;
        case "perception":
          result[key] = config.stats[key];
          result.melee_hit = (result.melee_hit ?? 0) + 5 * (config.stats[key] ?? 0);
          result.ranged_hit = (result.ranged_hit ?? 0) + 5 * (config.stats[key] ?? 0);
          result.magic_hit = (result.magic_hit ?? 0) + 5 * (config.stats[key] ?? 0);
          result.weaken_chance = (result.weaken_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.stun_chance = (result.stun_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.petrification_chance =
            (result.petrification_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.silence_chance = (result.silence_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.sleep_chance = (result.sleep_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.bind_chance = (result.bind_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.terror_chance = (result.terror_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.collision_chance = (result.collision_chance ?? 0) + 5 * (config.stats[key] ?? 0);
          result.buff_duration = (result.buff_duration ?? 0) + 0.5 * (config.stats[key] ?? 0);

          if (config.operationType == "add" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (pattern[config.currentWeapon].perception[
                result.perception! + config.currentPerception - 10
              ] -
                current_perception_bonus);

            result.main_min_damage =
              (result.main_min_damage ?? 0) +
              (pattern[config.currentWeapon].perception[
                result.perception! + config.currentPerception - 10
              ] -
                current_perception_bonus);
          }
          if (config.operationType == "remove" && config.currentWeapon) {
            result.main_max_damage =
              (result.main_max_damage ?? 0) +
              (current_perception_bonus -
                pattern[config.currentWeapon].perception[
                  config.currentPerception - result.perception! - 10
                ]);

            result.main_min_damage =
              (result.main_min_damage ?? 0) +
              (current_perception_bonus -
                pattern[config.currentWeapon].perception[
                  config.currentPerception - result.perception! - 10
                ]);
          }
          break;
        default:
          result[key] = (result[key] ?? 0) + (config.stats[key] ?? 0);
      }
    }
  }

  // EQUIP MAIN WEAPON
  if (!config.currentWeapon && config.isMainWeapon && config.weaponType) {
    result.main_max_damage! +=
      pattern[config.weaponType].strength[(result.strength ?? 0) + (config.currentStrength - 10)] +
      pattern[config.weaponType].dexterity[
        (result.dexterity ?? 0) + (config.currentDexterity - 10)
      ] +
      pattern[config.weaponType].wisdom[(result.wisdom ?? 0) + (config.currentWisdom - 10)] +
      pattern[config.weaponType].perception[
        (result.perception ?? 0) + (config.currentPerception - 10)
      ];

    result.main_min_damage! +=
      pattern[config.weaponType].strength[(result.strength ?? 0) + (config.currentStrength - 10)] +
      pattern[config.weaponType].perception[
        (result.perception ?? 0) + (config.currentPerception - 10)
      ];
    result.attack_range = Number(
      (
        (result.attack_range ?? 0) +
        ((result.attack_range ?? 0) *
          ((config.stats.bonus_range ?? 0) + config.currentBonusRange)) /
          100
      ).toFixed(2)
    );
  }

  // UNEQUIP MAIN WEAPON
  if (config.operationType == "remove" && config.isMainWeapon) {
    result.main_max_damage = config.currentMaxDamage;
    result.main_min_damage = config.currentMinDamage;
    result.attack_range = config.currentAttackRange;
  }

  // ADDING ATTR BONUS TO RESULT
  if ("strength" in result) {
    const nextStrength =
      config.operationType == "add"
        ? config.currentStrength + (result.strength ?? 0)
        : config.operationType == "remove"
        ? config.currentStrength - (result.strength ?? 0)
        : 0;

    if (
      (config.currentStrength < 30 && inRange(nextStrength, 30, 40)) ||
      (config.currentStrength >= 30 && nextStrength < 30)
    ) {
      result.max_health = (result.max_health ?? 0) + 750;
    }
    if (
      (config.currentStrength < 40 && inRange(nextStrength, 40, 50)) ||
      (config.currentStrength >= 40 && nextStrength < 40)
    ) {
      result.damage_reduction = (result.damage_reduction ?? 0) + 15;
    }
    if (
      (config.currentStrength < 50 && inRange(nextStrength, 50, 60)) ||
      (config.currentStrength >= 50 && nextStrength < 50)
    ) {
      result.melee_heavy_attack_chance = (result.melee_heavy_attack_chance ?? 0) + 100;

      result.ranged_heavy_attack_chance = (result.ranged_heavy_attack_chance ?? 0) + 100;

      result.magic_heavy_attack_chance = (result.magic_heavy_attack_chance ?? 0) + 100;
    }
    if (
      (config.currentStrength < 60 && inRange(nextStrength, 60, 70)) ||
      (config.currentStrength >= 60 && nextStrength < 60)
    ) {
      result.max_health = (result.max_health ?? 0) + 950;
    }
  }
  if ("dexterity" in result) {
    const nextDexterity =
      config.operationType == "add"
        ? config.currentDexterity + (result.dexterity ?? 0)
        : config.operationType == "remove"
        ? config.currentDexterity - (result.dexterity ?? 0)
        : 0;
    if (
      (config.currentDexterity < 30 && inRange(nextDexterity, 30, 40)) ||
      (config.currentDexterity >= 30 && nextDexterity < 30)
    ) {
      result.melee_critical_hit = (result.melee_critical_hit ?? 0) + 100;
      result.ranged_critical_hit = (result.ranged_critical_hit ?? 0) + 100;
      result.magic_critical_hit = (result.magic_critical_hit ?? 0) + 100;
    }
    if (
      (config.currentDexterity < 40 && inRange(nextDexterity, 40, 50)) ||
      (config.currentDexterity >= 40 && nextDexterity < 40)
    ) {
      result.damage_bonus = (result.damage_bonus ?? 0) + 15;
    }
    if (
      (config.currentDexterity < 50 && inRange(nextDexterity, 50, 60)) ||
      (config.currentDexterity >= 50 && nextDexterity < 50)
    ) {
      result.move_speed_bonus = (result.move_speed_bonus ?? 0) + 5;
      if (config.operationType === "add") {
        result.move_speed = Number(
          (
            600 +
            (600 * (config.currentMoveSpeedBonus + 5)) / 100 -
            config.currentMoveSpeed
          ).toFixed(3)
        );
      }
      if (config.operationType === "remove") {
        result.move_speed = Number(
          (
            config.currentMoveSpeed -
            (600 + (600 * (config.currentMoveSpeedBonus - 5)) / 100)
          ).toFixed(3)
        );
      }
    }
    if (
      (config.currentDexterity < 60 && inRange(nextDexterity, 60, 70)) ||
      (config.currentDexterity >= 60 && nextDexterity < 60)
    ) {
      result.melee_critical_hit = (result.melee_critical_hit ?? 0) + 120;
      result.ranged_critical_hit = (result.ranged_critical_hit ?? 0) + 120;
      result.magic_critical_hit = (result.magic_critical_hit ?? 0) + 120;
    }
  }
  if ("wisdom" in result) {
    const nextWisdom =
      config.operationType == "add"
        ? config.currentWisdom + (result.wisdom ?? 0)
        : config.operationType == "remove"
        ? config.currentWisdom - (result.wisdom ?? 0)
        : 0;
    if (
      (config.currentWisdom < 30 && inRange(nextWisdom, 30, 40)) ||
      (config.currentWisdom >= 30 && nextWisdom < 30)
    ) {
      result.max_mana = (result.max_mana ?? 0) + 750;
    }
    if (
      (config.currentWisdom < 40 && inRange(nextWisdom, 40, 50)) ||
      (config.currentWisdom >= 40 && nextWisdom < 40)
    ) {
      result.debuff_duration = (result.debuff_duration ?? 0) + 5;
    }
    if (
      (config.currentWisdom < 50 && inRange(nextWisdom, 50, 60)) ||
      (config.currentWisdom >= 50 && nextWisdom < 50)
    ) {
      result.cooldown_speed = (result.cooldown_speed ?? 0) + 5;
    }
    if (
      (config.currentWisdom < 60 && inRange(nextWisdom, 60, 70)) ||
      (config.currentWisdom >= 60 && nextWisdom < 60)
    ) {
      result.max_mana = (result.max_mana ?? 0) + 900;
    }
  }
  if ("perception" in result) {
    const nextPerception =
      config.operationType == "add"
        ? config.currentPerception + (result.perception ?? 0)
        : config.operationType == "remove"
        ? config.currentPerception - (result.perception ?? 0)
        : 0;
    if (
      (config.currentPerception < 30 && inRange(nextPerception, 30, 40)) ||
      (config.currentPerception >= 30 && nextPerception < 30)
    ) {
      result.melee_hit = (result.melee_hit ?? 0) + 100;
      result.ranged_hit = (result.ranged_hit ?? 0) + 100;
      result.magic_hit = (result.magic_hit ?? 0) + 100;
    }
    if (
      (config.currentPerception < 40 && inRange(nextPerception, 40, 50)) ||
      (config.currentPerception >= 40 && nextPerception < 40)
    ) {
      result.buff_duration = (result.buff_duration ?? 0) + 5;
    }
    if (
      (config.currentPerception < 50 && inRange(nextPerception, 50, 60)) ||
      (config.currentPerception >= 50 && nextPerception < 50)
    ) {
      result.bonus_range = (result.bonus_range ?? 0) + 7.5;
      if (config.operationType === "add") {
        if (config.currentAttackRange != 0) {
          result.attack_range = Number(
            (
              config.defaultAttackRange +
              (config.defaultAttackRange * (config.currentBonusRange + 7.5)) / 100 -
              config.currentAttackRange
            ).toFixed(2)
          );
        }
      }
      if (config.operationType === "remove") {
        if (config.currentAttackRange != 0) {
          result.attack_range = Number(
            (
              config.currentAttackRange -
              (config.defaultAttackRange +
                (config.defaultAttackRange * (config.currentBonusRange - 7.5)) / 100)
            ).toFixed(2)
          );
        }
      }
    }
    if (
      (config.currentPerception < 60 && inRange(nextPerception, 60, 70)) ||
      (config.currentPerception >= 60 && nextPerception < 60)
    ) {
      result.melee_hit = (result.melee_hit ?? 0) + 120;
      result.ranged_hit = (result.ranged_hit ?? 0) + 120;
      result.magic_hit = (result.magic_hit ?? 0) + 120;
    }
  }

  // ADDING SET BONUS TO RESULT

  if (config.setBonusName) {
    if (
      (config.operationType == "add" && config.currentSetBonusCounter[config.setBonusName] == 1) ||
      (config.operationType == "remove" && config.currentSetBonusCounter[config.setBonusName] == 2)
    ) {
      const statName = Object.keys(
        SET_BONUS_STATS[config.setBonusName][0]
      )[0] as keyof TOptionalStats;

      if (result[statName]) {
        result[statName] =
          (result[statName] ?? 0) + (SET_BONUS_STATS[config.setBonusName][0][statName] ?? 0);
      } else result[statName] = SET_BONUS_STATS[config.setBonusName][0][statName];
    }
    if (
      (config.operationType == "add" && config.currentSetBonusCounter[config.setBonusName] === 3) ||
      (config.operationType == "remove" && config.currentSetBonusCounter[config.setBonusName] === 4)
    ) {
      const statName = Object.keys(
        SET_BONUS_STATS[config.setBonusName][1]
      )[0] as keyof TOptionalStats;

      if (result[statName]) {
        result[statName] =
          (result[statName] ?? 0) + (SET_BONUS_STATS[config.setBonusName][1][statName] ?? 0);
      } else result[statName] = SET_BONUS_STATS[config.setBonusName][1][statName];
    }
  }

  return result;
};
