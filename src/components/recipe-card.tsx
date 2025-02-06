import { RecipesType } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	recipe: RecipesType;
};

export default function RecipeCard({ recipe }: Props) {
	return (
		<Link
			href={`/recipe/${recipe.idMeal}`}
			className={`card shadow-xl h-fit rounded-xl border-8 border-base-200 bg-base-200 hover:border-base-100 hover:bg-base-100`}
			title={recipe.strMeal}
		>
			<figure className="h-44 w-full relative">
				<Image
					src={recipe.strMealThumb}
					alt={recipe.strMeal}
					fill
					className="object-cover rounded-xl"
				/>
			</figure>
			<div className="py-4 pb-6 px-4 bg-transparent">
				<h2 className="font-semibold truncate">{recipe.strMeal}</h2>
			</div>
		</Link>
	);
}
