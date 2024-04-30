import { styled, keyframes } from 'stitches.config'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'
import { Text } from '@radix-ui/themes'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
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
  marginTop: '15px'
})

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 10,
  right: 10
})

export const Box = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: '0'
})

export const Box1 = styled('div', {
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  padding: '7rem 1rem',
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

export const DialogTrigger = styled(Dialog.Trigger, {
  margin: '0 8px'
})

export const DialogRoot = styled(Dialog.Root, {
  width: '100%'
})

export const DialogPortal = styled(Dialog.Portal, {
})

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: '$foreground',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`
})

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '&:focus': { outline: 'none' }
})

export const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: '$heading',
  fontSize: 17
})

export const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  fontSize: 15,
  lineHeight: 1.5
})

export const DialogClose = styled(Dialog.Close, {
})

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#F0EEE4',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 }
})

export const ShowText = styled(Text, {
  fontSize: 12,
  '@media only screen and (max-width: 600px)': { fontSize: 10, textWrap: 'balance' }
})
