import React from 'react'
import classNames from 'classnames'
import { generateId, randomChoice, shuffle, pause } from './utils'
import emojis from './emojis'
import { NUMBER_OF_PAIRS, TRANSITION_TIME } from './constants'
import { Card } from './components/Card'
import { FlipsCounter } from './components/FlipCounter'
import { GameOver } from './components/GameOver'

import type { ICard } from './components/Card'

export function App() {
  const [cards, setCards] = React.useState<ICard[]>([])
  const [facedUpCard, setFacedUpCard] = React.useState<ICard | null>(null)
  const [isLocked, setLock] = React.useState<boolean>(false)
  const [flipsCount, setFlipsCount] = React.useState<number>(0)
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false)
  const totalMatchedCount = React.useRef<number>(0)

  const chooseCard = async (currentCard: ICard) => {
    // click to current open card
    if (facedUpCard && facedUpCard.id === currentCard.id) return

    setFlipsCount(flipsCount + 1)

    // first time open card
    if (!facedUpCard) {
      setFacedUpCard(currentCard)
      setCards(cards.map(card => {
        if (card.id === currentCard.id) return { ...card, isFaceUp: true }
        return card
      }))
    }

    // second time open card - matched
    if (facedUpCard && facedUpCard.emoji === currentCard.emoji) {
      setLock(true)
      setFacedUpCard(null)
      totalMatchedCount.current += 1

      setCards(cards.map(card => {
        if (card.id === currentCard.id) return { ...card, isFaceUp: true }
        return card
      }))

      await pause(TRANSITION_TIME)

      setCards(cards.map(card => {
        if (card.id === facedUpCard.id) return { ...card, isMatched: true }
        if (card.id === currentCard.id) return { ...card, isMatched: true, isFaceUp: true }
        return { ...card, isFaceUp: false }
      }))

      if (totalMatchedCount.current === NUMBER_OF_PAIRS) {
        setIsGameOver(true)
      }

      setLock(false)
    }

    // second time open card - unmatched
    if (facedUpCard && facedUpCard.emoji !== currentCard.emoji) {
      setLock(true)
      setFacedUpCard(null)

      setCards(cards.map(card => {
        if (card.id === currentCard.id) return { ...card, isFaceUp: true }
        return card
      }))

      await pause(TRANSITION_TIME)

      setCards(cards.map(card => {
        if (card.id === facedUpCard.id) return { ...card, isFailure: true }
        if (card.id === currentCard.id) return { ...card, isFaceUp: true, isFailure: true }
        return card
      }))

      await pause(TRANSITION_TIME)

      setCards(cards.map(card => ({ ...card, isFaceUp: false, isFailure: false })))
      setLock(false)
    }
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
