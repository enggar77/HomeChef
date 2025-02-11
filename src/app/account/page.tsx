import DeleteAccount from '@/components/delete-account';
import {
	getKindeServerSession,
	LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Account() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const user = await getUser();

	if (!(await isAuthenticated())) redirect('/api/auth/login');
	return (
		<div className="col-span-4 pt-5 lg:h-[calc(100vh-100px)] overflow-scroll">
			<div className="max-w-5xl mx-auto">
				<h1
					className={`text-xl font-semibold md:text-2xl text-center `}
				>
					Account
				</h1>
				<div className="divider" />
				<div className="mx-auto max-w-[500px]">
					<h2 className="text-lg font-semibold mb-2">Email</h2>

					<p className="mb-3">{user.email}</p>
					<LogoutLink>
						<button className="btn btn-sm btn-neutral">
							Logout
						</button>
					</LogoutLink>
				</div>
				<div className="divider" />
				<DeleteAccount />
			</div>
		</div>
	);
}
