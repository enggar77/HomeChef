'use client';

import { deleteBookmark } from '@/lib/actions';
import { RecipesType } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
	recipe: RecipesType;
	userId: string;
};

export default function BookmarkRecipe({ recipe, userId }: Props) {
	const [isDeleting, setIsDeleting] = useState(false);

	async function handleDelete(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();

		try {
			setIsDeleting(true);
			await deleteBookmark(userId, recipe.idMeal);
		} catch (err) {
			console.error(err);
		} finally {
			setIsDeleting(false);
		}
	}
	return (
		<>
			{isDeleting ? (
				<div
					className={`card shadow-xl h-fit rounded-xl border-8 border-base-200 bg-base-200 hover:border-base-100 hover:bg-base-100 relative`}
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

					<div className="absolute w-full h-full top-0 lef-0 flex items-center justify-center bg-base-100 z-50 bg-opacity-85">
						<div className="loading loading-spinner loading-md"></div>
					</div>
				</div>
			) : (
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
			)}
		</>
	);
}
