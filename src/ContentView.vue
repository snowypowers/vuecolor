<template lang="pug">
.page#test
  h1 Hello There.
  .content.white
    h3 What
    p This is a website with a color theme that is derived from choosing a single hue. You select a starting hue and the entire palette will be generated from that hue. The palette is based on complementary colors, with the color you chose to be the base color to be used in majority of the elements and the complementary color becomes the callout color. This serves as a simple kickstart to palette design.
    p Once you are pleased with your color choice, you can generate a CSS stylesheet to import and start using. The 3 main variety of colors are available - base, neutral and normal colors.
    p Normal colors are addressed with the primary and secondary selectors. They are bright and stand out on the page. Use them for callout elements such as buttons or attention grabbing headers.
    p Base colors are the basic colors without any mixing. I would avoid using them but they are provided so that you can always play with them yourself.
    p Neutral colors are darker tones of the normal colors. They can be used as background colors
    p For each of these 3 sets, 6 modifiers are available. They are shown in the palette. To use them, just add in the modifier class. For example, a lighter neutral primary color can be assigned by class .primary.neutral.lighten

    h3 Why
    p This site was setup as an effort to learn and view complementary color palettes. There are many color tools on the web right now that helps you pick colors but they do not show how does the colors feel on the actual content. This site was created as a result of that.

    h3 How
    p I followed Color Theory by Natalya as a guide to how to produce my palette from a simple hue. I find it easy and effective to apply her steps and come up with a set of colors that not only blend well but fit the roles they are given. If you are interested in this, please check out her guide!

    h3 Links
    a(href = "https://tallys.github.io/color-theory/") Color Theory Guide
</template>

<script>
export default {
  name: 'ContentView',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">

</style>
