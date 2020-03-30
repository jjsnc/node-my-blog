const router = require('koa-router')()
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    // if (ctx.query.isadmin) {
    //     console.log('is admin')
    //     // 管理员界面
    //     if (ctx.session.username == null) {
    //         console.error('is admin, but no login')
    //         // 未登录
    //         ctx.body = new ErrorModel('未登录')
    //         return
    //     }
    //     // 强制查询自己的博客
    //     author = ctx.session.username
    // }

    // const listData = await getList(author, keyword)
    // ctx.body = new SuccessModel(listData)
    ctx.body = {
        errno:0,
        data:['获取博客列表'],
        query:ctx.query
    }
})


module.exports = router
