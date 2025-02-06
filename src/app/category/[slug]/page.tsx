import { getRecipesByCategory } from '@/lib/data';
import { serif } from '@/components/font';
import RecipeCard from '@/components/recipe-card';
import { RecipesType } from '@/lib/definitions';
import Favorites from '@/components/sections/favorites';
import Link from 'next/link';

export default async function CategoryPage({
	params,
}: {
	params: { slug: string };
}) {
	const recipes = await getRecipesByCategory(params.slug);

	if (!recipes) {
		return (
			<div className="col-span-4 lg:col-span-3 pt-5 h-[calc(100vh-100px)] overflow-scroll">
				<div className="flex flex-col items-center justify-center h-full">
					<h2 className={`text-xl font-bold mb-4 ${serif.className}`}>
						No recipes found
					</h2>
					<p className="text-gray-600">
						Try searching for a different category
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="col-span-4 lg:col-span-3 pt-5 h-[calc(100vh-100px)] overflow-scroll">
			<div className="hidden lg:flex justify-between mb-6">
				<h1 className={`font-bold text-2xl ${serif.className}`}>Recipes</h1>
				<Link href="" className="lg:flex items-center gap-1">
					<span className="text-sm">Pinned Recipes</span>
					<Favorites />
				</Link>
			</div>
			<div className="md:grid md:grid-cols-3 md:gap-5 md:gap-y-10 md:h-[90%] overflow-scroll">
				{recipes.map((recipe: RecipesType) => (
					<RecipeCard key={recipe.idMeal} recipe={recipe} />
				))}
			</div>
		</div>
	);
}
