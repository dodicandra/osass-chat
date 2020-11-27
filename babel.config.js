module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ios.tsx',
          '.android.tsx',
          '.ts',
          '.d.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          screens: './src/screens',
          router: './src/router',
          components: './src/components',
          utils: './src/utils',
          store: './src/store'
        }
      }
    ]
  ]
};
