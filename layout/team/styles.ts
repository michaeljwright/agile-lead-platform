import { styled, keyframes } from 'stitches.config'
import * as Dialog from '@radix-ui/react-dialog'
import * as Separator from '@radix-ui/react-separator'
import * as Switch from '@radix-ui/react-switch'
import { Text } from '@radix-ui/themes'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const CustomBadge = styled('div', {
  padding: '6px 8px',
  marginLeft: '8px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 400,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 11,
  color: '$heading',
  background: '#F2F3F4',
  border: '1px solid #D3D3D3'
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

export const HiddenText = styled(Text, {
  display: 'block',
  fontSize: 12,
  '@media only screen and (max-width: 600px)': { display: 'none' }
})

export const ShowText = styled(Text, {
  fontSize: 12,
  '@media only screen and (max-width: 600px)': { fontSize: 10, textWrap: 'balance' }
})

export const SwitchRoot = styled(Switch.Root, {
  marginLeft: '10px',
  width: 26,
  height: 16,
  backgroundColor: '#464646',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: '0 0 0 2px #464646',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: '0 0 0 2px #464646' },
  '&[data-state="checked"]': { backgroundColor: '#464646' },
  '&[data-state="unchecked"]': { backgroundColor: '#AAAAAA', boxShadow: '0 0 0 2px #AAAAAA' }
})

export const SwitchThumb = styled(Switch.Thumb, {
  display: 'block',
  width: 12,
  height: 12,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: '0 2px 2px $heading',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(12px)' }
})

export const Indicator = styled(Text, {
  display: 'inline-block',
  margin: '0 0 0 -4px !important',
  fontSize: 11
})
