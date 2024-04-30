import { Button } from 'components/common'

export const WasteTrigger = (props: any) => {
  const variantButton = props.variant || null

  return (
    <>
      {(!variantButton && (
        <a onClick={() => props.setWasteOpen(true)}>
          Manage Waste
        </a>
      )) || (
        <Button onClick={() => props.setWasteOpen(true)}>Manage Waste</Button>
      )}
    </>
  )
}
