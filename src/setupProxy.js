const { createProxyMiddleware } = require("http-proxy-middleware");
const target = process.env.PROXY;

module.exports = (app) => {
	if (!target) return;

	app.use(
		["/api/v1", "/static/clubs", "/static/events"],
		createProxyMiddleware({
			target,
			changeOrigin: true,
		})
	);
};
