import { theme } from 'stitches.config'
import { icons } from './icons'

export type IconNames = keyof typeof icons

export type Colors = keyof typeof theme['colors']

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: Colors;
  customColor?: string
}
