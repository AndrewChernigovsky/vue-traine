import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<<<<<<< HEAD
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: [
			{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
		]
	}
=======

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
>>>>>>> bb4a92553296f2943235d1ceb31d5fa5dd87ebf7
})
