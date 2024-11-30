import {H1} from "~/components/ui/typography";
import type {Route} from "./+types/food-item";

export default function FoodItemRoute({params}: Route.ComponentProps) {
  return (
    <div>
      <H1>Food Item - {params.slug}</H1>
    </div>
  );
}