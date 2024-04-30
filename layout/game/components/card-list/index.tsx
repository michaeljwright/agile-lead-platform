
import { fibonacci } from 'constants/game'
import { useGame } from 'context/game'
import { updatePlayer } from 'lib/firestore'
import { memo } from 'react'

import * as Styles from './styles'

function BaseCardList () {
  const {
    game,
    player
  } = useGame()

  const handleVote = async (card: typeof fibonacci[0]) => {
    if (!game || !player) return

    await updatePlayer(game.id, player.id, {
      vote: card.value
    })
  }

  const renderCards = fibonacci?.map((card, index) => (
    <Styles.Card isSelected={card.value === player?.vote} key={index}>
      <Styles.Button
        disabled={player?.isSpectator}
        onClick={() => handleVote(card)}
      >{card.label}</Styles.Button>
    </Styles.Card>
  ))

  return (
    <Styles.List>{renderCards}</Styles.List>
  )
}

export const CardList = memo(BaseCardList)
