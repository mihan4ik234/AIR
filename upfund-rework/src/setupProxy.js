const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'http://localhost:3000',
    createProxyMiddleware({
      target: 'http://localhost:4444',
      changeOrigin: true,
    })
  );
};