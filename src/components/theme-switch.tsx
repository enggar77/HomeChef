'use client';

import { useState } from 'react';

export default function ThemeSwitch() {
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => {
		const newTheme = isDark ? 'dim' : 'retro';
		setIsDark(!isDark);
		document.documentElement.setAttribute('data-theme', newTheme);
	};

	return (
		<input
			type="checkbox"
			onChange={toggleTheme}
			className="toggle theme-controller"
		/>
	);
}
