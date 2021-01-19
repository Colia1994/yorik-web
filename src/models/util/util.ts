export const getPrice = (price: number) => {
  const postPrice = price % 100

  const dolar = Math.floor(price / 100)

  return `${dolar}${postPrice !== 0 ? `.${postPrice}` : ''}`
}
