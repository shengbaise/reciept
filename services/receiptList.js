
const ReceiptList = require('../models/index').getModel('receiptList')
const receiptList = {
    /**
     * @Description: 登录
     * @date 2019/5/30
     * @params: { Object } userData
     * @return: { Object | null }
     */
    async getReceiptList ({current, size, fuzzy = ''}) {
        let totalPage = 0
        const keyword = fuzzy.replace(/([\^\$\(\)\*\+\?\.\\\|\[\]\{\}])/g, "\\$1");
        const reg = new RegExp(keyword, 'i')
        const query =  ReceiptList.find({
            '$or':[{'title': {$regex: reg}},
            {'desc': {$regex: reg}},
            {'author': {$regex: reg}}]
        })
        const list = await query.skip((current -1)*size).limit(size*1)
        await query.countDocuments({}, (err, num) => {
            totalPage = num
        })
        const totalSize = Math.ceil(totalPage / size)
        return {
            list,
            totalPage,
            totalSize,
            size: size*1,
            page: current *1
        }
    }
}

module.exports = receiptList
