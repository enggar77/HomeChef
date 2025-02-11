import { serif } from '@/components/font';
import Instructions from '@/components/Instructions';
import Favorites from '@/components/favorites';
import { getRecipeDetails } from '@/lib/data';
import { RecipeDetailsType } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import SaveButton from '@/components/save-button';
import { getBookmarkStatus } from '@/lib/actions';

export default async function RecipePage(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const recipeDetails: RecipeDetailsType = await getRecipeDetails(
		params.slug
	);
	const { isAuthenticated, getUser } = getKindeServerSession();
	let isBookmarked = false;
	const user = await getUser();
	if (await isAuthenticated()) {
		if (user) {
			isBookmarked = !!(await getBookmarkStatus(
				recipeDetails.idMeal,
				user.id
			));
		}
	}

	// Ingredients
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredientKey = `strIngredient${i}` as keyof RecipeDetailsType;
		const measureKey = `strMeasure${i}` as keyof RecipeDetailsType;

		const ingredient = recipeDetails[ingredientKey];
		const measurement = recipeDetails[measureKey];

		if (typeof ingredient === 'string' && ingredient.trim()) {
			ingredients.push({
				ingredient,
				measurement: measurement?.toString() || '',
			});
		}
	}

	return (
		<div className="col-span-4 pt-5 h-[calc(100vh-100px)] overflow-y-scroll">
			<div className="hidden lg:flex justify-between lg:mb-10">
				<h1 className={`text-xl font-semibold md:text-2xl`}>
					{recipeDetails.strCategory}
				</h1>
				<div className="hidden lg:block">
					{(await isAuthenticated()) && (
						<Link href="/bookmark">
							<Favorites />
						</Link>
					)}
				</div>
			</div>

			<div className="h-[90%] max-w-5xl mx-auto overflow-y-scroll px-4 overflow-x-hidden">
				<h1
					className={`${serif.className} text-2xl md:text-4xl font-bold text-center`}
				>
					{recipeDetails.strMeal}
				</h1>
				<div className="divider" />
				<main className="h-full">
					<div className="flex flex-col md:flex-row">
						<div className="order-2 mt-10 md:mt-0 md:order-none md:w-1/3">
							<h2 className="font-bold mb-5">INGREDIENTS:</h2>
							<ul>
								{ingredients.map((ingredient, index) => (
									<li key={index} className="text-sm mb-2">
										<span className="flex justify-between w-full">
											<span>{ingredient.ingredient}</span>
											<span className="border-b border-dotted border-gray-300 flex-1 mx-2"></span>
											<span>
												{ingredient.measurement}
											</span>
										</span>
									</li>
								))}
							</ul>
						</div>
						<div className="divider divider-horizontal" />
						<div className="flex-1">
							<div className="gap-6 w-full">
								<div className="md:hidden mb-5">
									<SaveButton
										recipe={{
											idMeal: recipeDetails.idMeal,
											strMeal: recipeDetails.strMeal,
											strMealThumb:
												recipeDetails.strMealThumb,
										}}
										initialSaved={isBookmarked}
										user={user}
									/>
								</div>
								<div className="relative h-[200px] w-full md:h-[400px] overflow-hidden rounded-xl mb-5">
									<Image
										src={recipeDetails.strMealThumb}
										alt={recipeDetails.strMeal}
										fill
										className="object-cover"
										quality={100}
									/>
								</div>

								<div className="space-y-4">
									<div className="flex gap-2 text-sm">
										<h3 className="font-semibold">Dish:</h3>
										<span className="badge">
											{recipeDetails.strArea}
										</span>
									</div>
									{recipeDetails.strSource && (
										<div className="flex gap-2 text-sm">
											<h3 className="font-semibold">
												Source:
											</h3>
											<span className="break-all link">
												<Link
													target="_blank"
													href={
														recipeDetails.strSource
													}
												>
													{recipeDetails.strSource}
												</Link>
											</span>
										</div>
									)}
									{recipeDetails.strYoutube && (
										<div className="flex gap-2 text-sm">
											<h3 className="font-semibold">
												Youtube:
											</h3>
											<span className="break-all link">
												<Link
													target="_blank"
													href={
														recipeDetails.strYoutube
													}
												>
													{recipeDetails.strYoutube}
												</Link>
											</span>
										</div>
									)}
									{recipeDetails.strTags && (
										<div className="flex gap-2 text-sm flex-wrap">
											<h3 className="font-semibold">
												Tag:
											</h3>
											{recipeDetails.strTags
												?.split(',')
												.map((tag) => (
													<span
														key={tag}
														className="badge"
													>
														{tag}
													</span>
												))}
										</div>
									)}
									<div className="hidden md:block">
										<SaveButton
											recipe={{
												idMeal: recipeDetails.idMeal,
												strMeal: recipeDetails.strMeal,
												strMealThumb:
													recipeDetails.strMealThumb,
											}}
											initialSaved={isBookmarked}
											user={user}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="divider" />
					<Instructions
						instructions={recipeDetails.strInstructions}
					/>
				</main>
			</div>
		</div>
	);
}
