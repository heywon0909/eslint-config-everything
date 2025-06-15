# eslint-config-everything

A comprehensive ESLint configuration tailored for JavaScript and TypeScript projects, optimized for React, accessibility (jsx-a11y), import ordering, and overall code quality. Supports modern syntax and best practices with full TypeScript integration.

---

## Features

- Supports both **JavaScript** and **TypeScript** with appropriate parser options and recommended TypeScript rules
- Includes React recommended rules with JSX and accessibility linting via `eslint-plugin-jsx-a11y`
- Enforces import order with custom groups for React, MUI, Storybook, and internal paths
- Integrates with Prettier to avoid formatting conflicts
- Provides global environment settings for browser, Node.js, service workers, and testing frameworks like Mocha
- Compatible with ESLint’s Flat Config format and modern plugin management
- Rules to allow flexible coding styles such as disabling `no-unused-vars`, allowing nested ternaries, and controlling arrow function body styles
- Accessibility rules enforcing alt text, keyboard event handlers, and more
- Works with CommonJS and ES module files

---

## Installation

Using npm:

```bash
npm install --save-dev eslint @eslint/eslintrc @eslint/js eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react typescript-eslint globals
```

Or with Yarn:

```bash
yarn add -D eslint @eslint/eslintrc @eslint/js eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react typescript-eslint globals
```

---

## Usage

### 1. ESLint Flat Config (`eslint.config.js`)

```js
import eslintConfigEverything from 'eslint-config-everything';

export default eslintConfigEverything;
```

### 2. Using `extends` in `.eslintrc.js` or `package.json`

```js
module.exports = {
  extends: ['everything'],
};
```

Or in `package.json`:

```json
{
  "extends": ["everything"]
}
```

> **Note:** > `eslint-config-everything` is authored using ESLint Flat Config. Please ensure you are running ESLint v8.32 or higher, which supports this format.

---

## Customizing Rules

You can extend the `everything` configuration while overriding specific rules to fit your project needs:

```js
module.exports = {
  extends: ['everything'],
  rules: {
    '@typescript-eslint/await-thenable': 'off',
    // Add or override other rules here
  },
};
```

Or, if using Flat Config style:

```js
import eslintConfigEverything from 'eslint-config-everything';

export default [
  ...eslintConfigEverything,
  {
    rules: {
      '@typescript-eslint/await-thenable': 'off',
    },
  },
];
```

---

## Configuration Details

_(Include the detailed ESLint configuration here if needed, or link to the source file)_

---

If you want me to add anything else or create example configs, just ask!

## Configuration Details

This config covers:

- **TypeScript support** with `@typescript-eslint` recommended rules and strict unused variables handling
- **React plugin** with JSX support and rules tuned for modern React (React import not required in JSX)
- **jsx-a11y plugin** for accessibility best practices, including alt text and keyboard event enforcement
- **import plugin** for enforcing import ordering and grouping to maintain clean, readable imports
- Turned off some default ESLint rules like `no-undef` (because TypeScript handles it)
- Supports both **CommonJS** and **ESM** file extensions
- Custom `languageOptions` with appropriate `parserOptions` for latest ECMAScript features and modules

---

## Example of Rules

```json
{
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ],
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/click-events-have-key-events": "error",
    "import/order": [
      "error",
      {
        "groups": [
          ["builtin", "external"],
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          { "pattern": "react", "group": "external", "position": "before" },
          { "pattern": "@mui/**", "group": "external", "position": "before" },
          {
            "pattern": "@storybook/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@internal/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }
    ]
  }
}
```

---

## Notes

- This configuration is designed for **ESLint Flat Config** format (`eslint.config.js`) — make sure your ESLint version supports it (v8.32+).
- It disables some default ESLint rules that conflict with TypeScript or React best practices.
- Adjust `tsconfigRootDir` in your project if your TypeScript config lives outside the project root.

---

## License

MIT

---
