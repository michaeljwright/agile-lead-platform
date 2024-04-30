import React from 'react'

export interface IGoal {
  value: string
  id: string
}

export interface GoalProps {
  goalOpen: boolean,
  setGoalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
