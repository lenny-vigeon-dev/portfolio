import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const adapter =
	process.env.ADAPTER === 'vercel'
		? adapterVercel
		: adapterNode;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			// $lib est déjà configuré par défaut (pointe vers src/lib)
			$components: 'src/components',
			$assets: 'src/assets',
			// $stores: 'src/stores',
			$utils: 'src/utils',
			$: 'src' // Ajout de l'alias pour le dossier racine
		}
	}
};

export default config;
