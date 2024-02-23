module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'prettier/prettier': ['error', { singleQuote: true }],
    semi: ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
  },
  plugins: ['@typescript-eslint', 'prettier'],
};
