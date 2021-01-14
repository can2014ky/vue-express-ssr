const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");

const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
const isPro = process.env.NODE_ENV !== 'development';

module.exports = {
  css: {
    extract: isPro ? true : false,
  },
  outputDir: './dist/'+target,
  configureWebpack: () => ({
    entry: `./src/entry-${target}.js`,
    // 需要开启source-map文件映射，因为服务器端在渲染时，会通过Bundle中的map文件映射关系进行文件的查询
    devtool: 'source-map',
    // 服务器端在Node环境中运行
    target: TARGET_NODE ? "node" : "web",
    // 关闭对node变量、模块的polyfill
    node: TARGET_NODE ? undefined : false,
    output: {
      // 配置模块的暴露方式，服务器端采用module.exports的方式，客户端采用默认的var变量方式
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
     // 外置化应用程序依赖模块。可以使服务器构建速度更快
    externals: TARGET_NODE
      ? nodeExternals({
          allowlist: [/\.css$/]
        })
      : undefined,
    optimization: {
      splitChunks: false,
    },
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    // 关闭vue-loader中默认的服务器端渲染函数，该函数只能用于服务端渲染，而不能用于客户端渲染或测试环境。
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
};
