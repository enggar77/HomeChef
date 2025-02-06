import Content from '@/components/sections/content';
import { getRecipesByCategory } from '@/lib/data';

export default async function Home() {
	const recipes = await getRecipesByCategory('Beef');
	return <Content recipes={recipes} />;
}
