module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ["babel-preset-expo"],
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
