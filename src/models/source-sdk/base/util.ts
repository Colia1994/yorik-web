import { EIRequestConfig, EIRequestCustomConfig, EnvType } from './type'

export function deepMergeConfig(original: EIRequestConfig, custom: EIRequestCustomConfig) {
  let newConfig = { ...original }
  Object.keys(custom).forEach((key: EnvType) => {
    newConfig = Object.assign({}, newConfig, { [key]: { ...newConfig[key], ...custom[key] } })
  })

  return newConfig
}
