module.exports = {
		parser: '@typescript-eslint/parser',
		parserOptions: {
				ecmaFeatures: {
						jsx: true,
				},
				project: ['./tsconfig.json']
		},
		env: {
				browser: true,
				es6: true,
		},
		plugins: [
				'react',
				'@typescript-eslint',
				'import'
		],
		extends: [
				'airbnb-typescript',
				'plugin:import/recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:prettier/recommended'
		],
		globals: {
				Atomics: 'readonly',
				SharedArrayBuffer: 'readonly',
		},
		rules: {
				'linebreak-style': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
				'prettier/prettier': [
						'error',
						{
								endOfLine: 'auto',
						},
				],
		},
};
