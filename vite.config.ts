import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { build } from 'esbuild';

function twClassesCodegen(opts: { configPath?: string } = {}): Plugin {
  const configPath = opts.configPath ?? 'tw-codegen.config.ts';
  return {
    name: 'tw-classes-codegen',
    async buildStart() {
      const abs = path.resolve(process.cwd(), configPath);
      this.addWatchFile(abs);

      try {
        // Use esbuild to compile the TypeScript file to JavaScript
        const result = await build({
          entryPoints: [abs],
          format: 'esm',
          target: 'node18',
          bundle: false,
          write: false,
          platform: 'node',
        });

        if (result.outputFiles && result.outputFiles[0]) {
          const jsCode = result.outputFiles[0].text;

          // Create a temporary module to evaluate the compiled JavaScript
          const tempModulePath = path.join(process.cwd(), `temp-${Date.now()}.mjs`);
          await fs.writeFile(tempModulePath, jsCode);

          try {
            const mod = await import(`file://${tempModulePath}`);
            const generateAll = mod.default || mod.generateAll;

            if (typeof generateAll !== 'function') {
              this.error(`Le module ${configPath} doit exporter "default" (function) retournant un string.`);
              return;
            }

            const classes = generateAll();
            // console.log(classes);

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
          } finally {
            // Clean up the temporary file
            await fs.unlink(tempModulePath).catch(() => {});
          }
        }
      } catch (error) {
        this.error(`Failed to process ${configPath}: ${error}`);
      }
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
