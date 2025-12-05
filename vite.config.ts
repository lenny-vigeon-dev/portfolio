import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";

export default defineConfig({
	plugins: [
		tailwindcss(),
		wasm(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
  	optimizeDeps: {
    	exclude: ["@mediapipe/tasks-vision", "onnxruntime-web"],
  	},
});
