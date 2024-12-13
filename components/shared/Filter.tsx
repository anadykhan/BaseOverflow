"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HomeFilters from "./home/HomeFilters";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }) => {
  return (
    <>
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border-none px-5 py-2.5 rounded-xl`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {filters.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                        {item.name}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    </>
  );
};
export default Filter;
