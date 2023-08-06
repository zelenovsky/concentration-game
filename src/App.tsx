import React from 'react'
import classNames from 'classnames'
import { generateId, randomChoice, shuffle, delay } from './utils'
import emojis from './emojis'
import { NUMBER_OF_PAIRS, TRANSITION_TIME } from './constants'
import { Card } from './components/Card'
import { FlipCounter } from './components/FlipCounter'
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

      await delay(TRANSITION_TIME)

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

      await delay(TRANSITION_TIME)

      setCards(cards.map(card => ({ ...card, isFaceUp: false })))
      setLock(false)
    }
  }

  const createCards = () => {
    let tempCards: ICard[] = []

    Array.from(Array(NUMBER_OF_PAIRS)).forEach(() => {
      const newCard: Omit<ICard, 'id'> = {
        emoji: randomChoice(emojis),
        isFaceUp: false,
        isMatched: false
      }
      tempCards = [...tempCards, { ...newCard, id: generateId() }, { ...newCard, id: generateId() }]
    })

    setCards(shuffle(tempCards))
  }

  const handleCardClick = (card: ICard) => () => {
    setFlipsCount(flipsCount + 1)
    chooseCard(card)
  }

  const handlePlayAgain = () => {
    setIsGameOver(false)
    setFlipsCount(0)
    createCards()
  }

  React.useEffect(createCards, [])

  return (
    <>
      <div className='min-h-screen py-5'>
        <FlipCounter count={flipsCount} />

        <div className={classNames('container grid grid-cols-3 gap-4', {
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

      {isGameOver && <GameOver onClick={handlePlayAgain} />}
    </>
  )
}
