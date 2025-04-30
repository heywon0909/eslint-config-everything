import tseslint from 'typescript-eslint'
export default [
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        rules:{
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                  "args": "all",
                  "argsIgnorePattern": "^_",
                  "caughtErrors": "all",
                  "caughtErrorsIgnorePattern": "^_",
                  "destructuredArrayIgnorePattern": "^_",
                  "varsIgnorePattern": "^_",
                  "ignoreRestSiblings": true
                }
              ]
        }
    }
]