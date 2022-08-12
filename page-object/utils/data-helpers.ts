export async function getRandomNumber(min: number, max: number): Promise<number> {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function getRandomString(length: number): Promise<string> {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
