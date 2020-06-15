'use strict'

const { logger } = require('./logger')

// 这个middleware用于将ctx.result中的内容最终回传给客户端
const responseHandle = (ctx) => {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 200,
      msg: ctx.msg || '',
      data: ctx.result
    }
  }
}

const errorHandle = (ctx, next) => {
  return next().catch(err => {
    if (err.code == null) {
      logger.error(err.stack)
    }
    ctx.body = {
      code: err.code || -1,
      data: null,
      msg: err.message.trim()
    }
    // 保证返回状态是 200
    ctx.status = 200

    return Promise.resolve()
  })
}

module.exports = {
  responseHandle,
  errorHandle
}
