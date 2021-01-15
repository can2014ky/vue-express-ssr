const express = require("express");
const fs = require('fs');
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

const router = express.Router();
const {createBundleRenderer} = require("vue-server-renderer");

router.get(['/', '/about'], async (req, res) => {
  try {
    // 获取最新的 vue-ssr-client-manifest.json
    const clientManifestResp = await axios.get(`http://localhost:8080/vue-ssr-client-manifest.json`);
    const clientManifest = clientManifestResp.data;
    const renderer = createBundleRenderer(bundle, {
      runInNewContext: false,
      template: fs.readFileSync(path.resolve(__dirname, '../public/index.template.html'), 'utf-8'),
      clientManifest
    });
    const context = { url: req.url, title: 'ssr' }
    const html = await renderer.renderToString(context);
    res.send(html);
  } catch (error) {
    console.log(error)
    res.status(500).send("服务器内部错误");
  }
});

module.exports = router
