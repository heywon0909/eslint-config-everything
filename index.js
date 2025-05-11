import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslint from './rules/eslint'
import jsxA11y from './rules/jsxA11y'
import typescript from './rules/typescript'
import importPlugin from './rules/import'

export default [
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        everything: true,
      },
    },
    rules: {
      ...eslint,
      ...jsxA11y,
      ...typescript,
      ...importPlugin,
    },
  },
]
