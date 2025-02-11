import BookmarkRecipe from '@/components/bookmark-recipe';
import { prisma } from '@/lib/db';
import { RecipesType } from '@/lib/definitions';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Bookmark() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	if (!(await isAuthenticated())) redirect('/api/auth/login');
	const user = await getUser();
	let bookmarkData: RecipesType[] = [];
	if (user) {
		const recipes = await prisma.recipe.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
		bookmarkData = recipes.map((recipe) => ({
			idMeal: recipe.mealId,
			strMeal: recipe.name,
			strMealThumb: recipe.thumbnail,
		}));
	}
	return (
		<div className="col-span-4 pt-5 lg:h-[calc(100vh-100px)] overflow-scroll">
			<h1 className={`text-xl font-semibold md:text-2xl`}>My Bookmark</h1>

			<div className="divider" />

			{user && bookmarkData.length ? (
				<div className="grid grid-cols-1 gap-y-10 pt-5 lg:pt-0 md:grid-cols-3 lg:grid-cols-4 md:gap-5 md:gap-y-10 md:h-[90%] overflow-scroll">
					{bookmarkData.map((item) => (
						<div key={item.idMeal}>
							<BookmarkRecipe recipe={item} userId={user.id} />
						</div>
					))}
				</div>
			) : (
				<h1>You don&apos;t have any bookmarked recipe yet.</h1>
			)}
		</div>
	);
}
