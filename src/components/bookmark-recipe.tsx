'use client';

import { deleteBookmark } from '@/lib/actions';
import { RecipesType } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	recipe: RecipesType;
	userId: string;
};

export default function BookmarkRecipe({ recipe, userId }: Props) {
	async function handleDelete(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		await deleteBookmark(userId, recipe.idMeal);
	}
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
			<div className="py-4 px-4 bg-transparent">
				<h2 className="font-semibold truncate mb-2">
					{recipe.strMeal}
				</h2>

				<button
					className="btn btn-warning btn-xs"
					onClick={handleDelete}
				>
					delete
				</button>
			</div>
		</Link>
	);
}
