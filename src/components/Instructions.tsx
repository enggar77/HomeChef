export default function Instructions({
	instructions,
}: {
	instructions: string;
}) {
	const parseInstructions = (text: string) => {
		// Check for different formats
		if (text.includes('STEP')) {
			return text.split('STEP').map((step, index) => ({
				text: step.trim(),
				prefix: index === 0 ? '' : `STEP`,
			}));
		}

		// Check for numbered list (e.g., "1.", "2.", etc.)
		const numberedListRegex = /^\s*\d+\./;
		if (text.split('\n').some((line) => numberedListRegex.test(line))) {
			return text
				.split('\n')
				.filter((line) => line.trim())
				.map((line) => ({
					text: line.replace(numberedListRegex, '').trim(),
					prefix: line.match(numberedListRegex)?.[0] || '',
				}));
		}

		// Default: Split by periods
		return text
			.split('.')
			.filter((step) => step.trim())
			.map((step) => ({
				text: step.trim(),
				prefix: '',
				suffix: '.',
			}));
	};

	const steps = parseInstructions(instructions);

	return (
		<div className="mt-2">
			<h2 className="font-bold mb-5">INSTRUCTIONS:</h2>
			<div className="text-sm space-y-2">
				{steps.map((step, index) => (
					<p key={`step-${index}`}>
						{step.prefix && <span>{step.prefix} </span>}
						{step.text}
						{(step as { suffix?: string }).suffix ?? ''}
					</p>
				))}
			</div>
		</div>
	);
}
