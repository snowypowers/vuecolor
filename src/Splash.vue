<template lang="pug">
#splash.primary.tint
  h1 Color My Life
  h4 A Color Playground for my life
  .anchor-btm
    h5 Scroll down
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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

.anchor-btm
  position:absolute
  bottom: 0px
  margin: 5px auto
</style>
