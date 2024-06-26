import { memo, ComponentProps, ButtonHTMLAttributes } from 'react'

import { Icon } from 'components/common'

import * as Styles from './styles'

type IconProps = ComponentProps<typeof Icon>
type RootButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>

interface ButtonIconProps extends RootButtonProps {
  icon: IconProps
  label: string
}

function BaseButtonIcon (props: ButtonIconProps) {
  const { icon, label, ...otherProps } = props

  return (
    <div style={{ display: 'inline-block', marginLeft: '5px' }}>
      <Styles.Button {...otherProps} aria-label={label}>
        <Icon {...icon} />
      </Styles.Button>
    </div>
  )
}

export const ButtonIcon = memo(BaseButtonIcon)
