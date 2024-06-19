import CHARACTER_STATS from "./data/CHARACTER_STATS.json";

export type TCharacterStats = typeof CHARACTER_STATS;
export type addStats = {
  hit: number;
  critical_hit: number;
  heavy_attack_chance: number;
};
export type TOptionalStats = Partial<TCharacterStats & addStats>;

type TPerk = {
  image: string;
  title: string;
  description: string;
};
type TSetEffects = {
  two_items: TOptionalStats;
  four_items?: TOptionalStats;
};
export type TSetInfo = {
  setEffects: TSetEffects;
  setName: TAvailableSetNames;
  setTitle: string;
};
export type TAvailableSetNames =
  | "chief_commander_set"
  | "death_set"
  | "ghost_wolf_set"
  | "imperator_set"
  | "mother_nature_set"
  | "transcended_one_set"
  | "dimensional_chaos_set";
export type TAvailableWeaponTypes =
  | "staff"
  | "dagger"
  | "wand"
  | "crossbow"
  | "longbow"
  | "greatsword"
  | "shield";
export type TAvailableArmorTypes =
  | "head_heavy"
  | "head_light"
  | "head_cloth"
  | "body_heavy"
  | "body_light"
  | "body_cloth"
  | "gloves_heavy"
  | "gloves_light"
  | "gloves_cloth"
  | "legs_heavy"
  | "legs_light"
  | "legs_cloth"
  | "boots_heavy"
  | "boots_light"
  | "boots_cloth"
  | "cloak";
type TAvailableAccessoryTypes = "necklace" | "belt" | "bracelet" | "ring";

export enum ITEMGROUPS {
  weapon = "weapon",
  armor = "armor",
  accessory = "accessory",
}
export enum TIERGROUPS {
  legendary = "legendary",
  epic = "epic",
  epic2 = "epic2",
  rare = "rare",
  common = "common",
  uncommon = "uncommon",
}
export type TItemTypes = TAvailableWeaponTypes | TAvailableArmorTypes | TAvailableAccessoryTypes;

interface IItem {
  id: string;
  level: number;
  title: string;
  image: string;
  tier: TIERGROUPS;
  itemGroup: ITEMGROUPS;
  type: TItemTypes;
  stats: TOptionalStats;
  traits: TOptionalStats;
  perk?: TPerk;
  selectedTraits?: TOptionalStats;
  setInfo?: TSetInfo;
}

interface IDefaultItem<T extends ITEMGROUPS, K extends TItemTypes> extends IItem {
  itemGroup: T;
  type: K;
}

export type TWeapon = IDefaultItem<ITEMGROUPS.weapon, TAvailableWeaponTypes>;
export type TArmor = IDefaultItem<ITEMGROUPS.armor, TAvailableArmorTypes>;
export type TAccessory = IDefaultItem<ITEMGROUPS.accessory, TAvailableAccessoryTypes>;
export type TItem = TWeapon | TArmor | TAccessory;

export type TEnchantPatterns = { [key: string]: TEnchantPattern };
export type TEnchantPattern = { [key: string]: number[] };
export type TAttributeNames = "strength" | "dexterity" | "wisdom" | "perception";
