import Image from 'next/image';
import ThemeSwitch from '../theme-switch';
import Link from 'next/link';
import { serif } from '../font';
import Dropdown from '../dropdown-menu';

export default function Navbar() {
	return (
		<nav className="sticky top-0 w-full bg-base-300">
			<div className="max-w-7xl mx-auto flex justify-between items-center py-2 md:py-4 px-4">
				{/* Logo */}
				<div>
					<Link href="/">
						<h1 className={serif.className}>HomeChef</h1>
					</Link>
				</div>

				<div className="hidden md:flex gap-4">
					<ThemeSwitch />
					<Link href="/login">
						<button className="btn btn-outline btn-sm text-xs">
							Login
						</button>
					</Link>
				</div>

				{/* Dropdown */}
				<div className="md:hidden">
					<Dropdown />
				</div>
			</div>
		</nav>
	);
}
