import { Bookmark } from 'lucide-react';
import SelectControls from './select-controls';
import { getCategories } from '@/lib/data';

export const sortOptions = ['Name', 'Newest', 'Oldest'];

export default async function MobileSort() {
	const categories = await getCategories();

	return (
		<>
			<div className="lg:hidden px-4 py-3 flex justify-between items-center">
				<SelectControls categories={categories} />

				{/* Favorites */}
				<div>
					<Bookmark fill="" />
				</div>
			</div>
		</>
	);
}
