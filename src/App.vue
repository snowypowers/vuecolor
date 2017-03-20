<template lang="pug">
#app.primary.tint
  #headerbar.primary.darken.white-text.flex
    button Palette
    button Test
    button Contact
  Splash( :color="color")
  Palette( :color="color", :palette="palette")
  ContentView
  CalloutView
  Stylesheet( :palette="palette")
  IconView
  FooterView
</template>

<script>
import Stylesheet from './Stylesheet.vue'
import Splash from './Splash.vue'
import Palette from './Palette.vue'
import ContentView from './ContentView.vue'
import CalloutView from './CalloutView.vue'
import FooterView from './FooterView.vue'
import IconView from './IconView.vue'

import {attachPalette} from './generate.js'
export default {
  name: 'App',
  data () {
    return {
color:{
  hex: '#FF0000',
  hsl: {
    h: 0,
    s: 1,
    l: 0.5,
    a: 1
  },
  rgba: {
    r: 255,
    g: 0,
    b: 0,
    a: 1
  },
  a: 1
},
palette:{}
    }
  },
  components: {
    Splash,
    Stylesheet,
    Palette,
    ContentView,
    CalloutView,
    FooterView,
    IconView
  },
  watch: {
    palette() {
      attachPalette(this.palette)
    }
  }
}
</script>

<style lang="stylus">
@require 'base'

div
  width: 100%
  overflow: hidden

.color-card
  width: 100px
  height: 100px


#app
  text-align: center
  color: _black

#headerbar
  flex-direction: row-reverse
  height: 5vh
  text-align: end
  > p
    display: inline
    margin: 0 8px

#about
  padding: 40px 0

#projects
  padding: 40px 0

#contact
  padding: 40px 0

#footer
  padding-bottom: 40px
</style>
