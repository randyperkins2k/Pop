const path = require('path');
const SRC_DIR = path.join(__dirname, 'client/src');
const DIST_DIR = path.join(__dirname, 'client/dist');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path:DIST_DIR,
    publicPath = '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|css)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
    ]
  },
  devServer: {
    contentBase: 'app/ui/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 8080,
    outputPath: buildPath,
    historyApiFallback: true
  }
};
