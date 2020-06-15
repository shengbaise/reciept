'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const staticCache = require('koa-static-cache')
const cors = require('koa-cors')
const helmet = require("koa-helmet")

const config = require('./config')
const publicRouter = require('./routes/public')
const privateRouter = require('./routes/private')
const { loggerMiddleware } = require('./middlewares/logger')
const { errorHandle, responseHandle } = require('./middlewares/response')
const { corsHandler } = require('./middlewares/cors')

const app = new Koa()

// Helmet
app.use(helmet())

// cors
app.use(cors(corsHandler))

// logger
app.use(loggerMiddleware)

// Error Handle
app.use(errorHandle)

// Global Middlewares
app.use(bodyParser)
app.use(staticCache(config.publicDir))

// Routes
app.use(publicRouter.routes(), publicRouter.allowedMethods())
app.use(privateRouter.routes(), privateRouter.allowedMethods())

// Response
app.use(responseHandle)

module.exports = app
