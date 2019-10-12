module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-alert': 'off',
    'max-len': ['error', 400],
    'object-curly-newline': 'off',
    'no-nested-ternary': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
