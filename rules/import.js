import importPlugin from 'eslint-plugin-import';
export default [
   importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'off',
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
                pattern: '@storybook/**',
                group: 'external',
                position: 'after',
            },
            {
                pattern: '@components/**',
                group: 'internal',
                position: 'after',
                },
               {
                pattern: '@assets/**',
                group: 'internal',
                position: 'after',
                },
                 {
                    pattern: '@pages/**',
                    group: 'internal',
                    position: 'after',
                },
                 {
                    pattern: '@hooks/**',
                    group: 'internal',
                    position: 'after',
                },
            ],
        }
        ]
    },
  },
]