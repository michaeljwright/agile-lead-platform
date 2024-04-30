import { styled, keyframes } from 'stitches.config'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8)' },
  '100%': { opacity: 1, transform: 'scale(1)' }
})

export const Overlay = styled(AlertDialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} backward 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  backdropFilter: 'blur(5px)',
  filter: 'grayscale(100%)'
})

export const OverlayGray = styled('div', {
  width: '100%',
  height: '100%'
})

export const Root = styled(AlertDialog.Root, {
})

export const Portal = styled(AlertDialog.Portal, {
})

export const Trigger = styled(AlertDialog.Trigger, {})

export const Cancel = styled(AlertDialog.Cancel, {})

export const Content = styled(AlertDialog.Content, {
  backgroundColor: '$foreground',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '450px',
  maxHeight: '85vh',
  width: '90vw',
  borderRadios: 0,
  animation: `${contentShow}  0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  '&:focus': {
    outline: 'none'
  }
})

export const Form = styled('form', {
  margin: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
})
