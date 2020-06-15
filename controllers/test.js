'use strict'
const test = {}
test.test = async (ctx, next) => {
  ctx.result = {
    name: 'yishuo',
    age: 25
  }
  return next()
}

module.exports = test
