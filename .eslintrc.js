module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 0,
    'linebreak-style': 0,
    "no-irregular-whitespace": 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'camelcase': 0,
    'camelcase': 0,
    'max-len': ["error", {
      "code": 200
    }],
    'no-eval': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
