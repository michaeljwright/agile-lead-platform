import * as Styles from './styles'
import { ButtonIcon } from 'components/common'

export function Toast (props: any) {
  return (
    <Styles.ToastProvider swipeDirection="right">
      <Styles.ToastRoot open={props.open} onOpenChange={() => props.setOpenState(false)} onSwipeEnd={() => props.setOpenState(false)}>
        <Styles.ToastTitle>{props.title}</Styles.ToastTitle>
        <Styles.ToastDescription>
          {props.description}
        </Styles.ToastDescription>
        <ButtonIcon label="close" icon={{ name: 'close', color: 'background', size: 14 }} onClick={() => props.setOpenState(false)} />
      </Styles.ToastRoot>
      <Styles.ToastViewport className="ToastViewport" />
    </Styles.ToastProvider>
  )
}
