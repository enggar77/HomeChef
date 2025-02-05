import ThemeSwitch from './theme-switch';

export default function Dropdown() {
	return (
		<details className="dropdown dropdown-end">
			<summary className="btn bg-transparent border-0 p-0">
				<svg
					className="swap-off fill-current"
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 512 512"
				>
					<path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
				</svg>
			</summary>
			<ul className="menu dropdown-content bg-base-content text-base-100 rounded-box z-[1] w-52 p-2 shadow">
				<li>
					<div className="flex justify-between">
						<span>theme:</span>
						<ThemeSwitch />
					</div>
				</li>
				<li>
					<a>Item 2</a>
				</li>
			</ul>
		</details>
	);
}
