module.exports = {
  target: 'webworker',
  entry: './index.js',
  module: {
    rules: [{ test: /\.hbs$/, loader: 'handlebars-loader' }],
  }
}