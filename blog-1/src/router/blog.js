const { getList, getDetail, newBlog, updateBLog, delBLog } = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    const id = req.query.id || ''
    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)

        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {

        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }
    // 新建一篇博客
    if (method === 'POST' && path === '/api/blog/new') {
        const blogData = newBlog(req.body)
        return new SuccessModel(blogData)
    }
    //更新一篇博客
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBLog(id, res.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新失败')
        }

    }
    //删除一篇博客
    if (method === 'POST' && path === '/api/blog/del') {
        const result = delBLog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除失败')
        }

    }

}


module.exports = handleBlogRouter