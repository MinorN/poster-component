import vue from "rollup-plugin-vue"
import css from "rollup-plugin-css-only"
import typescript from "rollup-plugin-typescript2"
import { name } from "../package.json"
const file = (type) => `dist/${name}.${type}.js`
const tsOverrides = {
  compilerOptions: {
    declaration: true,
  },
  include: ["src/App.vue"],
}
/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "src/App.vue",
  output: {
    name,
    file: file("esm"),
    format: "es",
  },
  plugins: [
    typescript({ tsconfigOverride: tsOverrides }),
    vue(),
    css({ output: "bundle.css" }),
  ],
}
