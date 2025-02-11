import { BookMarked } from 'lucide-react';
import SelectControls from './select-controls';
import { getCategories } from '@/lib/data';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

export const sortOptions = ['Name', 'Newest', 'Oldest'];

export default async function MobileSort() {
	const categories = await getCategories();
	const { isAuthenticated } = getKindeServerSession();

	return (
		<>
			<div className="lg:hidden px-4 py-3 flex justify-between items-center">
				<SelectControls categories={categories} />

				{/* Favorites */}
				{(await isAuthenticated()) && (
					<Link href="/bookmark">
						<BookMarked />
					</Link>
				)}
			</div>
		</>
	);
}
