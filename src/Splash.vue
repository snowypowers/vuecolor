<template lang="pug">
#splash.primary.tint
  h1 Color My Life
  h4 A Color Playground for my life
  Picker#picker(v-model='color' @change-color='onChange')
  .anchor-btm
    h5 Scroll down
</template>

<script>
import { Chrome } from 'vue-color'
import {genCSS, genPalette} from './generate.js'
export default {
  name: 'Splash',
  props: ['color'],
  data () {
    return {
    }
  },
  components: {
    'Picker': Chrome
  },
  methods: {
    onChange(val) {
      console.log(val)
      this.$parent.color = val
      //this.palette = genPalette(this.color)
      //document.styleSheets[document.styleSheets.length-1].disabled = true
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
