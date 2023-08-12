export interface IProps {
  count: number
}

export function FlipsCounter({ count }: IProps) {
  return (
    <div className='text-xl'>
      Количество переворотов: {count}
    </div>
  )
}
