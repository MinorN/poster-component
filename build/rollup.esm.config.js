import baseConfig, { name, file } from "./rollup.config.js"
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  ...baseConfig,
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
}
