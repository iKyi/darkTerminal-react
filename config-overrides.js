const { alias, configPaths, aliasJest } = require("react-app-rewire-alias");

const aliasMap = configPaths("./tsconfig.paths.json"); // or jsconfig.paths.json

/* config-overrides.js */
// const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
  };
  config.plugins
    .push
    // new webpack.ProvidePlugin({
    //   process: "process/browser",
    //   Buffer: ["buffer", "Buffer"],
    // })
    ();

  return config;
};

module.exports = alias(aliasMap);
module.exports.jest = aliasJest(aliasMap);
