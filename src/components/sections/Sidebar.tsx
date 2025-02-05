import { getCategories } from '@/lib/data';
import { serif } from '../font';
import { CategoryType } from '@/lib/definitions';
import CategoryItem from '../category';
import Favorites from './favorites';

export default async function Sidebar() {
	const categories = await getCategories();

	return (
		<div className="hidden lg:block col-span-1 h-[calc(100vh-100px)] pt-5 overflow-hidden">
			<div className="flex justify-between items-center mb-6 pr-2">
				<h1 className={serif.className + ' text-xl font-bold'}>
					Categories
				</h1>
				<Favorites />
			</div>
			<ul className="menu p-0 gap-3 flex-nowrap overflow-y-scroll pr-2 h-[89%]">
				{categories.map((category: CategoryType) => (
					<li key={category.idCategory}>
						<CategoryItem category={category} />
					</li>
				))}
			</ul>
		</div>
	);
}
