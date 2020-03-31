# node-my-blog
#总体目录介绍

blog-1          // 原生开发博客
blog-express    // express 框架开发博客
blog-koa2       // koa2 开发博客
html-test       // 前端页面
lib             // 分析框架中间件原理
logs            // 存放日志文件
http-test       // 请求http
koa2-test       // 测试koa2 框架
express-test    // 测试express 框架
file-test       // 测试文件读写
pm2-test        // 测试pm2
promise-test    // 测试promise
redis-test      // 测试redis
stream-test     // 测试stream
.gitignore      // git 忽略文件

#blog-1 目录介绍

bin
    www.js      //    入口文件
src
    conf        //    数据库 redis 配置数据
    controller  //    处理sql语句查询
    db          //    mysql redis 统一处理
    model       //    构造响应数据 错误或者成功
    router      //    配置路由
    utils       //    公共工具函数
app.js          //    如扩依赖文件
package.json    //项目依赖包管理

技术栈

node + mysql + redis +koa2 + express + nginx 


