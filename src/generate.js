const clamp = function(num, min, max) {
return Math.max(min, Math.min(num, max))
}

//Mixes 2 colors, ignoring alpha channel
const mixColor = function (c1, c2, weight) {
  let w1 = weight/100
  let w2 = 1 - w1
  let r = c1.rgba.r * w1 + c2.rgba.r * w2
  let g = c1.rgba.g * w1 + c2.rgba.g * w2
  let b = c1.rgba.b * w1 + c2.rgba.b * w2
  return makeRGB(r, g, b)
}

const colorHex = function(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
const rgb2hex = function(r,g,b) {
  return "#" + colorHex(r) + colorHex(g) + colorHex(b)
}

export const makeRGB = function (r, g, b) {
  r = Math.round(r)
  g = Math.round(g)
  b = Math.round(b)
  let n_r = r/255
  let n_g = g/255
  let n_b = b/255
  let max = Math.max(n_r, n_g, n_b),
    min = Math.min(n_r, n_g, n_b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case n_r:
        h = (n_g - n_b) / d + (n_g < n_b ? 6 : 0);
        break;
      case n_g:
        h = (n_b - n_r) / d + 2;
        break;
      case n_b:
        h = (n_r - n_g) / d + 4;
        break;
    }
    h /= 6;
  }
  h *= 360
  let hex = rgb2hex(r,g,b)
  return { hsl: { h, s, l }, rgba: { r, g, b }, hex }
}

