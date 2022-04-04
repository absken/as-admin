module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/function-component-definition': [
      2,
      {
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 0,
    'unused-imports/no-unused-imports-ts': 0,
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/default-param-last': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    'import/no-cycle': 0,
    'import/no-useless-path-segments': 0, // Allows us to import as './' instead of '.'
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
  },
};
