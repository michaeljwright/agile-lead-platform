import { Head } from 'components/common/head'
import { NewGameLayout } from 'layout/new-game'

export default function NewGamePage () {
  return (
    <>
      <Head
        title="Create a new scrum poker game"
      />
      <NewGameLayout />
    </>
  )
}
