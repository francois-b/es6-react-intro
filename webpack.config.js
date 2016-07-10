module.exports = {
  entry: './app.jsx',
  output: {
    path: 'dist/',
    filename: 'bundle.js',
    publicPath: '.'
  },
  resolve: {
    extensions: ["", ".js", "jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      }
    ]
  },
  devtool: 'source-map'
}
