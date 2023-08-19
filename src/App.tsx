import React from 'react'
import classNames from 'classnames'
import { generateId, randomChoice, shuffle } from './utils'
import emojis from './emojis'
import { NUMBER_OF_PAIRS } from './constants'
import { Card } from './components/Card'
import { FlipsCounter } from './components/FlipCounter'
import { GameOver } from './components/GameOver'

import type { ICard } from './components/Card'

export function App() {
  const [cards, setCards] = React.useState<ICard[]>([])
  const [isLocked] = React.useState<boolean>(false)
  const [flipsCount, setFlipsCount] = React.useState<number>(0)
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false)

  const chooseCard = (currentCard: ICard) => {
    // write code here
  }

  const createCards = () => {
    let tempCards: ICard[] = []

    Array.from(Array(NUMBER_OF_PAIRS)).forEach(() => {
      const newCard: Omit<ICard, 'id'> = {
        emoji: randomChoice(emojis),
        isFaceUp: false,
        isMatched: false,
        isFailure: false
      }
      tempCards = [...tempCards, { ...newCard, id: generateId() }, { ...newCard, id: generateId() }]
    })

    setCards(shuffle(tempCards))
  }

  const handleCardClick = (card: ICard) => () => {
    chooseCard(card)
  }

  const handlePlayAgain = () => {
    setIsGameOver(false)
    setFlipsCount(0)
    createCards()
  }

  React.useEffect(createCards, [])

  return (
    <div className='flex flex-col items-center justify-center gap-5 min-h-screen py-6'>
      <FlipsCounter count={flipsCount} />

      {isGameOver && <GameOver onClick={handlePlayAgain} />}

      <div className={classNames('grid grid-cols-3 lg:grid-cols-4 gap-6', {
        'pointer-events-none': isLocked
      })}>
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            onClick={handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  )
}
