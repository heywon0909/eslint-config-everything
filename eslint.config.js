import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  tseslint.configs.recommended,
  eslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        allowDefaultProject: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    files: ['**/*.{ts,tsx}'], // TypeScript 파일에만 적용
    rules: {
      'no-undef': 'off', // no-undef 규칙 비활성화
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ...react.configs.flat.recommended,
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
    rules: {
      'no-undef': 'off', // no-undef 규칙 비활성화
      'react/react-in-jsx-scope': 'off', // JSX 쓸 때 React import 안 해도 되게
      'react/jsx-uses-react': 'off',
      // Prevent missing displayName in a React component definition
      // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md
      'react/display-name': ['off', { ignoreTranspilerName: false }],
      // Forbid certain props on DOM Nodes
      // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/forbid-dom-props.md
      'react/forbid-dom-props': ['off', { forbid: [] }],
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
      'react/no-unstable-nested-components': ['off', { allowAsProps: true }],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // ensure emoji are accessible
      // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md
      // disabled; rule is deprecated
      'jsx-a11y/accessible-emoji': 'off',

      // Enforce that all elements that require alternative text have meaningful information
      // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
      'jsx-a11y/alt-text': [
        'error',
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: [],
          object: [],
          area: [],
          'input[type="image"]': [],
        },
      ],
      // require onClick be accompanied by onKeyUp/onKeyDown/onKeyPress
      // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
      'jsx-a11y/click-events-have-key-events': 'error',
    },
  },
  {
    extends: compat.extends('eslint:recommended', 'prettier'),
    plugins: {
      import: importPlugin,
    },
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
      },
      parserOptions: {},
    },

    rules: {
      'no-unused-vars': 'off',
      'no-nested-ternary': 'off', // 중첩 삼항 연산자 가능
      'arrow-body-style': ['error', 'as-needed'], // 화살표 함수 블록 스타일 자유롭게 허용
      'no-shadow': 'off', // 변수 이름 중복 허용
      'implicit-arrow-linebreak': 'off', // 암시적 화살표 함수 줄바꿈 자유롭게 허용
      'operator-linebreak': 'off', // 연산자 줄바꿈 자유롭게 허용
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@mui/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@storybook/**',
              group: 'external',
              position: 'after',
            },
            {
              pattern: '@internal/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', '@mui'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
        },
        typescript: {
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  },
]);
