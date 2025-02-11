import ThemeSwitch from '../theme-switch';
import Link from 'next/link';
import { serif } from '../font';
import Dropdown from '../dropdown-menu';
import MobileSort from '../mobile-sorting';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import { prisma } from '@/lib/db';

export default async function Navbar() {
	const { getUser, isAuthenticated } = getKindeServerSession();
	const user = await getUser();
	const aunthenticated = await isAuthenticated();
	let userData;
	if (user && aunthenticated) {
		userData = await prisma.user.findFirst({
			where: {
				id: user.id,
			},
		});
	}

	return (
		<nav className="sticky top-0 bg-base-200 w-full rounded-xl z-10 shadow-lg">
			<div className="max-w-7xl mx-auto flex items-center justify-between py-2 md:py-4 px-4">
				{/* Logo */}
				<Link href="/">
					<h1 className={'text-xl font-black ' + serif.className}>
						HomeChef
					</h1>
				</Link>

				{/* Theme Switcher and Login Button */}
				<div className="hidden md:flex items-center">
					<div className="flex items-center gap-8">
						<ThemeSwitch />

						{user && userData ? (
							<details className="dropdown dropdown-end">
								<summary className="avatar cursor-pointer">
									<div className="ring-base-content ring-offset-base-100 w-10 rounded-full ring ring-offset-2 relative">
										{userData.profileImage ? (
											<Image
												src={userData.profileImage}
												alt={
													userData.firstName ||
													'User avatar'
												}
												fill
												className="object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-primary text-primary-content">
												{(userData.firstName ||
													'U')[0].toUpperCase()}
											</div>
										)}
									</div>
								</summary>

								<ul className="menu dropdown-content text-base-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow ">
									<li>
										<Link href="/account">Account</Link>
									</li>
									<li>
										<Link href="/bookmark">Bookmark</Link>
									</li>
									<li>
										<LogoutLink>Logout</LogoutLink>
									</li>
								</ul>
							</details>
						) : (
							<button className="btn btn-outline btn-sm text-xs lg:px-4 lg:text-sm my-2">
								<LoginLink>Login</LoginLink>
							</button>
						)}
					</div>
				</div>

				{/* Mobile Dropdown */}
				<div className="md:hidden">
					<Dropdown />
				</div>
			</div>

			{/* Mobile Sorting */}
			<MobileSort />
		</nav>
	);
}
