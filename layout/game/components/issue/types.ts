import React from 'react'

export interface IIssue {
  value: string
  id: string
}

export interface IssueProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
