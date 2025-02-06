import { CategoryType } from '@/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';

export default function Category({ category }: { category: CategoryType }) {
	return (
		<Link
			href={`/category/${category.strCategory.toLowerCase()}`}
			className="block"
		>
			<div className="flex gap-2 p-1 bg-base-200 rounded-full overflow-hidden shadow-lg hover:bg-base-300 transition-colors">
				<Image
					src={category.strCategoryThumb}
					alt={category.strCategory}
					width={100}
					height={100}
					className="rounded-full -ml-[30px]"
				/>
				<h3 className="font-semibold">{category.strCategory}</h3>
			</div>
		</Link>
	);
}
