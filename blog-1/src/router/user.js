const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')
const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    // 登陆
    if (method === 'POST' && path === '/api/user/login') {
        const result = login(res.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('登陆失败')
        }
    }
        
  

}

module.exports = handleUserRouter