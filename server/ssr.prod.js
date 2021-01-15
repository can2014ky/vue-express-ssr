const express = require("express");
const fs = require('fs')

const router = express.Router();

const {createBundleRenderer} = require("vue-server-renderer");
const serverBundle = require('../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync('../public/index.template.html', 'utf-8'), // 宿主模板文件
    clientManifest
})

// 路由处理交给vue, 按需服务端渲染
router.get(['/', '/about'], async (req, res) => {
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

module.exports = router
