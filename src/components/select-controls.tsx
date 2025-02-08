'use client';

import { CategoryType } from '@/lib/definitions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
	categories: CategoryType[];
};

export default function SelectControls({ categories }: Props) {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('default');

	return (
		<div className="">
			<select
				className="select select-xs"
				value={selectedCategory}
				onChange={(e) => {
					const value = e.target.value;
					setSelectedCategory(value);
					if (value !== 'default') {
						router.push(`/category/${value.toLowerCase()}`);
					}
				}}
			>
				<option disabled value={'default'}>
					Categories
				</option>
				{categories.map((category: CategoryType) => (
					<option key={category.idCategory} value={category.strCategory}>
						{category.strCategory}
					</option>
				))}
			</select>
		</div>
	);
}
