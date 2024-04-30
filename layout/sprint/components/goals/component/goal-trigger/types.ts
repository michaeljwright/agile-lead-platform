import React from 'react'

export interface GoalTriggerProps {
  setGoalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  onclick?: () => void,
  variant?: string
}
