const config = require("./utils/config")
const app = require("./app.js")
const logger = require("./utils/logger.js")

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})