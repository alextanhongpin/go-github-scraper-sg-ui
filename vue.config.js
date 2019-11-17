module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 100000,
        maxSize: 250000
      }
    }
  }
}
