import * as path from "path";
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import { pages } from "./webpack.pages.config";
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin";

const jsonAlias = require("./src/platform/platform.alias.config.json");
const jsonPlatform = require("./src/platform/platform.config.json");

const alias = jsonAlias[jsonPlatform.platform];

let tsxTem = "./src/pages/{name}/index.tsx";
let lesTem = "./src/pages/{name}/index.less";

// 页面配置
const entrys: any = {};
const plugis: any = [
  new cleanWebpackPlugin(['dist']),
  new ExtractTextPlugin({
    filename: '[name].css'
  }),
  new UglifyJsPlugin()
];

const name = alias["@"];
const pagePaths = require(`./src/platform/${name}/pages/pages.config.json`) || [];

// 常规页面配置
pages.forEach((v) => {

  // 过滤平台页面
  if (name && pagePaths && pagePaths.length) {
    if (v) {

      if (!pagePaths.every((v_2) => {
        if (v === v_2) {
          return false;
        } else {
          return true;
        }
      })) {
        return;
      }

    }
  }

  entrys[`js_${v}`] = tsxTem.replace("{name}", v);
  entrys[`css_${v}`] = lesTem.replace("{name}", v);
  plugis.push(
    new HtmlWebpackPlugin({
      filename: `${v}.html`,
      template: `./src/pages/${v}/index.html`,
      hash: true,
      chunks: [`common`, `runtime`, `css_${v}`, `js_${v}`]
    })
  )
});
// 平台页面配置
if (name) {
  if (pagePaths && pagePaths.length) {

    let tsxTem = `./src/platform/${name}/pages/{name}/index.tsx`;
    let lesTem = `./src/platform/${name}/pages/{name}/index.less`;
    let htmTem = `./src/platform/${name}/pages/{name}/index.html`;

    // 页面配置
    pagePaths.forEach((v) => {
      entrys[`js_${v}`] = tsxTem.replace("{name}", v);
      entrys[`css_${v}`] = lesTem.replace("{name}", v);
      plugis.push(
        new HtmlWebpackPlugin({
          filename: `${v}.html`,
          template: htmTem.replace('{name}', v),
          hash: true,
          chunks: [`common`, `runtime`, `css_${v}`, `js_${v}`]
        })
      )
    });

  }
}

// 别名配置
const _alias: any = {
  "stb": path.resolve(__dirname, 'src/framework'),
  "src": path.resolve(__dirname, 'src')
};

for (let key in alias) {
  if (alias.hasOwnProperty(key)) {
    let val = alias[key];
    _alias[key] = path.resolve(__dirname, `src/platform/${val}`);
  }
}

const config: webpack.Configuration | any = {
  entry: entrys,
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                // alias:{
                //   '$':path.join(__dirname,'src','platform','common')
                // }
              }
            }
            , 'less-loader']
        })
      },
      {
        test: /\.tsx?$/,
        use: ['es3ify-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[hash].[ext]",
              outputPath: '/images',
              publicPath: "./images"
            }
          }
        ]
      },
      {
        test: /\.(html)$/i,
        use: ['html-withimg-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 0,
      minChunks: 500,
      maxAsyncRequests: 5,
      maxInitialRequests: 30,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          name: "common",
          minChunks: 500,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  },
  plugins: plugis,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: _alias
  },
  devtool: "eval-source-map"
}

export default config;