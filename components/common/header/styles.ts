import { styled, keyframes } from 'stitches.config'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Separator from '@radix-ui/react-separator'

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translateX(100%)' },
  '100%': { opacity: 1, transform: 'translateX(0)' }
})

export const Header = styled('header', {
  zIndex: 999999999,
  width: '100%',
  height: '105px',
  backdropFilter: 'blur(5px)',
  background: '$background',
  position: 'sticky',
  top: 0,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  '@media only screen and (max-width: 600px)': { height: 'none' }
})

export const Root = styled(AlertDialog.Root, {
  width: '100%'
})

export const Portal = styled(AlertDialog.Portal, {
})

export const Overlay = styled(AlertDialog.Overlay, {
  position: 'fixed',
  inset: 0,
  backdropFilter: 'blur(5px)'
})

export const Trigger = styled(AlertDialog.Trigger, {
  fontSize: '14px'
})

export const Cancel = styled(AlertDialog.Cancel, {})

export const Content = styled(AlertDialog.Content, {
  backgroundColor: 'tomato',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: 0,
  right: 0,
  width: '70%',
  height: '100vh',
  animation: `${contentShow} 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
  background: '$background',
  padding: '1rem',

  '&:focus': {
    outline: 'none'
  }

})

export const List = styled('ul', {
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
})

export const Navigation = styled('nav', {
  display: 'flex',
  alignItems: 'center',

  ul: {
    display: 'flex',
    gap: '1rem',

    li: {
      '&:hover': {
        color: '$heading',
        cursor: 'pointer'
      }
    }
  }
})

export const SubHeader = styled('div', {
  zIndex: 999999999,
  padding: '0.3rem 1rem',
  display: 'inline-block',
  position: 'absolute',
  top: '64px',
  left: '0',
  marginBottom: '20px',
  width: '100%',
  height: '37px',
  background: '#F2F3F4',
  borderTop: '1px solid #e9e6d7',
  borderBottom: '1px solid #F0EEE4'
})

export const NavContainer = styled('div', {
  width: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '2rem',

  '@laptops-max': {
    display: 'none'
  }
})

export const SeparatorRoot = styled(Separator.Root, {
  backgroundColor: '#D3D3D3',
  margin: '15px 0',
  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1, margin: '0 15px' }
})

export const ResponiveQuickMenu = styled('div', {
  display: 'inline-block',
  '@media only screen and (max-width: 600px)': { display: 'none' }
})
