module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'google',
    'prettier',
  ],
  ignorePatterns: ['dist', 'build', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true,
        },
      },
    ],
    'indent': 'off',
    'new-cap': 'off',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': 'off',
    'max-len': [
      'error',
      {
        'code': 100,
        'tabWidth': 2,
        'comments': 150,
      },
    ],
    'valid-jsdoc': 'off',
    'no-console': 'warn',
    'quotes': ['error', 'double'],
    'operator-linebreak': [
      'warn',
      'before',
      {
        'overrides': {
          ':': 'before',
          '=': 'after',
        },
      },
    ],
    'no-trailing-spaces': 'off',
    'linebreak-style': 'off',
  },
};
