import { App } from "vue"
import LShape from "./LShape.vue"
LShape.install = (app: App) => {
  app.component(LShape.name as string, LShape)
}

export default LShape
