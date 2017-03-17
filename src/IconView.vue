<template lang="pug">
.section#icons
  h1 Icons
    .icons-container.flex.center
      i.fa.fa-github-square
      i.fa.fa-gitlab.white-text
      i.fa.fa-linkedin-square.sec-text
      i.fa.fa-facebook-square.pri-text
      i.fa.fa-twitter-square.sec-darken-text
      i.fa.fa-instagram.pri-darken-text


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
