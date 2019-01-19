const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = module.exports = (env, options) => {
  console.log(`This is the Webpack 4 mode: ${options.mode}`);
  return {
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    output: {
      path: __dirname + '/build',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin({ filename: 'style.css' }),
    ],
    devServer: {
      contentBase: './build',
      hot: true,
    },
  };
};
