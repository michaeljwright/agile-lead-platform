import { Button } from 'components/common'
import { IssueTriggerProps } from './types'

export const IssueTrigger = (props: IssueTriggerProps) => {
  const variantButton = props.variant || null

  return (
    <>
      {(!variantButton && (
        <a onClick={() => props.setOpen(true)} style={{ fontWeight: 'normal' }}>
          Manage Issues
        </a>
      )) || (
        <Button variant="letter" onClick={() => props.setOpen(true)}>Manage Issues</Button>
      )}
    </>
  )
}
