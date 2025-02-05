import { CategoryType } from '@/lib/definitions';
import Image from 'next/image';

export default function Category({ category }: { category: CategoryType }) {
	return (
		<div className="flex gap-2 border-2 border-base-content/10 p-0 rounded-full overflow-hidden">
			<Image
				src={category.strCategoryThumb}
				alt={category.strCategory}
				width={100}
				height={100}
				className="rounded-full -ml-[30px]"
			/>
			<h3 className="font-semibold">{category.strCategory}</h3>
		</div>
	);
}
