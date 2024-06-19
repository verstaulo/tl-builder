interface Props {
  image: string;
  title: string;
  description: string;
}

const EquipmentMenu_Perk = ({ image, title, description }: Props) => {
  return (
    <div className="rounded-xl bg-neutral7/20 p-2 flex items-center gap-2 mb-2">
      <img className="size-10 rounded-full" src={image} alt="perkImage" />
      <div>
        <p>{title}</p>
        <p className="text-neutral4 text-sm">{description}</p>
      </div>
    </div>
  );
};
export default EquipmentMenu_Perk;
