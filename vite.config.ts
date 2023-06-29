import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
		cssTarget: ['chrome38']
	},
	base: './',
	plugins: [
		svelte(),
		legacy({
			//targets: ['defaults', 'not IE 11']
			targets: ['chrome 38']
		})
	]
});
