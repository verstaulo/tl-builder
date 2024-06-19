import { useAppSelector } from "@store/index";
import { TCharacterStats } from "@store/types";
import { useAnimate } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  stateKey: keyof TCharacterStats;
}

const CharacterStats_Item = ({ stateKey }: Props) => {
  const currentValue = useAppSelector((store) => store.characterStats[stateKey]);
  const [scope, animate] = useAnimate();

  const prev_value = useRef<number>(currentValue);
  const increase_type = "increase";

  useEffect(() => {
    if (increase_type == "increase" && scope.current) {
      if (currentValue > prev_value.current) {
        animate(
          scope.current,
          {
            color: ["#00ff00", "rgba(255, 255, 255, 0.87)"],
          },
          { duration: 2, ease: "linear" }
        );
      } else if (currentValue < prev_value.current) {
        animate(
          scope.current,
          {
            color: ["#f00", "rgba(255, 255, 255, 0.87)"],
          },
          { duration: 2 }
        );
      }
    }
    prev_value.current = currentValue;
  }, [animate, currentValue, scope]);
  return <span ref={scope}>{currentValue}</span>;
};
export default CharacterStats_Item;
