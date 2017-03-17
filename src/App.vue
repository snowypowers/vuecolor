<template lang="pug">
#app.primary.tint
  #headerbar.primary.darken.white-text
    button Palette
    button Test
    button Contact
  Splash
  Palette
  ContentView
  CalloutView
  Stylesheet
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
export default {
  name: 'app',
  data () {
    return {
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
  }
}
</script>

<style lang="stylus">
@require 'base'

div
  width: 100%
  overflow: hidden

#app
  text-align: center
  color: _black

#headerbar
  height: 5vh
  text-align: end
  > p
    display: inline
    margin: 0 8px


#basePri
  background-color: basePri

#baseSec
  background-color: baseSec

#about
  padding: 40px 0

#projects
  padding: 40px 0

#contact
  padding: 40px 0

#footer
  padding-bottom: 40px
</style>
