import express from 'express'
import bodyParser from 'body-parser'
import router from './router.js'
import errorHandler from './middlewares/error-handler.middleware.js'
import log from './utils/logger.js'

const { API_PORT } = process.env

const app = express()
app.use(bodyParser.json())
app.use(router)
app.use(errorHandler)

app.listen(API_PORT, () => {
    log.info(`Application running on port ${API_PORT}`)
})

