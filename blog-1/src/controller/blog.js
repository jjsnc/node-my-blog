const { exec } = require('../db/mysql')

const getList = (author, keyword)=> {
    //先返回假数据 （数据格式正确）
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回 promise
    return exec(sql)
    
}

const getDetail = (id)=> {
    // 先返回假数据
    return {
        id:'1',
        title:'标题1',
        content:'内容1',
        author:'001'
    }
}

const newBlog = (blogData={})=> {
    //  blogData 是一个博客对象  包title content 属性
    return {
        id:3
    }
}

const updateBLog =(id, blogData)=> {
    //  blogData 是一个博客对象  包title content 属性
   //  id 要更新博客的id 
    return true
}

const delBLog =(id)=> {
  
   //  id 要删除博客id
    return true
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBLog,
    delBLog
}