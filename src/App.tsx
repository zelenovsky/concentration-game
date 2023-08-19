import React from 'react'
import { Card } from './components/Card'
import { FlipsCounter } from './components/FlipCounter'
import { GameOver } from './components/GameOver'

import type { ICard } from './components/Card'

export function App() {
  const [cards] = React.useState<ICard[]>([])
  const [flipsCount] = React.useState<number>(0)
  const [isGameOver] = React.useState<boolean>(false)

  const createCards = () => {
    // write code here
  }

  const handleCardClick = () => {
    // write code here
  }

  const handlePlayAgain = () => {
    // write code here
  }

  React.useEffect(createCards, [])

  return (
    <div className='flex flex-col items-center justify-center gap-5 min-h-screen py-6'>
      <FlipsCounter count={flipsCount} />

      {isGameOver && <GameOver onClick={handlePlayAgain} />}

      <div className='grid grid-cols-3 lg:grid-cols-4 gap-6'>
        {cards.map(card => (
          <Card
            key={card.id}
            {...card}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  )
}
