import { EIRequest } from './base'
import { SourceSDK } from './source-sdk'

export const eiRequest = EIRequest.createRequest()
export const sourceSDK = new SourceSDK(eiRequest)
