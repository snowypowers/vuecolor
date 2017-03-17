<template lang="pug">
.page#palette.white
  h1 Color Palette
  #samples
    .row
      #basePri Base Primary
      #baseSec Base Secondary
    .row
      #pri.primary Neutral Primary
      #sec.secondary Neutral Secondary
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
export default {
  name: 'Palette',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
#samples
  display: flex
  flex-flow: column wrap
  align-items: center
  justify-content: center
  width: 100%
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
