'use server';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/categories.php`);
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.json();

		return data.categories;
	} catch (error) {
		console.error(error);
	}
};
