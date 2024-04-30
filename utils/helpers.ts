export function setMask (value: string | number, pattern: string) {
  let i = 0
  const valueInString = String(value).replace(/\D/g, '')

  // eslint-disable-next-line no-plusplus
  return pattern.replace(/#/g, () => valueInString[i++] || '')
}

export const resolvePath = (path: string, obj: Record<string, any>) => {
  let tempPath = path

  Object.keys(obj).map(key => (tempPath = tempPath.replace(`:${key}`, obj[key])))

  return tempPath
}

export const isBrowser = () => typeof window !== 'undefined'
