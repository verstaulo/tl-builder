import { useAppSelector } from "@store/index";
import { TSetInfo } from "@store/types";
import { keyToTitle } from "@utils/keyToTitle";

interface Props {
  setInfo: TSetInfo;
}

const EquipmentMenu_SetBonuses = ({ setInfo }: Props) => {
  const currentSetCount = useAppSelector(
    (store) => store.characterEquipment.set_bonus_counter[setInfo.setName]
  );
  return (
    <div className="bg-neutral7/95 rounded-xl text-neutral4 mb-2">
      <p className="p-2">
        <b>{setInfo.setTitle}</b>
      </p>
      <ul className="bg-neutral6/50 p-2">
        <li className={currentSetCount >= 2 ? "text-secondary" : ""}>
          <b>(2): </b>
          {keyToTitle(Object.keys(setInfo.setEffects.two_items)[0])}:{" "}
          {Object.entries(setInfo.setEffects.two_items)[0][1] as number}
        </li>
        {setInfo.setEffects?.four_items ? (
          <li className={currentSetCount >= 4 ? "text-secondary" : ""}>
            <b>(4): </b>
            {keyToTitle(Object.keys(setInfo.setEffects.four_items)[0])} :{" "}
            {Object.entries(setInfo.setEffects.four_items)[0][1]}
          </li>
        ) : null}
      </ul>
    </div>
  );
};
export default EquipmentMenu_SetBonuses;
