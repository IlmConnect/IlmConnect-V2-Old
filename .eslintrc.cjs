module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,

	parserOptions: {

		ecmaFeatures: {
			jsx: true,
		}
	},

	rules: {
		indent: ['error', 'tab'],
		semi: 'error',
		quotes: ['error', 'single'],
		'react/react-in-jsx-scope': 'off',
		"react/jsx-max-props-per-line": [true, { "maximum": 1, "when": 'always' }]
	},

	overrides: [
		{
			files: ['src/**/*.tsx', 'src/**/.ts'],
		}
	]
};
