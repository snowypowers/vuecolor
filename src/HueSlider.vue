<template lang="pug">
.content.flex.center
  input#hue(ref="slider" type="range" min=0 max=360 v-model="val")
  p {{ val }}

</template>

<script>
import {makeHSL} from './generate.js'
export default {
  name: 'HueSlider',
  props: ['color'],
  data () {
    return {
      val: this.color.hsl.h
    }
  },
  watch: {
    val() {
      this.$emit('change-color', makeHSL(this.val, 1, 0.5))
    }
  }
}
</script>

<style lang="stylus">

#hue
  -webkit-appearance: none
  width: 100%
  height: 16px
  background: transparent
  &:focus
    outline: none
  &::-webkit-slider-runnable-track
    -webkit-appearance: none
    cursor: pointer
    width: 100%
    border-radius: 8px
    border:0.1px solid #010101
    height: 16px

    background: -webkit-linear-gradient(right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)
    background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)
  &::-webkit-slider-thumb
    -webkit-appearance: none
    box-sizing: content-box
    height: 16px
    width: 16px
    border-radius: 50%
    background: white
    margin-top: -2px
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d
</style>
