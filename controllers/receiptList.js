'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const receiptServices = require('../services').receiptList
const { InvalidQueryError } = require('../lib/error')
const receiptList = {}
receiptList.receiptList = async (ctx, next) => {
    const query = ctx.request.query
    const list = await receiptServices.getReceiptList(query)
    ctx.result = list
    return next()
}

module.exports = receiptList
