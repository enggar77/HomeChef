import { Bookmark } from 'lucide-react';
import SelectControls from './select-controls';
import { getCategories } from '@/lib/data';

const sortOptions = ['Name', 'Newest', 'Oldest'];

export default async function MobileSort() {
	const categories = await getCategories();

	return (
		<>
			<div className="lg:hidden px-4 pb-4 flex justify-between items-center">
				<SelectControls categories={categories} sortOptions={sortOptions} />

				{/* Favorites */}
				<div>
					<Bookmark fill="" />
				</div>
			</div>
		</>
	);
}
