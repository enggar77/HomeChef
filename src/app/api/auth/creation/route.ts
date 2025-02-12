import { prisma } from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || user === null || !user.id) {
			console.error('Error: Invalid user object from Kinde:', user);
			throw new Error('Invalid user data received from Kinde.');
		}

		// First try to find user by Kinde ID
		let dbUser = await prisma.user.findUnique({
			where: {
				id: user.id,
			},
		});

		// If user doesn't exist at all, create new user
		if (!dbUser) {
			dbUser = await prisma.user.create({
				data: {
					id: user.id,
					firstName: user.given_name ?? '',
					lastName: user.family_name ?? '',
					email: user.email ?? '',
					profileImage: user.picture ?? '',
				},
			});
		}

		return NextResponse.redirect(`${process.env.KINDE_SITE_URL}`);
	} catch (error) {
		console.error('Error in /api/auth/creation:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
