import { mapValues, without } from "lodash-es"

export interface ComponentData {
  props: { [key: string]: any }
  id: string
  name: string
  layerName?: string
  isHidden?: boolean
  isLocked?: boolean
}

export interface PageData {
  props: { [key: string]: any }
  setting: { [key: string]: any }
  id?: number
  title?: string
  desc?: string
  coverImg?: string
  uuid?: string
  latestPublishAt?: string
  updatedAt?: string
  isTemplate?: boolean
  isHot?: boolean
  isNew?: boolean
  author?: string
  status?: string
}

export const isEditingProp = {
  isEditing: {
    type: Boolean,
    default: false,
  },
}
// 通用的样式属性
export const commonDefaultProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: "1",
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
}

export type CommonComponentProps = typeof commonDefaultProps

// 文字
export const textDefaultProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
}

export type TextComponentProps = typeof textDefaultProps & CommonComponentProps

export const transformDefaultProps = (props: TextComponentProps) => {
  const mapProps = mapValues(props, (item) => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item,
    }
  })
  return {
    ...mapProps,
    ...isEditingProp,
  }
}

export const textStylePropsNames = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
)

// 图片
export const imageDefaultProps = {
  src: "test.url",
  ...commonDefaultProps,
}

export type ImageComponentProps = typeof imageDefaultProps
export const imageStylePropsNames = without(
  Object.keys(imageDefaultProps),
  "src"
)
export const transformToComponentProps = <T extends {}>(props: T) => {
  const mapProps = mapValues(props, (item) => {
    return {
      type: (item as any).constructor as StringConstructor,
      default: item,
    }
  })
  return {
    ...mapProps,
    ...isEditingProp,
  }
}

// 图形
export const shapeDefaultProps = {
  backgroundColor: "",
  ...commonDefaultProps,
}
export type ShapeComponentProps = typeof shapeDefaultProps

export const shapeStylePropsNames = without(
  Object.keys(imageDefaultProps),
  "actionType",
  "url"
)
