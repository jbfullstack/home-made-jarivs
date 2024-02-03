import { Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage } from '@langchain/core/messages';

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class ChatOpenaiConnectorService {
  private readonly logger: Logger = new Logger(ChatOpenaiConnectorService.name);
  private readonly chat: ChatOpenAI;

  constructor() {
    // create a new instance of the chat model
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  // retrieve messages from the chat model
  async predictMessages(messages: BaseMessage[]) {
    return this.chat.invoke(messages);
  }
}
