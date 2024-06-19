import info from "../../assets/info_icon.svg";
import { keyToTitle } from "@utils/keyToTitle";
import { TAttributeNames } from "@store/types";
import { useAppSelector } from "@store/index";
import CharacterAttributes_Bonuses from "./CharacterAttributes_Bonuses";

interface Props {
  image: string;
  title: TAttributeNames;
  handlePlus: () => void;
  handleMinus: () => void;
}

const CharacterAttributes_Counter = ({ image, title, handlePlus, handleMinus }: Props) => {
  const currentValue = useAppSelector((store) => store.characterStats[title as TAttributeNames]);
  return (
    <div className="relative ">
      <div className="p-2 flex justify-between items-center gap-3 select-none">
        <img className="h-full brightness-200 drop-shadow-legendary" src={image} alt="attr_image" />
        <p className="grow">{keyToTitle(title)}</p>
        <span className="size-6 px-2 text-[14px] font-semibold text-neutral4 leading-6 rounded-lg bg-neutral6 flex justify-center items-center">
          {currentValue}
        </span>
        <button
          onClick={handleMinus}
          className="bg-neutral5/50 rounded-full p-2 hover:bg-neutral4 size-6 flex justify-center items-center"
        >
          <svg
            width="16"
            height="2"
            viewBox="0 0 16 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1Z"
              fill="#E8ECEF"
            />
          </svg>
        </button>
        <button
          onClick={handlePlus}
          className="bg-primary/50 rounded-full p-2 hover:bg-primary size-6 flex justify-center items-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1V15M1 8H15"
              fill="none"
              stroke="#E8ECEF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <img className="cursor-help self-start" src={info} alt="info" />
      </div>
      <CharacterAttributes_Bonuses title={title} currentValue={currentValue} />
    </div>
  );
};
export default CharacterAttributes_Counter;
