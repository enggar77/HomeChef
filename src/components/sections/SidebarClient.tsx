'use client';
import { CategoryType } from '@/lib/definitions';
import CategoryItem from '../category';
import { usePathname } from 'next/navigation';

type Props = {
	categories: CategoryType[];
};

export default function SidebarClient({ categories }: Props) {
	const pathname = usePathname();
	const detailsPage = pathname.includes('/recipe');
	return (
		<div
			className={`hidden lg:block col-span-1 h-[calc(100vh-100px)] pt-5 overflow-hidden ${
				detailsPage ? 'lg:hidden' : ''
			}`}
		>
			<h1 className={' text-xl font-semibold mb-10'}>Categories</h1>

			<ul className="menu p-0 gap-3 flex-nowrap overflow-y-scroll pr-2 h-[90%] pb-2">
				{categories.map((category: CategoryType) => (
					<li key={category.idCategory}>
						<CategoryItem category={category} />
					</li>
				))}
			</ul>
		</div>
	);
}
