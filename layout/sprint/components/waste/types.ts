import React from 'react'

export interface IWaste {
  value: string
  id: string
}

export interface WasteProps {
  wasteOpen: boolean,
  setWasteOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
