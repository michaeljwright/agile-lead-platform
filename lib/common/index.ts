import { format } from 'date-fns'

export const capitalizeFirstLetter = (string: string | undefined | null) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : string
}

export const formatDate = (date: any) => {
  const dateFormat = date?.seconds ? new Date(date?.seconds * 1000) : null
  return dateFormat ? format(dateFormat, 'iii do MMM yyyy') : null
}
