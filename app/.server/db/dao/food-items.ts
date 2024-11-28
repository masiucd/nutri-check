import {eq, ilike, or, sql} from "drizzle-orm";
import {db} from "..";
import {foodCategories, foodItems, foodNutrients, slugs} from "../schema";

export async function getFoodItemsData({
  name,
  page,
  rows,
  categories,
  sort, // TODO: implement sorting
}: {
  name: string | null;
  page: number;
  rows: number;
  categories: number[];
  sort: string | null;
}) {
  try {
    return await db.transaction(async (trx) => {
      let allFoodCategories = await trx
        .selectDistinct({
          id: foodCategories.id,
          name: foodCategories.name,
        })
        .from(foodCategories);

      let totalFoodItems = await trx
        .select({count: sql`count(*)`.mapWith(Number)})
        .from(foodItems);
      let totalPages = Math.ceil(totalFoodItems[0].count / rows);

      let results = await trx
        .select({
          foodId: foodItems.id,
          foodName: foodItems.name,
          foodDescription: foodItems.description,
          foodCategory: {
            id: foodCategories.id,
            name: foodCategories.name,
          },
          slug: slugs.slug,
          nutrients: {
            calories: foodNutrients.calories,
            protein: foodNutrients.protein,
            fat: foodNutrients.fat,
            carbs: foodNutrients.carbs,
          },
        })
        .from(foodItems)
        .leftJoin(foodNutrients, eq(foodItems.id, foodNutrients.foodId))
        .leftJoin(
          foodCategories,
          eq(foodItems.foodCategoryId, foodCategories.id)
        )
        .leftJoin(slugs, eq(foodItems.id, slugs.objectId))
        .orderBy(sql`${foodItems.name} ASC`)
        .where(
          or(
            ...categories.map((categoryId) =>
              eq(foodItems.foodCategoryId, categoryId)
            ),
            name ? ilike(foodItems.name, `%${name}%`) : undefined
          )
        )
        .limit(rows)
        .offset((page - 1) * rows);

      return {
        results,
        totalPages,
        page,
        totalFoodItems: totalFoodItems[0].count,
        allFoodCategories,
      };
    });
  } catch (error) {
    console.error(error);
    return {
      results: [],
      totalPages: 0,
      page: 0,
      totalFoodItems: 0,
      allFoodCategories: [],
    };
  }
}

export type FoodItemData = Awaited<ReturnType<typeof getFoodItemsData>>;