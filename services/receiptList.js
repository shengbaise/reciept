
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
        ReceiptList.countDocuments({
            '$or':[{'title': {$regex: reg}},
            {'desc': {$regex: reg}},
            {'author': {$regex: reg}}]
        }, (err, num) => {
            if (err) {
                console.info(err)
                return
            }
            totalPage = num
            console.info(num, 'fggfgfg')
        })
        console.info(totalPage, 'totalPage')
        const totalSize = Math.ceil(totalPage / size)
        const list = await ReceiptList.find({
            '$or':[{'title': {$regex: reg}},
            {'desc': {$regex: reg}},
            {'author': {$regex: reg}}]
        }).skip((current -1)*size).limit(size*1)
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
