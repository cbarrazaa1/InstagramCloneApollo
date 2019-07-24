module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['react', 'react-native'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'no-unused-vars': 1,
  },
};
