const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@types": path.resolve(__dirname, "src/types"),
      "@redux": path.resolve(__dirname, "src/redux"),
    },
    configure: (webpackConfig, { env, paths }) => {
      // webpackConfig.entry = './path/to/my/entry/file.js';
      return webpackConfig;
    },
  },
};
