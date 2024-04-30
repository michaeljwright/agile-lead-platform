export interface WasteFormData {
  name: string
  type?: string[]
}

export interface AddWasteProps {}

export enum WasteType {
  meetings = 'Meetings',
  support = 'Support',
  discussion = 'Discussion',
  learning = 'Learning',
  knowledge = 'Knowledge',
  random = 'Random',
  waiting = 'Waiting',
  defects = 'Defects',
}
