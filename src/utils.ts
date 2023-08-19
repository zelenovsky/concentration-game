const idsFactory = (): () => number => {
  let count = 0
  return () => {
    count += 1
    return count
  }
}

export const generateId = idsFactory()

export const randomChoice = (choices: string[]): string => {
  const rand = Math.random() * choices.length
  const indexToRemove = Math.floor(rand)
  return choices.splice(indexToRemove, 1)[0]
}

export const shuffle = <T>(arr: T[]): T[] => {
  const a = arr.slice()
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}

export const pause = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
