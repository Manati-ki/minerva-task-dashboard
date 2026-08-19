import { defineConfig, mergeConfig } from 'vite'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
      globals: true,
    },
  })
)
