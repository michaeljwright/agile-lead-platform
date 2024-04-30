import { memo } from 'react'
import { theme } from 'stitches.config'
import { icons } from './icons'
import { IconProps } from './types'

function BaseIcon (props: IconProps) {
  const { name, color, customColor, ...otherProps } = props

  const Component = icons?.[name]

  const fill = customColor || (color && theme?.colors[color].value)

  return (
    <Component
      size={20}
      {...otherProps}
      style={{
        ...(fill && { fill })
      }}
    />
  )
}

export const Icon = memo(BaseIcon)
