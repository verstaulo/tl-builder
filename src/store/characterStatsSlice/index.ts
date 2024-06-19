import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filteredSecondaryStats } from "@utils/filteredSecondaryStats";
import {
  TAvailableSetNames,
  TAvailableWeaponTypes,
  TCharacterStats,
  TOptionalStats,
} from "@store/types";
import CHARACTER_STATS from "../data/CHARACTER_STATS.json";
import { TCharacterEquipmentStateKeys } from "@store/characterEquipmentSlice/types";
import { RootState } from "..";
import { prepareStats } from "@utils/prepareStats";

type setCharacterStatsPayload = {
  stats: TOptionalStats;
  operationType: "add" | "remove";
  operationSource: "attribute" | "mastery" | "equipment" | "enchant";
  setName?: TAvailableSetNames | null;
  weaponType?: TAvailableWeaponTypes;
  itemStateKey?: TCharacterEquipmentStateKeys;
  masteryStatsSource?: "main_weapon" | "secondary_weapon";
};
export const setCharacterStats = createAsyncThunk(
  "characterStats/setCharacterStats",
  (incomeData: setCharacterStatsPayload, { getState, dispatch }) => {
    if (incomeData.masteryStatsSource == "secondary_weapon") return;

    const currentState = getState() as RootState;
    const config = {
      stats:
        incomeData.itemStateKey == "secondary_weapon"
          ? filteredSecondaryStats(incomeData.stats)
          : incomeData.stats,
      isMainWeapon:
        incomeData.itemStateKey === "main_weapon" && !currentState.characterEquipment.main_weapon,
      weaponType: incomeData.weaponType ?? null,
      setBonusName: incomeData.setName || null,
      currentWeapon: currentState.characterEquipment.main_weapon?.type || null,
      currentStrength: currentState.characterStats.strength,
      currentDexterity: currentState.characterStats.dexterity,
      currentWisdom: currentState.characterStats.wisdom,
      currentPerception: currentState.characterStats.perception,
      currentMaxDamage: currentState.characterStats.main_max_damage,
      currentMinDamage: currentState.characterStats.main_min_damage,
      currentSetBonusCounter: currentState.characterEquipment.set_bonus_counter,
      defaultAttackRange: currentState.characterEquipment.main_weapon?.stats.attack_range ?? 0,
      currentBonusRange: currentState.characterStats.bonus_range,
      currentAttackRange: currentState.characterStats.attack_range,
      currentMoveSpeed: currentState.characterStats.move_speed,
      currentMoveSpeedBonus: currentState.characterStats.move_speed_bonus,
      operationType: incomeData.operationType,
    };

    const preparedStats = prepareStats(config);

    if (incomeData.operationType == "add") {
      dispatch(addCharacterStats(preparedStats));
    } else {
      dispatch(removeCharacterStats(preparedStats));
    }
  }
);
const initialState: TCharacterStats = CHARACTER_STATS;

const characterStatsSlice = createSlice({
  name: "characterStats",
  initialState,
  reducers: {
    addCharacterStats(state, action: PayloadAction<Partial<TCharacterStats>>) {
      let key: keyof typeof action.payload;
      for (key in action.payload) {
        state[key] = parseFloat(((state[key] ?? 0) + action.payload[key]!).toFixed(3));
      }
    },

    removeCharacterStats(state, action: PayloadAction<Partial<TCharacterStats>>) {
      let key: keyof typeof action.payload;
      for (key in action.payload) {
        state[key] = parseFloat(((state[key] ?? 0) - action.payload[key]!).toFixed(3));
      }
    },
  },
});

export const { addCharacterStats, removeCharacterStats } = characterStatsSlice.actions;
export default characterStatsSlice.reducer;
