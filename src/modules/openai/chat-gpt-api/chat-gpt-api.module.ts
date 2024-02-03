import { Module } from '@nestjs/common';
import { ChatGptApiService } from './chat-gpt-api.service';
import { ChatGptApiController } from './chat-gpt-api.controller';

@Module({
  exports: [ChatGptApiService],
  providers: [ChatGptApiService],
  controllers: [ChatGptApiController],
})
export class ChatGptApiModule {}
