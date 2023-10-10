import esbuild from 'esbuild'

/** @type {esbuild.BuildOptions}*/
const config = {
  entryPoints: ['index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  minify: false,
  logLevel: 'info',
}

const ctx = await esbuild.context(config)
await ctx.watch()
