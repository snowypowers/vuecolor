<template lang="pug">
#splash.primary.tint.flex.col.center
  h1 Color My Life
  h4 A color playground of complementary colors
  .flex.col.center
    .color-card.primary.base
    .color-card.secondary.base(style="margin-top: -75px; margin-left: 50px;")
  HueSlider( :color='color', @change-color='onChange')
  .anchor-btm
    h5 Pick your primary color and scroll down
</template>

<script>
import HueSlider from './HueSlider.vue'
import {genCSS, genPalette} from './generate.js'
export default {
  name: 'Splash',
  props: ['color'],
  data () {
    return {
    }
  },
  components: {
    HueSlider
  },
  methods: {
    onChange(val) {
      this.$parent.color = val
    }
  },
  mounted() {

  }
}
</script>

<style lang="stylus">
#splash
  width:100%
  min-height: 95vh
  text-align: center
  > h1
    font-size: 80px
    font-weight: 300

#picker
  margin: 50px auto
.anchor-btm
  position:absolute
  bottom: 0px
  margin: 5px auto
</style>
