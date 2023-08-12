import React from 'react'
import classNames from 'classnames'

export interface ICard {
  id: number
  emoji: string
  isFaceUp: boolean
  isMatched: boolean
  isFailure: boolean
}

export interface IProps extends ICard {
  onClick(): void
}

export const Card = React.memo(({ emoji, isMatched, isFaceUp, isFailure, onClick }: IProps) => {
  return (
    <button
      type='button'
      className={classNames(`relative block w-52 h-60 transition-opacity duration-300 perspective`, {
        'pointer-events-none': isMatched,
        'opacity-60': isMatched,
        'animate-shake': isFailure
      })}
      onClick={onClick}
    >
      <div
        className={classNames(`absolute inset-0 z-10 flex items-center justify-center text-6xl bg-gray-300 border-2 border-gray-700 rounded-lg transition-transform duration-300 -rotate-y-180 backface-hidden`, {
          '-rotate-y-360': isMatched || isFaceUp
        })}
      >
        {emoji}
      </div>

      <div
        className={classNames(`absolute inset-0 z-0 bg-gray-300 border-2 border-gray-700 rounded-lg transition-transform duration-300`, {
          '-rotate-y-180': isMatched || isFaceUp
        })}
      />
    </button>
  )
})
