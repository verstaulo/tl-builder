import { TAccessory, TArmor, TOptionalStats, TWeapon } from "../types";
export type TCharacterEquipmentState = {
  main_weapon: TWeapon | null;
  secondary_weapon: TWeapon | null;
  body: TArmor | null;
  head: TArmor | null;
  legs: TArmor | null;
  boots: TArmor | null;
  gloves: TArmor | null;
  cloak: TArmor | null;
  necklace: TAccessory | null;
  belt: TAccessory | null;
  bracelet: TAccessory | null;
  ring_first: TAccessory | null;
  ring_second: TAccessory | null;
  set_bonus_counter: TSetBonusCounter;
};
export type TSetBonusCounter = {
  chief_commander_set: number;
  death_set: number;
  ghost_wolf_set: number;
  imperator_set: number;
  mother_nature_set: number;
  transcended_one_set: number;
  dimensional_chaos_set: number;
};
export type TCharacterEquipmentStateKeys = keyof Omit<
  TCharacterEquipmentState,
  "set_bonus_counter"
>;

export type TEquipUnequipPayload = {
  itemStateKey: TCharacterEquipmentStateKeys;
  item: TArmor | TWeapon | TAccessory;
};

export type TIncreaseDecreaseItemStatsPayload = {
  itemStateKey: TCharacterEquipmentStateKeys;
  stats: TOptionalStats;
  itemLevel: number;
};

export type TTraitsPayload = {
  itemStateKey: TCharacterEquipmentStateKeys;
  stats: TOptionalStats;
};
