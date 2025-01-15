const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
    configure: (webpackConfig, { env, paths }) => {
      const isEnvDevelopment = env === "development";
      const isEnvProduction = env === "production";
      webpackConfig.output = {
        // The build folder.
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: isEnvDevelopment,
        // There will be one main bundle, and one file per asynchronous chunk.
        // In development, it does not produce real files.
        filename: isEnvProduction
          ? "assets/js/[name].[contenthash:8].js"
          : isEnvDevelopment && "assets/js/bundle.js",
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: isEnvProduction
          ? "assets/js/[name].[contenthash:8].chunk.js"
          : isEnvDevelopment && "assets/js/[name].chunk.js",
        assetModuleFilename: "assets/media/[name].[hash][ext]",
        // webpack uses `publicPath` to determine where the app is being served from.
        // It requires a trailing slash, or the file assets will get an incorrect path.
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: paths.publicUrlOrPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: isEnvProduction
          ? (info) =>
              path
                .relative(paths.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, "/")
          : isEnvDevelopment &&
            ((info) =>
              path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      };
      return webpackConfig;
    },
  },
};
