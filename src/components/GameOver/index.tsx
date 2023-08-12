export interface IProps {
  onClick(): void
}

export function GameOver({ onClick }: IProps) {
  return (
    <button
      className='px-4 py-2 font-semibold text-sm bg-blue-700 text-white rounded-lg shadow-sm'
      type='button'
      onClick={onClick}
    >
      Играть снова
    </button>
  )
}
