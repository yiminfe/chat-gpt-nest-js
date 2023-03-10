import { Module } from '@nestjs/common'
import { OpenAiService } from './openai.service'
import { OpenAiController } from './openai.controller'
import { HttpModule } from '@nestjs/axios'
import { openAiRequestConfig } from '@/constants/openai.constants'

@Module({
  imports: [HttpModule.register(openAiRequestConfig)],
  controllers: [OpenAiController],
  providers: [OpenAiService]
})
export class OpenAiModule {}
