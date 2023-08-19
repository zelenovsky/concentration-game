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
      className='relative block w-52 h-60 transition-opacity duration-300 perspective'
      onClick={onClick}
    >
      {emoji}
    </button>
  )
})
