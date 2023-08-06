import React from 'react'
import classNames from 'classnames'

export interface ICard {
  id: number
  emoji: string
  isFaceUp: boolean
  isMatched: boolean
}

export interface IProps extends ICard {
  onClick(): void
}

export const Card = React.memo(({ emoji, isMatched, isFaceUp, onClick }: IProps) => {
  return (
    <button
      type='button'
      className={classNames(`relative block bg-transparent transition-opacity perspective`, {
        'pointer-events-none': isMatched,
        'opacity-0': isMatched
      })}
      onClick={onClick}
    >
      <div
        className={classNames(`relative z-10 w-40 h-40 bg-violet-800 border-zinc-300	rounded-lg backface-hidden transition-transform`, {
          '-rotate-y-180': isFaceUp
        })}
      >
        {emoji}
      </div>

      <div
        className={classNames(`absolute inset-0 z-0 bg-violet-800 border-zinc-300 rounded-lg transition-transform`, {
          '-rotate-y-180': isFaceUp
        })}
      />
    </button>
  )
})
