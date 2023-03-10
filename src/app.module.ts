import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OpenAiModule } from './openai.module'

@Module({
  imports: [OpenAiModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
