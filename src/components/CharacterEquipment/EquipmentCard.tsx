interface CardProps {
  defaultStyle?: boolean;
  tier: string;
  image: string;
  title: string;
  level: number;
  titleVisibilty?: boolean;
  className?: string;
}
const backgroundStyles = {
  legendary: " bg-legendary_gradient",
  epic: " bg-epic_gradient",
  epic2: " bg-epic_gradient",
  rare: " bg-rare_gradient",
  uncommon: " bg-uncommon_gradient",
  common: " bg-common_gradient",
};
const hoverStyles = {
  legendary: "group-hover:drop-shadow-legendary",
  epic: "group-hover:drop-shadow-epic",
  epic2: "group-hover:drop-shadow-epic2",
  rare: "group-hover:drop-shadow-rare",
  uncommon: "group-hover:drop-shadow-uncommon",
  common: "group-hover:drop-shadow-common",
};

const EquipmentCard = ({
  tier,
  image,
  title,
  level,
  defaultStyle,
  titleVisibilty,
  className = "",
}: CardProps) => {
  return (
    <div
      className={
        "group rounded-[0.5rem] select-none lg:p-2 flex justify-center items-center gap-2 min-w-10 " +
        (defaultStyle ? " size-auto " : " size-16 ") +
        backgroundStyles[tier as keyof typeof backgroundStyles] +
        " " +
        (className ? className : "")
      }
    >
      <img
        className={
          "size-10 group-hover:scale-[1.2] transition-all " +
          hoverStyles[tier as keyof typeof hoverStyles]
        }
        draggable="false"
        src={image}
        alt=""
      />
      <p className={"text-neutral3 grow lg:block " + (titleVisibilty ? "sm:block" : "sm:hidden")}>
        {title}
      </p>
      {level > 0 && (
        <span className="hidden size-6 lg:inline-block px-2 text-[14px] font-semibold text-neutral4 leading-6 rounded-lg bg-neutral6">
          {level}
        </span>
      )}
    </div>
  );
};
export default EquipmentCard;
