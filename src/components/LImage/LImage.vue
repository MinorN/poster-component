<template>
  <img
    :src="src"
    class="l-image-component"
    :style="styleProps"
    @click.prevent="handleClick"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
  imageDefaultProps,
  imageStylePropsNames,
  transformToComponentProps,
} from "@/defaultProps"
import useComponentCommon from "@/hooks/useComponentCommon"
const defaultProps = transformToComponentProps(imageDefaultProps)

export default defineComponent({
  name: "LImage",
  props: {
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentCommon(
      props,
      imageStylePropsNames
    )

    return {
      styleProps,
      handleClick,
    }
  },
})
</script>

<style scoped></style>
