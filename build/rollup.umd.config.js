import baseConfig, { name, file } from "./rollup.config.js"
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  ...baseConfig,
  output: {
    name: "PosterComponents",
    file: file("umd"),
    format: "umd",
    globals: {
      vue: "Vue",
      "lodash-es": "_",
    },
    exports: "named",
  },
}
