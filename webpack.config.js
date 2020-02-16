const path = require('path');
const { MODE } = process.env;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimazeCssAssetsWPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWPlugin = require('terser-webpack-plugin');

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

const getFileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
  mode: MODE,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [ '.js', '.json' ],
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
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        }, 'css-loader' ]
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
        use: [ {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        }, 
        'css-loader',
        'less-loader' ]
      }
    ]
  }
};
