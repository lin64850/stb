var path = require('path');
var web = require('web-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

var base = "src", contentBase;

contentBase = [
  path.resolve(__dirname, base, '**/*.html'),
  path.resolve(__dirname, base, '**/*.less')
]

var autoWebPlugin = new web.AutoWebPlugin('./' + base + '/pages', {
  ignorePages: [''],
  template: './' + base + '/assets/html/template.html',
  outputPagemap: true,
  requires: ['const', 'common', 'config']
});

module.exports = {
  entry: autoWebPlugin.entry({
    const: './' + base + '/assets/js/const'
  }),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          test: /[\\/](node_modules|framework)[\\/]/,
          name: 'common',
          chunks: 'all'
        },
        config: {
          test: /[\\/](src\/configs|virtual\/configs)[\\/]/,
          name: 'config',
          chunks: 'all',
        }
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "stb-cookie": path.resolve(__dirname, 'src/alias/cookie'),
      "stb-key": path.resolve(__dirname, 'src/alias/key')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['es3ify-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.less$/,
        oneOf: [{
          resourceQuery: /^\?raw$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'less-loader'
            }
          ]
        },
        {
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]"
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        }
        ]

      },
      {
        test: /\.(jpg|png|ico|jpeg|gif|svg)$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name(file) {
                    return file.substr(file.indexOf('images') + 7, file.length - 1);
                  },
                  publicPath: "./images",
                  outputPath: "images"
                }
              }
            ]
          },
          {
            use: [
              {
                loader: 'file-loader',
                options: {
                  name(file) {
                    return file.substr(file.indexOf('images') + 7, file.length - 1);
                  },
                  publicPath: "../images",
                  outputPath: "images"
                }
              }
            ]
          }
        ]

      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'resources', to: '' },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    autoWebPlugin
  ],
  devServer: {
    port: 9000,
    contentBase: contentBase,
    watchContentBase: true,
  }
}