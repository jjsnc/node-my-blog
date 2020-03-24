const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    // 登陆
    if (method === 'GET' && path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        console.log(username, password,'666')
        return result.then(data => {
            if (data.username) {
            res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly;expires=${getCookieExpires()}`)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }
    // 登录验证的测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {

    //     if (req.cookie.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     }
    //     return Promise.resolve(
    //         new ErrorModel('尚未登录')
    //     )
    // }



}

module.exports = handleUserRouter