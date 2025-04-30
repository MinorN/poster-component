import { mount, VueWrapper } from "@vue/test-utils"
import { message } from "ant-design-vue"
import UserProfile from "@/components/UserProfile.vue"
import store from "@/store/index"
import user from "@/store/user"

let wrapper: VueWrapper<any>
jest.mock("ant-design-vue", () => ({
  message: {
    success: jest.fn(),
  },
}))
const mockedRoutes: string[] = []
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url),
  }),
}))
const mockComponent = {
  template: "<div><slot></slot></div>",
}
const mockComponent2 = {
  template: "<div><slot></slot><slot name='overlay'></slot></div>",
}
const globalComponents = {
  "a-button": mockComponent,
  "a-dropdown-button": mockComponent2,
  "a-menu": mockComponent,
  "a-menu-item": mockComponent,
  "router-link": mockComponent,
}

describe("UserProfile component", () => {
  beforeAll(() => {
    jest.useFakeTimers()
    wrapper = mount(UserProfile, {
      props: {
        user: {
          isLogin: false,
        },
      },
      global: {
        components: globalComponents,
        plugins: [store],
      },
    })
  })
  it("shoule render login button when login is false", async () => {
    expect(wrapper.get("div").text()).toBe("登录")
    await wrapper.get("div").trigger("click")
    jest.runAllTimers()
    expect(message.success).toHaveBeenCalled()
    expect(store.state.user.isLogin).toBe(true)
    expect(store.state.user.userName).toBe("minorN")
  })

  it("shoule render username when login is true", async () => {
    await wrapper.setProps({
      user: {
        isLogin: true,
        userName: "minorN",
      },
    })
    expect(wrapper.get(".user-profile-component").html()).toContain("minorN")
    expect(wrapper.find(".user-profile-dropdown").exists()).toBeTruthy()
  })
  it("shoule call logout when click logout", async () => {
    await wrapper.get(".user-profile-dropdown div").trigger("click")
    expect(store.state.user.isLogin).toBe(false)
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockedRoutes).toEqual(["/"])
  })
  afterEach(() => {
    (message as jest.Mocked<typeof message>).success.mockReset()
  })
})
