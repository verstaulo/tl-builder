import { useState } from "react";
import CharacterAttributes_Counter from "./CharacterAttributes_Counter";
import strength from "../../assets/attr/strength.webp";
import dexterity from "../../assets/attr/dexterity.webp";
import wisdom from "../../assets/attr/wisdom.webp";
import perception from "../../assets/attr/strength.webp";
import { useAppDispatch } from "@store/index";
import { inRange } from "@utils/inRange";
import { setCharacterStats } from "@store/characterStatsSlice";
import { TAttributeNames } from "@store/types";

const ATTRIBUTES = [
  { stateKey: "strength", image: strength },
  { stateKey: "dexterity", image: dexterity },
  { stateKey: "wisdom", image: wisdom },
  { stateKey: "perception", image: perception },
];
const initialState = {
  strength: 0,
  dexterity: 0,
  wisdom: 0,
  perception: 0,
};

const CharacterAttributes = () => {
  const [localAtributes, setAddedAtributes] = useState(initialState);
  const [availablePoints, setAvailablePoints] = useState<number>(49);

  const dispatch = useAppDispatch();

  const handleMinus = (attrName: TAttributeNames) => {
    const currentValue = localAtributes[attrName];
    if (currentValue === 0) return;
    const requieredPoints = inRange(currentValue, 21, 30)
      ? 2
      : inRange(currentValue, 31, 40)
      ? 4
      : 1;

    if (availablePoints + requieredPoints <= 49) {
      setAvailablePoints((prev) => prev + requieredPoints);
      setAddedAtributes((prev) => ({ ...prev, [attrName]: prev[attrName] - 1 }));
      dispatch(
        setCharacterStats({
          stats: {
            [attrName]: 1,
          },
          operationType: "remove",
          operationSource: "attribute",
        })
      );
    }
  };

  const handlePlus = (attrName: TAttributeNames) => {
    const currentValue = localAtributes[attrName] + 1;
    const requieredPoints = inRange(currentValue, 21, 30)
      ? 2
      : inRange(currentValue, 31, 40)
      ? 4
      : 1;
    if (availablePoints - requieredPoints < 0) return;
    setAvailablePoints((prev) => prev - requieredPoints);
    setAddedAtributes((prev) => ({ ...prev, [attrName]: prev[attrName] + 1 }));
    dispatch(
      setCharacterStats({
        stats: {
          [attrName]: 1,
        },
        operationType: "add",
        operationSource: "attribute",
      })
    );
  };

  return (
    <section className="rounded-xl bg-neutral7/95 flex flex-col gap-1">
      <p className="text-center bg-neutral6/50 p-2 rounded-ss-xl rounded-se-xl">
        Available Stat Points Count: {availablePoints}
      </p>
      {ATTRIBUTES.map(({ stateKey, image }) => (
        <CharacterAttributes_Counter
          key={stateKey}
          image={image}
          title={stateKey as TAttributeNames}
          handleMinus={() => handleMinus(stateKey as TAttributeNames)}
          handlePlus={() => handlePlus(stateKey as TAttributeNames)}
        />
      ))}
    </section>
  );
};
export default CharacterAttributes;
