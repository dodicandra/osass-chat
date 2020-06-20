module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['src/**'],
    },
    {
      files: ['src/**'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 1,
        curly: 0,
        'react-native/no-inline-styles': 0,
        'react-hooks/exhaustive-deps': 1,
        'no-new': 0,
      },
    },
  ],
};
