import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import componentPlaceholderPlugin from "@binbinji/vite-plugin-component-placeholder";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), componentPlaceholderPlugin()],
});
