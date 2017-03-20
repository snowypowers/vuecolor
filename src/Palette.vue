<template lang="pug">
.page#palette.white
  h1 Color Palette
  .content#samples
    .row
      .primary.base Base Primary
      .secondary.base Base Secondary
    .row
      .primary Primary
      .secondary Secondary
    .row
      .primary.neutral Neutral Primary
      .secondary.neutral Neutral Secondary
    .row
      .primary.saturate Saturate
      .primary.desaturate Desaturate
      .secondary.saturate Saturate
      .secondary.desaturate Desaturate
    .row
      .primary.lighten Lighten
      .primary.darken Darken
      .secondary.lighten Lighten
      .secondary.darken Darken
    .row
      .primary.tint Tinted
      .primary.shade Shaded
      .secondary.tint Tinted
      .secondary.shade Shaded

</template>

<script>
import {genPalette} from './generate.js'
export default {
  name: 'Palette',
  props: ['color', 'palette'],
  data () {
    return {
    }
  },
  watch: {
    color() {
      this.$parent.palette = genPalette(this.color, 30)
    }
  },
  mounted() {
    this.$parent.palette = genPalette(this.color, 30)
  }
}
</script>

<style lang="stylus">
#samples
  display: flex
  flex-flow: column wrap
  align-items: center
  justify-content: center
  > .row
    display: flex
    flex-flow: row no-wrap
    height: 15vh
    margin: 8px 0
    > div
      margin: 0 8px
      flex: 1
      display: flex
      align-items: center
      justify-content: center
</style>
