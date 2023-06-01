module.exports = function (api) {
  api.cache(true);

  const presets = ["babel-preset-expo"];
  const plugins = [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "^@/(.+)": "./src/\\1",
        },
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
