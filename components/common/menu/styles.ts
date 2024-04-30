import { styled, keyframes } from 'stitches.config'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { BiChevronDown } from '@meronex/icons/bi'

const enterFromRight = keyframes({
  from: { transform: 'translateX(200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 }
})

const enterFromLeft = keyframes({
  from: { transform: 'translateX(-200px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 }
})

const exitToRight = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(200px)', opacity: 0 }
})

const exitToLeft = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(-200px)', opacity: 0 }
})

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 }
})

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 }
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 }
})

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 }
})

export const NavigationMenuRoot = styled(NavigationMenu.Root, {
  position: 'relative',
  display: 'flex',
  zIndex: 1
})

export const NavigationMenuList = styled(NavigationMenu.List, {
  display: 'flex',
  backgroundColor: 'white',
  padding: 4,
  borderRadius: 6,
  listStyle: 'none',
  boxShadow: '0 2px 10px $heading',
  margin: 0
})

export const itemStyles = {
  padding: '8px 12px',
  marginLeft: '8px',
  outline: 'none',
  userSelect: 'none',
  fontWeight: 600,
  lineHeight: 1,
  borderRadius: 4,
  fontSize: 12,
  color: '$heading',
  border: '1px solid #F0EEE4',
  '&:focus': { boxShadow: '0 0 0 2px $heading' },
  '&:hover': { backgroundColor: '#F2F3F4', color: '$heading', border: '1px solid #D3D3D3' },
  '>svg': { background: 'none', color: '$heading' }
}

export const NavigationMenuTrigger = styled(NavigationMenu.Trigger, {
  all: 'unset',
  ...itemStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2
})

export const NavigationMenuLinkHome = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 10,
  lineHeight: 1,
  '@media only screen and (max-width: 600px)': { display: 'none' }
})

export const NavigationMenuLink = styled(NavigationMenu.Link, {
  ...itemStyles,
  display: 'block',
  textDecoration: 'none',
  fontSize: 10,
  lineHeight: 1
})

export const NavigationMenuItem = styled(NavigationMenu.Item, {
  color: 'white'
})

export const NavigationMenuContent = styled(NavigationMenu.Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  '@media only screen and (min-width: 600px)': { width: 'auto' },
  animationDuration: '250ms',
  animationTimingFunction: 'ease',
  '&[data-motion="from-start"]': { animationName: enterFromLeft },
  '&[data-motion="from-end"]': { animationName: enterFromRight },
  '&[data-motion="to-start"]': { animationName: exitToLeft },
  '&[data-motion="to-end"]': { animationName: exitToRight }
})

export const NavigationMenuIndicator = styled(NavigationMenu.Indicator, {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  height: 10,
  top: '100%',
  overflow: 'hidden',
  zIndex: 1,
  transition: 'width, transform 250ms ease',
  '&[data-state="visible"]': { animation: `${fadeIn} 200ms ease` },
  '&[data-state="hidden"]': { animation: `${fadeOut} 200ms ease` }
})

export const NavigationMenuViewport = styled(NavigationMenu.Viewport, {
  position: 'relative',
  transformOrigin: 'top center',
  width: '100%',
  marginTop: 5,
  backgroundColor: 'white',
  borderRadius: 6,
  overflow: 'hidden',
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  height: 'var(--radix-navigation-menu-viewport-height)',
  transition: 'width, height, 300ms ease',
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease` },
  '@media only screen and (min-width: 600px)': {
    width: 'var(--radix-navigation-menu-viewport-width)'
  }
})

export const List = styled('ul', {
  display: 'inline-block',
  margin: 0,
  variants: {
    layout: {
      one: {
        '@media only screen and (min-width: 600px)': {
          width: 600
        }
      },
      two: {
        '@media only screen and (min-width: 600px)': {
          width: 600,
          gridAutoFlow: 'column'
        }
      }
    }
  },
  defaultVariants: {
    layout: 'one'
  }
})

export const ListItem = styled('li', {
  display: 'inline-block',
  fontSize: 12,
  borderRadius: 4,
  padding: '12px',
  borderBottom: '1px solid #F2F3F4',
  width: 600,
  '&:hover': { backgroundColor: '#F2F3F4', color: '$heading' }
})

export const ListItemLink = styled('a', {
  display: 'inline-block',
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  padding: 12,
  borderRadius: 6,
  lineHeight: 1,
  '&:focus': { boxShadow: '0 0 0 2px $heading' },
  '&:hover': { color: 'white' }
})

export const ListItemHeading = styled('div', {
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: 5,
  color: '$heading'
})

export const ListItemText = styled('p', {
  all: 'unset',
  color: '$heading',
  lineHeight: 1.4,
  fontWeight: 'initial'
})

export const Callout = styled('a', {
  display: 'flex',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  borderRadius: 6,
  padding: 25,
  textDecoration: 'none',
  outline: 'none',
  userSelect: 'none',
  '&:focus': { boxShadow: '0 0 0 2px $heading' }
})

export const CalloutHeading = styled('div', {
  color: 'white',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.2,
  marginTop: 16,
  marginBottom: 7
})

export const CalloutText = styled('p', {
  all: 'unset',
  color: '$heading',
  lineHeight: 1.3
})

export const ViewportPosition = styled('div', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  top: '35px',
  '@media only screen and (max-width: 600px)': { top: '100%' },
  left: 0,
  perspective: '2000px'
})

export const CaretDown = styled(BiChevronDown, {
  position: 'relative',
  color: '$heading',
  top: 1,
  '&:hover': { color: 'white' },
  transition: 'transform 250ms ease',
  '[data-state=open] &': { transform: 'rotate(-180deg)' }
})

export const Arrow = styled('div', {
  position: 'relative',
  top: '70%',
  backgroundColor: 'white',
  width: 10,
  height: 10,
  transform: 'rotate(45deg)',
  borderTopLeftRadius: 2
})

export const Item = styled('li', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
})
