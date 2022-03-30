const { createProxyMiddleware } = require("http-proxy-middleware");
const target = process.env.PROXY;

module.exports = (app) => {
	if (!target) return;

	app.use(
		["/api/v1", "/img/clubs", "/img/events", "/img/cars"],
		createProxyMiddleware({
			target,
			changeOrigin: true,
		})
	);
};
