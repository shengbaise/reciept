'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
const router = new Router()
router.prefix('/api')
console.info(controllers.receiptList.receiptList, 'controllers.receiptList')
router.post('/login', controllers.user.login)
router.get('/test', controllers.test.test)
router.get('/receipt-list', controllers.receiptList.receiptList)

module.exports = router
