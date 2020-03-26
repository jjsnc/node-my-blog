const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { get, set } = require('./src/db/redis')
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

// session 数据
// const SESSION_DATA = {}
// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject, ) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return

            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    // 解析 cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  // k1=v1;k2=v2;k3=v3
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // // 解析 session
    // let needSetCookie = false
    // console.log()
    // let userId = req.cookie.userid
    // console.log(userId,'userIduserId')
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    // 解析session 使用（redis）

    let needSetCookie = false
    let userId = req.cookie.userid

    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        //  初始化 redis 中 session 值
        set(userId,{})
    }
    // 获取session
    req.sessionId = userId 
    get(req.sessionId).then(sessionData=> {
        if(sessionData==null) {
            // 初始化redis 中的session 值
             set(req.sessionId, {})
            //  设置session
            req.session = {}
        }else {
            // 设置session
            req.session = sessionData;
        }
        // 处理  post data
        return getPostData(req)
    }).then(postData => {
        req.body = postData
        // 处理blog 路由
        // const blogData = handleBlogRouter(req, res)
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
            }
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }
        //  处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            if (needSetCookie) {
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly;expires=${getCookieExpires()}`)
            }
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }
        // 未命中路由 返回 404 

        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })


}
module.exports = serverHandle