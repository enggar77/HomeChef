'use client';
import { useState } from 'react';

export default function SaveButton() {
	const [isSaved, setIsSaved] = useState(false);

	const handleSave = () => {
		setIsSaved(!isSaved);
	};
	return (
		<div>
			<button
				className={`btn btn-xs ${isSaved ? 'btn-neutral' : ''}`}
				onClick={handleSave}
			>
				{isSaved ? 'Bookmarked' : 'Add to bookmark'}
			</button>
		</div>
	);
}
