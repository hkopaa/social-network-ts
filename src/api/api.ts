import axios from 'axios'
import { UserType } from '../types/types'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'API-KEY': '8b67ea7c-486e-489a-bd55-a10ed40c1a9c' },
})

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
