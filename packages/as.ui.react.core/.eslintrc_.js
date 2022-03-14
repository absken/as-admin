module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prettier', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
