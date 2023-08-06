import React from 'react'
import classNames from 'classnames'

export interface IProps {
  count: number
}

export function FlipCounter({ count }: IProps) {
  return (
    <div>
      {count}
    </div>
  )
}
