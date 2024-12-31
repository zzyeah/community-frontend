const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/res",
    createProxyMiddleware({
      target: "http://localhost:4015/res",
      changeOrigin: true,
    })
  );
};
