import React from 'react'

export interface IssueTriggerProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onclick?: () => void,
  variant?: string
}
