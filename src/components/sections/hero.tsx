import { ChefHat } from 'lucide-react';
import { serif } from '../font';

export default function Hero() {
	return (
		<div className="h-full w-full max-w-7xl flex justify-center items-center bg-base-content">
			<div className="text-start mx-4">
				<div className="text-xs lg:text-sm mb-2 flex justify-start items-center gap-2 md:justify-end">
					<ChefHat size={20} />
					<p>New recipe for you to try out, let&apos;s cook!</p>
				</div>
				<h1
					className={`${serif.className} text-4xl font-bold lg:text-6xl xl:text-7xl`}
				>
					Chefs Academy Secret
				</h1>
			</div>
		</div>
	);
}
