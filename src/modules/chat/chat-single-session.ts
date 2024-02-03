import { Logger } from '@nestjs/common';
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage,
} from '@langchain/core/messages';
import { v4 as uuidv4 } from 'uuid';

export class ChatSingleSession {
  private readonly logger: Logger = new Logger(ChatSingleSession.name);
  readonly uuid: string;
  readonly sessionName: string;
  chatHistory: BaseMessage[];

  constructor(systemMessage: string, sessionName: string) {
    this.uuid = uuidv4();
    this.sessionName = sessionName;
    this.chatHistory = [];

    this.addSystemMessage(systemMessage);
  }

  private addSystemMessage(message: string) {
    this.chatHistory.push(new SystemMessage(message));
  }

  addSingleMessage(message: string) {
    this.logger.log(`ChatSingleSession message: ${message}`);
    this.chatHistory = this.chatHistory.slice(0, 1);
    this.chatHistory.push(new HumanMessage(message));
  }
}
