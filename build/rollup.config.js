import vue from "rollup-plugin-vue"
import css from "rollup-plugin-css-only"
import typescript from "rollup-plugin-typescript2"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { name } from "../package.json"
const file = (type) => `dist/${name}.${type}.js`
const tsOverrides = {
  compilerOptions: {
    declaration: true,
  },
  exclude: [
    "node_modules",
    "src/App.vue",
    "src/main.ts",
    "tests/**/*.ts",
    "tests/**/*.tsx",
  ],
}
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfigOverride: tsOverrides }),
    vue(),
    css({ output: "bundle.css" }),
  ],
  external: ["vue", "lodash-es"],
}

export { name, file }
