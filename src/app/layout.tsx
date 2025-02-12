import type { Metadata } from 'next';
import './globals.css';
import { sans } from '@/components/font';
import Navbar from '@/components/sections/navbar';
import Hero from '@/components/sections/hero';
import Sidebar from '@/components/sections/Sidebar';
import Footer from '@/components/sections/footer';

export const metadata: Metadata = {
	title: 'HomeChef',
	description: 'Learn the best cooking techniques and recipes.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="bg-base-content">
			<body className={`${sans.className} antialiased relative`}>
				<div className="text-base-100 fixed w-full top-0 left-0 -z-10 flex justify-center h-52 lg:h-72">
					<Hero />
				</div>
				<div className="w-full bg-base-300 mt-52 lg:mt-72 rounded-xl">
					<Navbar />
					<div className="max-w-7xl mx-auto px-4">
						<div className="sticky top-[168px] md:top-[120px] lg:top-20 grid grid-cols-4 lg:gap-10">
							<Sidebar />
							{children}
						</div>
						<Footer />
					</div>
				</div>
			</body>
		</html>
	);
}
