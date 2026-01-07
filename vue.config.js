const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: ['vuetify'],

  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        ws: true,
        // /api/assistant/chat -> /assistant/chat côté FastAPI
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
