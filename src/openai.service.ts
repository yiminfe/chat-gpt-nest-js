import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { EventEmitter } from 'events'
import { chatPath } from '@/constants/openai.constants'
import { OpenAiDto } from '@/dtos/openai.dto'

@Injectable()
export class OpenAiService {
  constructor(private readonly httpService: HttpService) {}

  async createChatCompletion(openAiDao: OpenAiDto) {
    const { messages } = openAiDao

    const eventEmitter = new EventEmitter()

    try {
      const { data } = await this.httpService.axiosRef.post(
        chatPath,
        {
          model: 'gpt-3.5-turbo',
          messages,
          stream: true
        },
        {
          responseType: 'stream'
        }
      )

      data.on('data', chunk => {
        eventEmitter.emit('data', chunk)
      })

      data.on('end', () => {
        eventEmitter.emit('end')
      })

      data.on('error', error => {
        throw error
      })
    } catch (error) {
      throw error
    }

    return {
      eventEmitter
    }
  }
}
