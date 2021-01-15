const express = require("express");
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')

const app = express();

// 中间件处理静态文件请求
const resolve = file => path.resolve(__dirname, file);
app.use(express.static('../dist/client', {index: false}))
// app.use(express.static(resolve('../public')));

const isDev = process.env.SSR_ENV === 'dev';
if (isDev) {
  app.use(favicon('public/favicon.ico'))
} else {
  app.use(favicon('../dist/client/favicon.ico'))
}
const router = isDev ? require('./ssr.dev') : require('./ssr.prod')

app.use('', router);

app.listen(3000, () => {
  console.log("渲染服务器启动成功: localhost:3000");
});
