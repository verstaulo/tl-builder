import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CHARACTER_EQUIPMENT from "../data/CHARACTER_EQUIPMENT.json";
import {
  TCharacterEquipmentState,
  TEquipUnequipPayload,
  TTraitsPayload,
  TIncreaseDecreaseItemStatsPayload,
} from "./types";

const initialState: TCharacterEquipmentState = CHARACTER_EQUIPMENT;

const characterEquipmentSlice = createSlice({
  name: "characterEquipment",
  initialState,
  reducers: {
    putOnEquipment(state, action: PayloadAction<TEquipUnequipPayload>) {
      const { itemStateKey, item } = action.payload;

      if (
        (itemStateKey === "secondary_weapon" ||
          itemStateKey === "main_weapon") &&
        item.itemGroup === "weapon"
      ) {
        state[itemStateKey] = item;
      } else if (
        (itemStateKey === "head" ||
          itemStateKey === "body" ||
          itemStateKey === "gloves" ||
          itemStateKey === "legs" ||
          itemStateKey === "boots" ||
          itemStateKey === "cloak") &&
        item.itemGroup === "armor"
      ) {
        state[itemStateKey] = item;
      } else if (
        (itemStateKey === "ring_first" ||
          itemStateKey === "ring_second" ||
          itemStateKey === "bracelet" ||
          itemStateKey === "belt" ||
          itemStateKey === "necklace") &&
        item.itemGroup === "accessory"
      ) {
        state[itemStateKey] = item;
      }

      if (item.setInfo) {
        state.set_bonus_counter[item.setInfo.setName] += 1;
      }
    },

    takeOffEquipment(state, action: PayloadAction<TEquipUnequipPayload>) {
      const { itemStateKey, item } = action.payload;
      if (item.setInfo) {
        state.set_bonus_counter[item.setInfo.setName] -= 1;
      }
      state[itemStateKey] = null;
    },

    addTraitsToEquipment(state, action: PayloadAction<TTraitsPayload>) {
      const { itemStateKey, stats } = action.payload;
      state[itemStateKey]!.selectedTraits = stats;
    },

    improveEquipment(
      state,
      action: PayloadAction<TIncreaseDecreaseItemStatsPayload>
    ) {
      const { itemStateKey, stats, itemLevel } = action.payload;
      state[itemStateKey]!.level = itemLevel;
      let key: keyof typeof stats;
      for (key in stats) {
        state[itemStateKey]!.stats[key] = parseFloat(
          ((state[itemStateKey]!.stats[key] ?? 0) + stats[key]!).toFixed(3)
        );
      }
    },
  },
});

export const {
  putOnEquipment,
  takeOffEquipment,
  improveEquipment,
  addTraitsToEquipment,
} = characterEquipmentSlice.actions;
export default characterEquipmentSlice.reducer;
