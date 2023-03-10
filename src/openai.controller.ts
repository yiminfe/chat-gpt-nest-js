import { Controller, Post, Body, Header, Sse } from '@nestjs/common'
import { OpenAiService } from './openai.service'
import { OpenAiDto } from '@/dtos/openai.dto'
import { Observable } from 'rxjs'

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('chat')
  @Header('Content-Type', 'text/event-stream')
  @Sse()
  async createChat(@Body() openAiDao: OpenAiDto): Promise<Observable<string>> {
    const { eventEmitter } = await this.openAiService.createChatCompletion(
      openAiDao
    )

    return new Observable(observer => {
      // 监听 "response" 事件
      eventEmitter.on('data', chunk => {
        // 按照 text/event-stream 格式返回数据块
        observer.next(`__ai${chunk.toString()}`)
      })

      // 监听 "end" 事件
      eventEmitter.on('end', () => {
        // 关闭事件流
        observer.complete()
      })
    })
  }
}
