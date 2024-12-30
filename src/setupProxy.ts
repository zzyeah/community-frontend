import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/res",
    createProxyMiddleware({
      target: "http://127.0.0.1:7001",
      changeOrigin: true,
    })
  );
};
