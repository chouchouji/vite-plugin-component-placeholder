export default {
  entry: ["src/index.ts"],
  splitting: false,
  clean: true,
  format: ["esm", "cjs"],
  outDir: "dist",
};
