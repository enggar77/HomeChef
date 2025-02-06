'use client';

import { CategoryType } from '@/lib/definitions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
	categories: CategoryType[];
	sortOptions: string[];
};

export default function SelectControls({ categories, sortOptions }: Props) {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('default');
	const [selectedSortOption, setSelectedSortOption] = useState('default');
	return (
		<div className="flex gap-2">
			<select
				className="select select-xs w-24 truncate"
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
			<select
				className="select select-xs w-24"
				value={selectedSortOption}
				onChange={(e) => setSelectedSortOption(e.target.value)}
			>
				<option disabled value="default">
					Sort by
				</option>
				{sortOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}
