/* eslint-disable no-undef */
const path = require('path');
const { MODE } = process.env;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimazeCssAssetsWPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDev = MODE === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) config.minimizer = [
    new OptimazeCssAssetsWPlugin(),
    new TerserWPlugin()
  ];

  return config;
};

const getCssLoaders = (...extraLoaders) => {
  return (
    [ 
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
          reloadAll: true
        }
      }, 
      'css-loader',
      ...extraLoaders 
    ]
  );
};

const getFileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const WebpackConfig = {
  mode: MODE,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [ '@babel/polyfill', './index.js' ],
    analytics: './analytics.js'
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].bundle.js',
  },
  devtool: isDev ? 'source-map' : undefined,
  resolve: {
    extensions: [ '.js', '.ts', '.jsx', '.tsx', '.json' ],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: getFileName('css')
    }),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          },
          'eslint-loader'
        ]
      },
      { 
        test: /\.ts$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        ]
      },
      { 
        test: /\.(jsx|tsx)$/, 
        exclude: /node_modules/, 
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: getCssLoaders()
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.xml$/,
        use: [ 'xml-loader' ]
      },
      {
        test: /\.csv$/,
        use: [ 'csv-loader' ]
      },
      {
        test: /\.less$/,
        use: getCssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getCssLoaders('sass-loader')
      }
    ]
  }
};

module.exports = WebpackConfig;
