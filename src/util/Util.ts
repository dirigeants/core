export function snakeToCamel(input: string): string {
	const [first, ...parts] = input.split('_');

	let output = first.toLowerCase();
	for (const part of parts) {
		output += part[0].toUpperCase() + part.substr(1).toLowerCase();
	}

	return output;
}
