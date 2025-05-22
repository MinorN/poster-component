import { App } from "vue"

import LText from "./components/LText"
import LImage from "./components/LImage"
import LShape from "./components/LShape"
import FinalPage from "./components/FinalPage"

const components = [LText, LImage, LShape, FinalPage]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name as string, component)
  })
}

export { LText, LImage, LShape, FinalPage, install }
export default { install }
