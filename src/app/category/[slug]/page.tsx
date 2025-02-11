import { getRecipesByCategory } from '@/lib/data';
import RecipeCard from '@/components/recipe-card';
import { RecipesType } from '@/lib/definitions';
import Favorites from '@/components/favorites';
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function CategoryPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const recipes = await getRecipesByCategory(params.slug);
	const { isAuthenticated } = getKindeServerSession();

	return (
		<div className="col-span-4 lg:col-span-3 pt-5 lg:h-[calc(100vh-100px)] overflow-scroll">
			<div className="lg:flex justify-between lg:mb-10">
				<h1 className="text-xl font-semibold md:text-2xl">
					Recipes for{' '}
					{params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
				</h1>
				<div className="hidden lg:block">
					{(await isAuthenticated()) && (
						<Link
							href="/bookmark"
							className="lg:flex items-center gap-1"
						>
							<Favorites />
						</Link>
					)}
				</div>
			</div>
			<div className="grid grid-cols-1 gap-y-10 pt-5 lg:pt-0 md:grid-cols-3 md:gap-5 md:gap-y-10 md:h-[90%] overflow-scroll">
				{recipes.map((recipe: RecipesType) => (
					<RecipeCard key={recipe.idMeal} recipe={recipe} />
				))}
			</div>
		</div>
	);
}
