export default {
  entry: ['src/index.ts'],
  splitting: false,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
}
