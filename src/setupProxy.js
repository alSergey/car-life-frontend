const { createProxyMiddleware } = require("http-proxy-middleware");
const target = process.env.BE_URL;

module.exports = (app) => {
	if (!target) return;

	app.use(
		["/api/v1", "/img/clubs", "/img/events", "/img/cars", "/img/events-posts"],
		createProxyMiddleware({
			target,
			changeOrigin: true,
		})
	);
};
