const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('/Users/varvara.zabelina/Documents/techno/car-life-frontend/static'));

app.listen(port, () => {
		console.log(`Example app listening on port ${port}`)
})
