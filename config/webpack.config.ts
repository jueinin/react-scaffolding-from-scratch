import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

let config: webpack.Configuration = {
    entry: ['babel-polyfill',path.resolve(__dirname,'../src/index.tsx')],
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle[hash].js"
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts', '.jsx', '.json']
    },
    mode: (process.env.NODE_ENV as webpack.Configuration['mode']),
    plugins: [
        new HtmlWebpackPlugin({
            title: "chen",
            template: path.resolve(__dirname, './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
        }),
        new webpack.HotModuleReplacementPlugin({

        })
    ],
    module: {
      rules: [
          {
              test: /\.css?$/,
              use: [
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                          insertAt: 'top'
                      }
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true
                      }
                  }
              ]
          },
          {
              test: /\.(gif|jpg|jpeg|bmp|woff|woff2|ttf|svg)$/,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                          limit: 8192,
                          outputPath: 'images'
                      }
                  }
              ]
          },
          {
              test: /\.scss$/,
              use: [
                  {loader: MiniCssExtractPlugin.loader},'css-loader','sass-loader'
              ],
              exclude: /node_modules/
          },
          {
              test: /\.less$/,
              use: [
                  {loader: MiniCssExtractPlugin.loader},'css-loader','less-loader'
              ],
              exclude: /node_modules/
          },
          {
              test: /\.(jsx?|tsx?)$/,
              exclude: /node_modules/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: [ '@babel/preset-env','@babel/preset-react','@babel/preset-typescript'],
                          plugins: [
                              ['@babel/plugin-proposal-decorators',{
                                legacy: true
                              }],
                              ['@babel/plugin-proposal-class-properties'],
                              ["react-hot-loader/babel"]
                              // ['@babel/transform-runtime']
                          ],
                          cacheDirectory: true
                      },
                  }
              ]
          }
      ]
    },
    optimization: {
         // 这个主要压缩代码的,webpack在生产模式自动会打开
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "../dist"),
        host: "localhost",
        port: 3000,
    }
};
export default config;