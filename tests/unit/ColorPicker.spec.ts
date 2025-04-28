import { mount, VueWrapper } from "@vue/test-utils"
import ColorPicker from "@/components/ColorPicker.vue"
import rgbHex from "rgb-hex"
const defaultColors = [
  "#ffffff",
  "#f5222d",
  "#fa541c",
  "#fadb14",
  "#52c41a",
  "#1890ff",
  "#722ed1",
  "#8c8c8c",
  "#000000",
  "",
]

let wrapper: VueWrapper<any>

describe("ColorPicker component", () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: "#ffffff",
      },
    })
  })
  it("should render", () => {
    expect(wrapper.find("input").exists()).toBe(true)
    const input = wrapper.get("input").element
    expect(input.type).toBe("color")
    expect(input.value).toBe("#ffffff")
    expect(wrapper.findAll(".picked-color-list li").length).toBe(
      defaultColors.length
    )
    const firstItem = wrapper.get("li:first-child div").element as HTMLElement
    expect("#" + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0])
    const lastItem = wrapper.get("li:last-child div").element as HTMLElement
    expect(lastItem.classList.contains("transparent-back")).toBe(true)
  })
  it("should emit event", async () => {
    const blackHex = "#000000"
    const input = wrapper.get("input")
    await input.setValue(blackHex)
    expect(wrapper.emitted()).toHaveProperty("change")
    const events = wrapper.emitted("change")
    expect(events![0]).toEqual([blackHex])
  })

  it("should change color when click color list", () => {
    const firstItem = wrapper.get("li:first-child div")
    firstItem.trigger("click")
    const events = wrapper.emitted("change") as any
    expect(events![1]).toEqual([defaultColors[0]])
  })
})
