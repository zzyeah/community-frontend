const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
};
