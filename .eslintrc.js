module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'next', 'next/core-web-vitals', 'prettier'],
  env: {
    node: true,
  },
};
