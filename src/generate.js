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

const makeRGB = function (r, g, b) {
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

const makeHSL = function (h, s, l) {
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

export const genPalette = function (c, colorAngle) {
  let p = colorAngle / 100
  let palette = {}
  let comp = colorComplement(c)
  palette.basePri = c
  palette.baseSec = comp
  palette.harmPri = harmonyMix(comp, c)
  palette.harmSec = harmonyMix(c, comp)
  palette.pri = neutralMix(palette.harmPri)
  palette.sec = neutralMix(palette.harmSec)
  palette['pri-base'] = palette.basePri
  palette['pri-lighten'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * (1+p))
  palette['pri-darken'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * (1-p))
  palette['pri-saturate'] = neutralSaturate(c)
  palette['pri-desaturate'] = neutralDesaturate(c)
  palette['pri-tint'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * 1.5)
  palette['pri-shade'] = makeHSL(c.hsl.h, c.hsl.s, c.hsl.l * 0.5)

  palette['sec-base'] = palette.baseSec
  palette['sec-lighten'] = makeHSL(comp.hsl.h, comp.hsl.s, comp.hsl.l * (1+p))
  palette['sec-darken'] = makeHSL(comp.hsl.h, comp.hsl.s, comp.hsl.l * (1-p))
  palette['sec-saturate'] = neutralSaturate(comp)
  palette['sec-desaturate'] = neutralDesaturate(comp)
  palette['sec-tint'] = makeHSL(comp.hsl.h, comp.hsl.s, comp.hsl.l * 1.5)
  palette['sec-shade'] = makeHSL(comp.hsl.h, comp.hsl.s, comp.hsl.l * 0.5)
  return palette
}

export const genCSS = function (c) {
  return `
.primary {background-color: ${c['pri'].hex}}
.primary.base {background-color: ${c['pri-base'].hex}}
.primary.lighten {background-color: ${c['pri-lighten'].hex}}
.primary.darken {background-color: ${c['pri-darken'].hex}}
.primary.saturate {background-color: ${c['pri-saturate'].hex}}
.primary.desaturate {background-color: ${c['pri-desaturate'].hex}}
.primary.tint {background-color: ${c['pri-tint'].hex}}
.primary.shade {background-color: ${c['pri-shade'].hex}}

.secondary {background-color: ${c['sec'].hex}}
.secondary.base {background-color: ${c['sec-base'].hex}}
.secondary.lighten {background-color: ${c['sec-lighten'].hex}}
.secondary.darken {background-color: ${c['sec-darken'].hex}}
.secondary.saturate {background-color: ${c['sec-saturate'].hex}}
.secondary.desaturate {background-color: ${c['sec-desaturate'].hex}}
.secondary.tint {background-color: ${c['sec-tint'].hex}}
.secondary.shade {background-color: ${c['sec-shade'].hex}}

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

.pri-text {color: ${c['pri'].hex}}
.pri-lighten-text {color: ${c['pri-lighten'].hex}}
.pri-darken-text {color: ${c['pri-darken'].hex}}
.pri-saturate-text {color: ${c['pri-saturate'].hex}}
.pri-desaturate-text {color: ${c['pri-desaturate'].hex}}
.pri-tint-text {color: ${c['pri-tint'].hex}}
.pri-shade-text {color: ${c['pri-shade'].hex}}

.sec-text {color: ${c['sec'].hex}}
.sec-lighten-text {color: ${c['sec-lighten'].hex}}
.sec-darken-text {color: ${c['sec-darken'].hex}}
.sec-saturate-text {color: ${c['sec-saturate'].hex}}
.sec-desaturate-text {color: ${c['sec-desaturate'].hex}}
.sec-tint-text {color: ${c['sec-tint'].hex}}
.sec-shade-text {color: ${c['sec-shade'].hex}}

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
