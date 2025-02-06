import { getRecipesByCategory } from '@/lib/data';
import { serif } from '@/components/font';
import RecipeCard from '@/components/recipe-card';

export default async function CategoryPage({
	params,
}: {
	params: { slug: string };
}) {
	const recipes = await getRecipesByCategory(params.slug);

	return (
		<div className="col-span-4 lg:col-span-3 pt-5">
			<h1
				className={serif.className + ' text-2xl font-bold mb-6 capitalize'}
			>
				{params.slug} Recipes
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.idMeal} recipe={recipe} />
				))}
			</div>
		</div>
	);
}
