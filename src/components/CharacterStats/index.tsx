import STATS_GROUPS from "@store/data/STATS_GROUPS.json";
import CharacterStats_Group from "./CharacterStats_Group";
import { TCharacterStats } from "@store/types";
import CharacterStats_Group__Weapon from "./CharacterStats_Group__Weapon";

interface Props {
  className?: string;
}

const CharacterStats = ({ className }: Props) => {
  return (
    <section className={className}>
      <ul className="grid gap-5">
        <li key={"weapon"}>
          <CharacterStats_Group__Weapon />{" "}
        </li>
        {STATS_GROUPS.map(({ groupName, keys }, i) => (
          <li key={i} className={groupName === "Others" ? "xl:col-span-2" : ""}>
            <CharacterStats_Group
              groupName={
                groupName as "Defense" | "Attack" | "Protection" | "Others" | "Chance" | "Resist"
              }
              keys={keys as Array<keyof TCharacterStats>}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default CharacterStats;
