import React from 'react'

export interface ICard {
  id: number
  emoji: string
}

export interface IProps extends ICard {
  onClick(): void
}

export const Card = React.memo(({ emoji, onClick }: IProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
    >
      {emoji}
    </button>
  )
})
