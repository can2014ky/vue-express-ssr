// nodejs服务器
const express = require("express");
// const Vue = require("vue")
const fs = require('fs')

// 创建express实例和vue实例
const app = express();

const isDev = process.env.SSR_ENV === 'dev';
console.log('isDev:', isDev)
// 创建渲染器
const {createBundleRenderer} = require("vue-server-renderer");

if(!isDev) {
  const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
  const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');
  const renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template: fs.readFileSync('../public/index.template.html', 'utf-8'), // 宿主模板文件
      clientManifest
  })
  // 中间件处理静态文件请求
  app.use(express.static('../dist/client', {index: false}))

  // 路由处理交给vue, 按需服务端渲染
  app.get(['/', '/about'], async (req, res) => {
    try {
      const context = {
        url: req.url,
        title: 'ssr'
      }
      const html = await renderer.renderToString(context);
      res.send(html);
    } catch (error) {
      console.log(error)
      res.status(500).send("服务器内部错误");
    }
  });
} else {
  const webpack = require('webpack');
  const axios = require('axios');
  const path = require('path');
  const MemoryFS = require('memory-fs');
  const webpackConf = require('@vue/cli-service/webpack.config');
  const serverCompiler = webpack(webpackConf);
  const mfs = new MemoryFS();
  serverCompiler.outputFileSystem = mfs;
  let bundle;
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err
    }
    stats = stats.toJson();
    stats.errors.forEach(error => console.error(error));
    stats.warnings.forEach(warn => console.warn(warn));
    const bundlePath = path.join(
        webpackConf.output.path,
        'vue-ssr-server-bundle.json'
    );
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    console.log('New bundle generated.');
  })
  app.use(express.static(path.resolve(__dirname, '../dist/client'), {index: false}))
  app.get(['/', '/about'], async (req, res) => {
    try {
      // 获取最新的 vue-ssr-client-manifest.json
      const clientManifestResp = await axios.get(`http://localhost:8080/vue-ssr-client-manifest.json`);
      const clientManifest = clientManifestResp.data;
      const renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, '../public/index.template.html'), 'utf-8'),
        clientManifest
      });
      const context = {
        url: req.url,
        title: 'ssr'
      }
      const html = await renderer.renderToString(context);
      res.send(html);
    } catch (error) {
      console.log(error)
      res.status(500).send("服务器内部错误");
    }
  });
}

app.listen(3000, () => {
  console.log("渲染服务器启动成功: localhost:3000");
});
