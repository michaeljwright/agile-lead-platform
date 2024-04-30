import { ComponentProps, CSSProperties, ReactNode } from 'react'

import { Container } from './styles'

type ViewStyle = Pick<
  CSSProperties,
  | 'alignSelf'
  | 'alignContent'
  | 'flex'
  | 'marginBottom'
  | 'marginRight'
  | 'marginLeft'
  | 'marginTop'
  | 'backgroundColor'
>;

interface BoxProps extends ViewStyle, ComponentProps<typeof Container> {
  children: ReactNode;
  fullWidth?: boolean;
  gap?: number;
}

export function Box (props: BoxProps) {
  const {
    children,
    fullWidth,
    gap,
    marginTop,
    justifyContent,
    flexDirection,
    alignItems,
    ...otherProps
  } =
    props

  return (
    <Container
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      style={{
        ...otherProps,
        display: 'flex',
        width: fullWidth ? '100%' : 'auto',
        ...(gap && { gap: `${gap}rem` }),
        ...(marginTop && { marginTop: `${marginTop}rem` })
      }}
    >
      {children}
    </Container>
  )
}
