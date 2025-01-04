/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	arrowParens: 'always',
	singleQuote: true,
	trailingComma: 'all',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte', '@trivago/prettier-plugin-sort-imports'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
