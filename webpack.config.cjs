const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'assets/[name].[contenthash].js' : 'assets/[name].js',
      publicPath: '/',
      clean: true
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm-bundler.js'
      },
      extensions: ['.js', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html'
      })
    ],
    devServer: {
      static: path.resolve(__dirname, 'public'),
      historyApiFallback: true, 
      port: 5173,
      open: false,
      hot: true
    },
    devtool: isProduction ? false : 'source-map'
  }
}
