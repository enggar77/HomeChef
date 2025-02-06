import { RecipesType } from '@/lib/definitions';
import RecipeCard from '../recipe-card';
import Favorites from './favorites';
import { serif } from '../font';
import Link from 'next/link';

type Props = {
	recipes: RecipesType[];
};

export default function Content({ recipes }: Props) {
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
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.idMeal} recipe={recipe} />
				))}
			</div>
		</div>
	);
}
