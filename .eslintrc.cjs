module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'no-restricted-syntax': 'off',
  },
};
