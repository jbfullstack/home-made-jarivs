import { Logger } from '@nestjs/common';
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
  BaseMessage,
} from '@langchain/core/messages';
import { v4 as uuidv4 } from 'uuid';

export class ChatSession {
  private readonly logger: Logger = new Logger(ChatSession.name);
  readonly uuid: string;
  readonly sessionName: string;
  readonly username: string;
  readonly chatHistory: BaseMessage[];

  constructor(username: string, sessionName: string, systemMessage?: string) {
    this.uuid = uuidv4();
    this.username = username;
    this.sessionName = sessionName;
    this.chatHistory = [];

    if (systemMessage && systemMessage.length) {
      this.addSystemMessage(systemMessage);
    }
  }

  private addSystemMessage(message: string) {
    this.chatHistory.push(new SystemMessage(message));
  }

  // historize new message from the AI
  addAiMessage(message: string) {
    this.chatHistory.push(new AIMessage(message));
  }

  addHumanMessage(message: string) {
    this.chatHistory.push(new HumanMessage(message));
  }
}
