import { Module } from '@nestjs/common';
import { ChatOpenaiConnectorService } from './chat-openai-connector.service';

@Module({
  providers: [ChatOpenaiConnectorService]
})
export class ChatOpenaiConnectorModule {}
