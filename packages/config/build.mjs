import esbuild from 'esbuild'

/** @type {esbuild.BuildOptions}*/
const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  minify: false,
  logLevel: 'info',
  format: 'esm',
}

const ctx = await esbuild.context(config)
await ctx.watch()
