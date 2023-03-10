import { AxiosRequestConfig } from 'axios'

const OPENAI_API_KEY = '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'

export const openAiRequestConfig: AxiosRequestConfig = {
  baseURL: 'https://api.openai.com/',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`
  }
}

export const chatPath = 'v1/chat/completions'
