import { createStitches } from '@stitches/react'

import {
  breakpoints,
  colors,
  fontSizes
} from 'constants/theme'

const { styled, globalCss: GlobalCss, getCssText, theme, css, keyframes, createTheme } = createStitches({
  theme: {
    colors,
    fontSizes,
    radii: {
      default: '5px'
    }
  },

  media: breakpoints
})

const globalStyle = GlobalCss({
  '*': {
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    color: '$text'
  },
  body: {
    backgroundColor: '$background',
    width: '100%',
    height: '100%'
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  h1: {
    fontWeight: '900',
    fontFamily: '$title',
    lineHeight: '4rem'
  },
  h2: {
    fontFamily: '$title',
    fontWeight: '800',
    lineHeight: '2.3rem'
  },
  p: {
    fontFamily: '$text',
    lineHeight: '2rem'
  },
  hr: {
    width: '100%',
    height: 1,
    background: '$lightGray',
    border: 'none'
  },
  li: {
    listStyle: 'none'
  },
  a: {
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none'
  }
})

export {
  styled,
  getCssText,
  theme,
  css,
  keyframes,
  createTheme,
  globalStyle
}
