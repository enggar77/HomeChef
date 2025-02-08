import { getCategories } from '@/lib/data';
import SidebarClient from './SidebarClient';

export default async function Sidebar() {
	const categories = await getCategories();

	return <SidebarClient categories={categories} />;
}
