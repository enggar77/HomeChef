import Image from 'next/image';
import ThemeSwitch from '../theme-switch';
import Link from 'next/link';
import { serif } from '../font';
import Dropdown from '../dropdown-menu';
import SearchBar from '../search-bar';

export default function Navbar() {
	return (
		<nav className="sticky top-0 w-full bg-base-200 rounded-xl z-10 shadow-lg">
			<div className="max-w-7xl mx-auto flex items-center justify-between py-2 md:py-4 px-4">
				{/* Logo */}
				<Link href="/">
					<h1 className={'text-xl font-black ' + serif.className}>
						HomeChef
					</h1>
				</Link>

				{/* Search Bar */}
				<div className="hidden md:block">
					<SearchBar />
				</div>

				{/* Theme Switcher and Login Button */}
				<div className="hidden md:flex items-center">
					<div className="flex items-center gap-4">
						<ThemeSwitch />
						<Link href="/login">
							<button className="btn btn-outline btn-sm text-xs lg:px-4 lg:text-sm">
								Login
							</button>
						</Link>
					</div>
				</div>

				{/* Mobile Dropdown */}
				<div className="md:hidden">
					<Dropdown />
				</div>
			</div>

			{/* Mobile Search Bar */}
			<div className="md:hidden max-w-7xl mx-auto flex items-center justify-start pb-4 px-4">
				<SearchBar />
			</div>
		</nav>
	);
}