export const makeHSL = function (h, s, l) {
  h /=360
  s = clamp(s, 0, 1)
  l = clamp(l, 0, 1)
  let r, g, b
  if (s == 0) {
    r = g = b = l // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)
  let hex = rgb2hex(r,g,b)
  h *= 360
  return { hsl: { h, s, l }, rgba: { r, g, b }, hex }
}

const colorComplement = function (c) {
  let h = c.hsl.h
  return makeHSL(h > 180 ? (h - 180) : (h + 180), c.hsl.s, c.hsl.l)
}

const isCool = function (c) {
  return c.hsl.h < 300 && c.hsl.h > 120
}

const isHighKey = function (c) {
  return c.hsl.h > 30 && c.hsl.h < 140
}

const isHighestKey = function (c) {
  return c.hsl.h > 30 && c.hsl.h < 90
}

const harmonyMix = function (c1, c2) {
  if (isCool(c1)) {
    if (isHighKey(c2)) {
      return mixColor(c1, c2, 11)
    } else {
      return mixColor(c1, c2, 16)
    }
  } else {
    if (isHighKey(c2)) {
      return mixColor(c1, c2, 13)
    } else {
      return mixColor(c1, c2, 23)
    }
  }
}

const neutralMix = function (c) {
  let comp = colorComplement(c)
  if (isHighestKey(c)) {
    if (isHighKey(comp)) {
      return mixColor(comp, c, 19)
    } else {
      return mixColor(comp, c, 13)
    }
  } else if (isHighKey(c)) {
    if (isHighKey(comp)) {
      return mixColor(comp, c, 31)
    } else {
      return mixColor(comp, c, 23)
    }
  } else {
    if (isHighestKey(comp)) {
      return mixColor(comp, c, 31)
    } else if (isHighKey(comp)) {
      return mixColor(comp, c, 26)
    } else {
      return mixColor(comp, c, 23)
    }
  }
}

const neutralDesaturate = function(c) {
  let comp = colorComplement(c)
  let h = c.hsl.h
  let s = c.hsl.s
  let l = c.hsl.l
  if (isHighestKey(c)) {
    if (isHighKey(comp)) {
      return makeHSL(h,s*0.81,l)
    } else {
      return makeHSL(h,s*0.87,l)
    }
  } else if (isHighKey(c)) {
    if (isHighKey(comp)) {
      return makeHSL(h,s*0.69,l)
    } else {
      return makeHSL(h,s*0.77,l)
    }
  } else {
    if (isHighestKey(comp)) {
      return makeHSL(h,s*0.69,l)
    } else if (isHighKey(comp)) {
      return makeHSL(h,s*0.74,l)
    } else {
      return makeHSL(h,s*0.77,l)
    }
  }
}

const neutralSaturate = function(c) {
  let comp = colorComplement(c)
  let h = c.hsl.h
  let s = c.hsl.s
  let l = c.hsl.l
  if (isHighestKey(c)) {
    if (isHighKey(comp)) {
      return makeHSL(h,s*1.19,l)
    } else {
      return makeHSL(h,s*1.13,l)
    }
  } else if (isHighKey(c)) {
    if (isHighKey(comp)) {
      return makeHSL(h,s*1.31,l)
    } else {
      return makeHSL(h,s*1.23,l)
    }
  } else {
    if (isHighestKey(comp)) {
      return makeHSL(h,s*1.31,l)
    } else if (isHighKey(comp)) {
      return makeHSL(h,s*1.26,l)
    } else {
      return makeHSL(h,s*1.23,l)
    }
  }
}

const genColorMods = function(c, p, name) {
  let pal = {}
  pal[name+'-lighten'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * (1+p))
  pal[name+'-darken'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * (1-p))
  pal[name+'-saturate'] = neutralSaturate(c)
  pal[name+'-desaturate'] = neutralDesaturate(c)
  pal[name+'-tint'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * 1.5)
  pal[name+'-shade'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * 0.5)
  return pal
}
export const genPalette = function (c, colorAngle) {
  let p = colorAngle / 100
  let palette = {}
  let comp = colorComplement(c)
  palette['primary-base'] = c
  palette['secondary-base'] = comp
  palette.primary = harmonyMix(comp, c)
  palette.secondary = harmonyMix(c, comp)
  palette['primary-neutral'] = neutralMix(palette.primary)
  palette['secondary-neutral'] = neutralMix(palette.secondary)
  let mods = Object.keys(palette).map((key, index)=> {
    return genColorMods(palette[key], p, key)
  })
  return Object.assign(palette, ...mods)
}

const makeColorRule = function(key, hex) {
  let selector = "." + key.split('-').join('.')
  return `${selector} {background-color: ${hex}}`
}

export const genCSS = function (c) {
  let rules = Object.keys(c).map((key, val)=> {
    return makeColorRule(key, c[key].hex)
  })
  return rules.join("\n") + `

.black {
  background-color: #2b2b2b;
  color: #f2f2f2
}
.black.lighten {background-color: #363636}
.black.darken {background-color: #292929}
.black.tint {background-color: #353535}
.black.shade {background-color: #282828}

.white {
    background-color: #f2f2f2;
    color: #2b2b2b
}
.white.lighten {background-color: #f4f4f4}
.white.darken {background-color: #cecece}
.white.tint {background-color: #f5f5f5}
.white.shade {background-color: #a9a9a9}

.primary-text {color: ${c['primary'].hex}}
.primary-lighten-text {color: ${c['primary-lighten'].hex}}
.primary-darken-text {color: ${c['primary-darken'].hex}}
.primary-saturate-text {color: ${c['primary-saturate'].hex}}
.primary-desaturate-text {color: ${c['primary-desaturate'].hex}}
.primary-tint-text {color: ${c['primary-tint'].hex}}
.primary-shade-text {color: ${c['primary-shade'].hex}}

.secondary-text {color: ${c['secondary'].hex}}
.secondary-lighten-text {color: ${c['secondary-lighten'].hex}}
.secondary-darken-text {color: ${c['secondary-darken'].hex}}
.secondary-saturate-text {color: ${c['secondary-saturate'].hex}}
.secondary-desaturate-text {color: ${c['secondary-desaturate'].hex}}
.secondary-tint-text {color: ${c['secondary-tint'].hex}}
.secondary-shade-text {color: ${c['secondary-shade'].hex}}

.black-text {color: #2b2b2b}

.white-text {color: #f2f2f2}
`
}

export const attachPalette = function(p) {
  let tag = document.getElementById('color')
  if (!tag) {
    console.error("Missing style tag to insert!")
    return
  }
  tag.textContent = genCSS(p)
}
