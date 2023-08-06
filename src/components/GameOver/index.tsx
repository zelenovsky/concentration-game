import React from 'react'
import classNames from 'classnames'

export interface IProps {
  onClick(): void
}

export function GameOver({ onClick }: IProps) {
  return (
    <button
      type='button'
      onClick={onClick}
    >
      Играть снова
    </button>
  )
}
