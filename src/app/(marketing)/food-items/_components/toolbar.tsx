import {Button} from "@/components/ui/button";
import {CategoryFilter} from "./category-filter";
import {FoodItemSearch} from "./food-item-search";

export function Toolbar() {
  return (
    <div className="mt-5 flex justify-between px-2 py-3">
      <div className="flex w-[22rem] gap-2 ">
        <FoodItemSearch />
        <CategoryFilter />
      </div>
      <div className="flex gap-2">
        <Button>Export</Button>
        <Button>View</Button>
      </div>
    </div>
  );
}
