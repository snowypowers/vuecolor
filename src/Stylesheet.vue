<template lang="pug">
.page.primary.lighten#stylesheet
  h1 Stylesheet
  div
    button.callout Generate!
  textarea#output

</template>

<script>
export default {
  name: 'Stylesheet',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
#output
  width: 80%
  height: 50vh
</style>
