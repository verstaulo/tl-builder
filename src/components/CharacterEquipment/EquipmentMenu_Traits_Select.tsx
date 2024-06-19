import { AnimatePresence, motion } from "framer-motion";
import selectIcon from "../../assets/right_arrow_icon.svg";
import { keyToTitle } from "@utils/keyToTitle";

interface SelectProps {
  isOpen: boolean;
  title: string;
  options: [string, number][];
  selectHandler: (value: [string, number]) => void;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Select = ({ isOpen, title, options, selectHandler, onClick }: SelectProps) => {
  return (
    <div>
      <button
        className="bg-neutral6/50 p-2 pr-5 w-full text-left text-neutral3 flex justify-between items-center"
        onClick={onClick}
      >
        <span className={title === "Choose Trait" ? "text-secondary" : ""}>
          {keyToTitle(title)}
        </span>
        <img
          className={"h-full transition-all " + (isOpen ? "rotate-90" : "")}
          src={selectIcon}
          alt="arrow"
        />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.ul
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="text-sm"
          >
            {options.map(([key, value]) => (
              <li
                key={key}
                className="cursor-pointer hover:text-secondary px-2 py-1"
                onClick={() => selectHandler([key, value])}
              >
                <span>{keyToTitle(key)}: </span>{" "}
                <span>
                  {value} ~ {value * 4}
                </span>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
export default Select;
