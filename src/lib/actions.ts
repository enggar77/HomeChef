'use server';

import { prisma } from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function deleteUserAccount() {
	const { getUser, isAuthenticated } = getKindeServerSession();
	const user = await getUser();

	if (!(await isAuthenticated()) || !user) redirect('/api/auth/login');

	await prisma.recipe.deleteMany({
		where: {
			userId: user.id,
		},
	});
	await prisma.user.deleteMany({
		where: {
			id: user.id,
		},
	});

	redirect('/api/auth/logout');
}

export async function addToBookmark(recipe: {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
}) {
	const { getUser, isAuthenticated } = getKindeServerSession();
	const user = await getUser();
	const authenticated = await isAuthenticated();

	if (!authenticated && !user) redirect('/api/auth/login');

	await prisma.recipe.create({
		data: {
			mealId: recipe.idMeal,
			name: recipe.strMeal,
			thumbnail: recipe.strMealThumb,
			userId: user.id,
		},
	});
}

export async function getBookmarkStatus(mealId: string, userId: string) {
	// Uses the unique compound index on (userId, mealId)
	return await prisma.recipe.findUnique({
		where: {
			userId_mealId: { userId, mealId },
		},
	});
}

export async function deleteBookmark(userId: string, mealId: string) {
	const { getUser, isAuthenticated } = getKindeServerSession();
	const user = await getUser();

	if (!(await isAuthenticated()) || !user) redirect('/api/auth/login');

	try {
		const result = await prisma.recipe.delete({
			where: {
				userId_mealId: { userId, mealId },
			},
		});
		revalidatePath('/bookmark');
		return result;
	} catch (error) {
		console.error('Error deleting bookmark:', error);
		throw new Error('Failed to delete bookmark');
	}
}
