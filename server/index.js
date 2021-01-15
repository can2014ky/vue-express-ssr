const express = require("express");
const fs = require('fs')

const app = express();

// 中间件处理静态文件请求
app.use(express.static('../dist/client', {index: false}))

const isDev = process.env.SSR_ENV === 'dev';
const router = isDev ? require('./ssr.dev') : require('./ssr.prod')

app.use('', router);

app.listen(3000, () => {
  console.log("渲染服务器启动成功: localhost:3000");
});
