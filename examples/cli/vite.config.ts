import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'
import componentPlaceholderPlugin from '../../dist/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), componentPlaceholderPlugin()],
})
