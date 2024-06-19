import { useState } from "react";



interface FilterProps {
  filtersList: string[];
  filterName: string;
  filterActiveName: string;
  handleSelectFilter: (key: string, value: string) => void;
}
const Filters = ({
  filterName,
  filtersList,
  filterActiveName,
  handleSelectFilter,
}: FilterProps) => {
  const [activeFilter, setActiveFilter] = useState(filterActiveName);
  return (
    <ul className="flex gap-2 flex-wrap justify-center">
      {filtersList.map((filter) => (
        <li key={filter}>
          <label
            className={
              "px-2 py-1 rounded-lg cursor-pointer transition-all " +
              (activeFilter === filter ? "bg-neutral7" : "")
            }
          >
            <span className="capitalize">{filter}</span>
            <input
              className="hidden"
              checked={activeFilter === filter}
              type="radio"
              name="tierFilter"
              onChange={() => {
                setActiveFilter(filter);
                handleSelectFilter(filterName, filter);
              }}
            ></input>
          </label>
        </li>
      ))}
    </ul>
  );
};
export default Filters;
