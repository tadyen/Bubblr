module.exports = function(api) {
  api.cache(true);
  const disableImportExportTransform = true;
  return {
    presets: [
      'babel-preset-expo',
    ],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
