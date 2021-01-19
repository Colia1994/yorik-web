import { RemoteErrorSymbol } from './module'

export function getXhrBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export function isValidSymbol(symbol: RemoteErrorSymbol) {
  return typeof symbol === 'number' || typeof symbol === 'string'
}
