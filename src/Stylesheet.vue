<template lang="pug">
.page.primary.lighten#stylesheet
  h1 Stylesheet
  div
    button.callout.secondary.lighten(@click="gen") Generate!
  textarea#output(ref="output")

</template>

<script>
import { genPalette, genCSS } from './generate.js'
export default {
  name: 'Stylesheet',
  props: ['palette'],
  data () {
    return {
    }
  },
  methods: {
    gen() {
      let css = genCSS(this.palette)
      this.$refs.output.value = css
    }
  }
}
</script>

<style lang="stylus">
#output
  width: 80%
  height: 50vh
</style>
