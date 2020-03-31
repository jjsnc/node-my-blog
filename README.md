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



接口
    nodejs处理http请求
    搭建开发环境
    处理路由
    开发各个接口
数据存储
    mysql介绍
    nodejs连接数据库
    接口对接mysql
登陆
    cookie和session
    登陆中间件开发
    与前端页面联调（结合Nginx）
    使用redis 存储session
安全
    预防sql注入
    预防xss攻击
日志
    nodejs 文件操作
    stream 流
    日志功能开发
    日志文件拆分
    日志分析
express
    express 介绍和使用
    中间件开发原理
    开发API接口
    结合常用插件
    实现登陆与日志
Koa2框架
    koa2 介绍和使用
    中间件实现原理
    开发PAI接口
    结合常用插件
    实现登陆和日志
线上环境
    pm2 介绍和配置
    pm2 多进程模型
    服务器运维


