const { generateApi } = require('swagger-typescript-api');
const { resolve } = require("path");

generateApi({
		name: "Api.ts",
		output: resolve(process.cwd(), "./src/api"),
		url: `${process.env.BE_URL}/api/v1/swagger/doc.json`,
		httpClientType: 'axios',
})
