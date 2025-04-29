import { App } from "vue"
import LShape from "./index.vue"
LShape.install = (app: App) => {
  app.component(LShape.name as string, LShape)
}

export default LShape
