<template lang="pug">
.section.primary#callout
  h1 What are you waiting for?
  button.large.callout Sign up now!

</template>

<script>
export default {
  name: 'CalloutView',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
@require 'base'

.callout
  background-color: harmSec
  margin: 32px
  &:hover
    background-color: baseSec
</style>
