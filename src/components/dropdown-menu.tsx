import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import ThemeSwitch from './theme-switch';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

export default async function Dropdown() {
	const { isAuthenticated } = getKindeServerSession();
	return (
		<details className="dropdown dropdown-end">
			<summary className="btn bg-transparent border-0 p-0">
				<svg
					className="swap-off fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 512 512"
				>
					<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
				</svg>
			</summary>
			<ul className="menu dropdown-content text-base-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
				<li>
					<div className="flex justify-between">
						<span>theme:</span>
						<ThemeSwitch />
					</div>
				</li>

				{(await isAuthenticated()) ? (
					<>
						<li>
							<Link href="/bookmark">Bookmark</Link>
						</li>
						<li>
							<Link href="/account">Account</Link>
						</li>
						<li>
							<LogoutLink>Logout</LogoutLink>
						</li>
					</>
				) : (
					<li>
						<LoginLink>Login</LoginLink>
					</li>
				)}
			</ul>
		</details>
	);
}
