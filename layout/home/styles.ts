import { styled } from 'stitches.config'
import * as Separator from '@radix-ui/react-separator'

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})

export const Container = styled('div', {
  height: '100vh'
})

export const Main = styled('main', {
  width: '100%'
})

export const Section = styled('section', {
  width: '100%',
  display: 'flex',
  minHeight: '43.75rem',
  alignItems: 'center',
  flexWrap: 'wrap'
})

export const Box = styled('div', {
  width: '100%',
  display: 'flex',
  padding: '0',
  flexWrap: 'wrap'
})

export const BoxLeft = styled('div', {
  flex: '50%',
  paddingRight: '25px',
  '@media only screen and (max-width: 1200px)': { flex: '100%', paddingRight: '0' },
  '@media only screen and (max-width: 600px)': { flex: '100%', marginTop: '0px' }
})

export const BoxRight = styled('div', {
  flex: '50%',
  width: '100%',
  alignItems: 'center',
  textAlign: 'center',
  '@media only screen and (max-width: 1200px)': { flex: '100%', marginTop: '40px' },
  '@media only screen and (max-width: 600px)': { display: 'none', flex: '100%', marginTop: '40px' }
})

export const Discovery = styled('div', {
  marginBottom: '50px',
  width: '100%',
  borderRadius: '10px',
  background: '#28282B',
  padding: '35px',
  h1: {
    fontSize: '42px',
    wordWrap: 'normal',
    color: '#FFFFFF',
    lineHeight: '3.6rem',
    marginBottom: '25px'
  },
  h2: {
    fontSize: '18px',
    color: '#FFFFFF',
    marginBottom: '5px',
    '@media only screen and (max-width: 600px)': { lineHeight: 'inherit', marginBottom: '5px' }
  }
})

export const Delivery = styled('div', {
  wordWrap: 'normal',
  width: '100%',
  borderRadius: '10px',
  background: '#F2F3F4',
  padding: '35px',
  h1: {
    fontSize: '42px',
    wordWrap: 'normal',
    lineHeight: '3.6rem',
    marginBottom: '25px'
  },
  h2: {
    fontSize: '18px',
    marginBottom: '5px',
    '@media only screen and (max-width: 600px)': { lineHeight: 'inherit', marginBottom: '5px' }
  }
})

export const Box1 = styled('div', {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '5rem 1rem',
  h1: {
    textAlign: 'center',
    fontSize: '$xlg',
    color: '$heading',

    '@laptops-min': {
      textAlign: 'left',
      maxWidth: '30rem'
    }
  },

  p: {
    textAlign: 'center',

    '@laptops-min': {
      textAlign: 'left',
      maxWidth: '30rem'

    }
  },
  '* >': {
    textAlign: 'center'
  },

  '@laptops-min': {
    padding: '1rem',
    height: '70%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center'
  }
})
