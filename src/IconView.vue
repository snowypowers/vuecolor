<template lang="pug">
.section#icons
  h1 Icons
    .icons-container.flex.center
      i.fa.fa-github-square
      i.fa.fa-linkedin-square.secondary
      i.fa.fa-facebook-square.secondary.lighten
      i.fa.fa-instagram.secondary.tint

</template>

<script>
export default {
  name: 'IconView',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
.icons-container
  > i
    font-size: 80px
    margin: 16px
</style>
