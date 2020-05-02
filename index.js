const editly = require('editly')
const fontData = require('./assets/Manjari.json')

const baseConf = {
  outPath: './output.mp4',
  audioFilePath: './assets/Power_Shutoff.loop.mp3',
  fps: 50,
  width: 1280,
  height: 720,
  defaults: {
    transition: null,
    layer: {
      fontPath: './assets/Manjari-Regular.otf'
    }
  },
  clips: []
}

function createSpec () {
  const spec = baseConf

  for (const index in fontData.glyphs) {
    const clipTemplate = {
      duration: 1,
      layers: [
        {
          type: 'image',
          path: './assets/background.png',
          transition: null
        },
        {
          type: 'title',
          text: '???'
        },
        { type: 'subtitle', text: '???', transition: null }
      ]
    }
    const glyph = fontData.glyphs[index]
    const clip = Object.assign({}, clipTemplate)
    if (!glyph.value) { continue };
    clip.layers[1].text = glyph.value + '\n'
    if (glyph.class === 'ligature') {
      clip.layers[2].text = `${glyph.name} ${glyph.mlsequence || ''} `
    } else {
      clip.layers[2].text = `${glyph.name} ${glyph.code || ''} `
    }
    spec.clips.push(clip)
  }
  return spec
}

function main () {
  const spec = createSpec()
  editly(spec)
    .catch(console.error)
}

main()
