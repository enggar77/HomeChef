'use client';
import { addToBookmark } from '@/lib/actions';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';
import { useState } from 'react';

export default function SaveButton({
	recipe,
	initialSaved,
	user,
}: {
	recipe: { idMeal: string; strMeal: string; strMealThumb: string };
	initialSaved: boolean;
	user: KindeUser<Record<string, null>>;
}) {
	const [isSaved, setIsSaved] = useState(initialSaved);

	const handleSave = async () => {
		if (isSaved) return;
		if (!user) {
			await addToBookmark(recipe);
		} else {
			setIsSaved(true);
			await addToBookmark(recipe);
		}
	};

	return (
		<div>
			<button
				className={`btn btn-xs ${isSaved ? 'btn-info' : ''}`}
				onClick={handleSave}
			>
				{isSaved ? 'Bookmarked' : 'Add to bookmark'}
			</button>
		</div>
	);
}
