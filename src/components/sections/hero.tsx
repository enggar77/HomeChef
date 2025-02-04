import { serif } from '../font';

export default function Hero() {
	return (
		<div className="h-full w-full max-w-7xl flex justify-center items-center bg-base-content">
			<div className="text-start mx-4">
				<h1
					className={`${serif.className} text-4xl font-semibold lg:text-5xl xl:text-6xl`}
				>
					Chefs Academy Secret
				</h1>
				<p className="text-xs lg:text-sm mt-2 sm:pl-2">
					New recipe for you to try out, let&apos;s cook!
				</p>
			</div>
		</div>
	);
}
