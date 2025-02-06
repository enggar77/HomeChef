'use client';

import { CategoryType } from '@/lib/definitions';
import { useState } from 'react';

type Props = {
	categories: CategoryType[];
	sortOptions: string[];
};

export default function SelectControls({ categories, sortOptions }: Props) {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedSortOption, setSelectedSortOption] = useState('default');
	return (
		<div className="flex gap-2">
			<select
				className="select select-xs w-24 truncate"
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				<option disabled value={'default'}>
					Categories
				</option>
				{categories.map((category: CategoryType) => (
					<option key={category.idCategory} value={category.idCategory}>
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
