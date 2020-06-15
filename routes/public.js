'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
console.info(controllers, 'controllers')
const router = new Router()
router.prefix('/api')

router.post('/login', controllers.user.login)
router.get('/test', controllers.test.test)

module.exports = router
