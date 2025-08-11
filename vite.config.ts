import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

function twClassesCodegen(opts: { configPath?: string } = {}): Plugin {
  const configPath = opts.configPath ?? 'tw-codegen.config.ts';
  return {
    name: 'tw-classes-codegen',
    async buildStart() {
      const abs = path.resolve(process.cwd(), configPath);
      this.addWatchFile(abs);

      // Import dynamique pour que Vite recharge à chaud en dev
      const mod = await import(pathToFileURL(abs).href);
      const generateAll: () => string = (mod.default ?? mod.generateAll) as any;
      if (typeof generateAll !== 'function') {
        this.error(`Le module ${configPath} doit exporter "default" (function) retournant un string.`);
        return;
      }

      const classes = generateAll();
	//   console.log(classes);

      const outDir = path.resolve(process.cwd(), 'src/.tw');
      await fs.mkdir(outDir, { recursive: true });
      const file = path.join(outDir, 'tw-generated.svelte');

      const content = `<!-- AUTO-GENERATED: do not edit -->
<script lang="ts">/* noop */</script>
<!-- Les classes ci-dessous sont uniquement là pour le scan Tailwind -->
<div class="${classes}"></div>
`;

      await fs.writeFile(file, content, 'utf8');
      this.info(`Tailwind codegen: ${classes.split(/\s+/).filter(Boolean).length} tokens écrits → ${path.relative(process.cwd(), file)}`);
    }
  };
}



export default defineConfig({
	plugins: [
		twClassesCodegen(), // ⚡ Génère les classes avant Tailwind
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		}),
	]
});
