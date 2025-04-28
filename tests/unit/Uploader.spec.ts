import { shallowMount, VueWrapper } from "@vue/test-utils"
import Uploader from "@/components/Uploader.vue"
import axios from "axios"
import flushPromises from "flush-promises"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

const testFile = new File(["aaa"], "aaa.png", { type: "image/png" })

let wrapper: VueWrapper<any>
describe("Uploader component", () => {
  beforeAll(() => {
    wrapper = shallowMount(Uploader, {
      props: {
        action: "test.url",
      },
    })
  })
  it("before uploading", () => {
    expect(wrapper.find("button").exists()).toBe(true)
    expect(wrapper.get("button span").text()).toBe("点击上传")
    expect(wrapper.get("input").isVisible()).toBe(false)
  })

  it("upload process shoule work", async () => {
    mockedAxios.post.mockImplementation(flushPromises)
    const fileInput = wrapper.get("input").element as HTMLInputElement
    const files = [testFile] as any
    Object.defineProperty(fileInput, "files", {
      value: files,
      writable: false,
    })
    await wrapper.get("input").trigger("change")
    expect(mockedAxios.post).toHaveBeenCalledTimes(1)
    expect(wrapper.get("button span").text()).toBe("正在上传")
    await flushPromises()
    expect(wrapper.get("button span").text()).toBe("上传成功")
  })
})
