import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist/**', '.output/**', '.wxt/**', 'node_modules/**', 'graphify-out/**']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {}
  }
];
