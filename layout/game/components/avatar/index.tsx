import Image from 'next/image'

import { Typography } from 'components/common'
import * as Styles from './styles'
import { AvatarProps } from './types'

export function Avatar (props: AvatarProps) {
  const {
    alt,
    src,
    size = 40,
    disabled = false
  } = props

  const renderAlt = () => {
    if (src) return null
    const lastPosition = alt.lastIndexOf(' ')

    const alternativeText = alt.substring(lastPosition + 1, lastPosition + 2)

    return (
      <Typography color="background">{alternativeText}</Typography>
    )
  }

  const renderImage = () => {
    if (!src) return null

    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ borderRadius: '50%' }}
      />
    )
  }

  return (
    <Styles.Container style={{ width: size, height: size, background: !disabled ? '#000000' : '#F2F3F4' }}>
      {renderAlt()}
      {renderImage()}
    </Styles.Container>
  )
}
