const achievementBonus = {
  strength: {
    title:
      "The source of physical prowess. Provides strong Defense in addition to increasing Max Health, Health Regeneration, Max Damage and Min Damage.",
    bonusList: [
      "30pt Max Health +750",
      "40pt Damage Reduction +15",
      "50pt Heavy Attack Chance +100",
      "60pt Max Health +950",
    ],
  },
  dexterity: {
    title:
      "The source of proficiency. Increases quickness and critical attacks in addition to Evasion and Max Damage.",
    bonusList: [
      "30pt Critical Hit +100",
      "40pt Bonus Damage +15",
      "50pt Move Speed +5%",
      "60pt Critical Hit +120",
    ],
  },
  wisdom: {
    title:
      "The source of mental prowess. Increases Max Mana and Mana Regeneration in addition to cooldown abilities and Max Damage.",
    bonusList: [
      "30pt Max Mana +750",
      "40pt Debuff Duration -5%",
      "50pt Cooldown Speed +5%",
      "60pt Max Mana +900",
    ],
  },
  perception: {
    title:
      "The source of sense-related abilities. Heightens awarness during battle. Increases the accuracy of attacks, CC effects, enhances time boost abilities and Max Damage.",
    bonusList: ["30pt Hit +100", "40pt Buff Duration +5%", "50pt Range +7.5%", "60pt Hit +120"],
  },
};

type title = keyof typeof achievementBonus;
interface Props {
  title: title;
  currentValue: number;
}

const CharacterAttributes_Bonuses = ({ title, currentValue }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-2 bg-neutral6 p-2 select-none">
      <p className="text-neutral4 text-center text-sm">{achievementBonus[title].title}</p>
      <ul>
        <li
          className={
            "flex items-center gap-2 " + (currentValue >= 30 ? "text-secondary" : "text-neutral5")
          }
        >
          <span
            className={
              "block size-3 rounded  " + (currentValue >= 30 ? "bg-secondary" : "bg-neutral5")
            }
          ></span>{" "}
          <span>{achievementBonus[title].bonusList[0]}</span>
        </li>
        <li
          className={
            "flex items-center gap-2 " + (currentValue >= 40 ? "text-secondary" : "text-neutral5")
          }
        >
          <span
            className={
              "block size-3 rounded  " + (currentValue >= 40 ? "bg-secondary" : "bg-neutral5")
            }
          ></span>{" "}
          <span>{achievementBonus[title].bonusList[1]}</span>
        </li>
        <li
          className={
            "flex items-center gap-2 " + (currentValue >= 50 ? "text-secondary" : "text-neutral5")
          }
        >
          <span
            className={
              "block size-3 rounded  " + (currentValue >= 50 ? "bg-secondary" : "bg-neutral5")
            }
          ></span>{" "}
          <span>{achievementBonus[title].bonusList[2]}</span>
        </li>
        <li
          className={
            "flex items-center gap-2 " + (currentValue >= 60 ? "text-secondary" : "text-neutral5")
          }
        >
          <span
            className={
              "block size-3 rounded  " + (currentValue >= 60 ? "bg-secondary" : "bg-neutral5")
            }
          ></span>{" "}
          <span>{achievementBonus[title].bonusList[3]}</span>
        </li>
      </ul>
    </div>
  );
};
export default CharacterAttributes_Bonuses;
