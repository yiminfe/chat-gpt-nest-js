import { AxiosRequestConfig } from 'axios'

const OPENAI_API_KEY = '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'

export const openAiRequestConfig: AxiosRequestConfig = {
  baseURL: 'https://api.openai.com/',
  headers: {
    'content-type': 'application/json',
    accept: 'text/event-stream',
    Authorization: `Bearer ${OPENAI_API_KEY}`
  }
}

export const chatPath = 'v1/chat/completions'
