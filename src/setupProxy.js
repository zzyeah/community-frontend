const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/res",
    createProxyMiddleware({
      target: "http://localhost:4015/res",
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4015/api",
      changeOrigin: true,
    })
  );

  app.use(
    "/static",
    createProxyMiddleware({
      target: "http://localhost:4015/static",
      changeOrigin: true,
    })
  );
};
