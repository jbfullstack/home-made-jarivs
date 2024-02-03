import { Injectable, Logger } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import {
  CreateSessionInputDto,
  GetChatGptInputDTO,
  GetChatGptOutputDTO,
} from './model/chat-gpt.dto';
import { SessionType } from './model/chat-session-response.interface';
import { ChatOpenaiConnectorService } from '../chat-openai-connector/chat-openai-connector.service';

@Injectable()
export class ChatGptApiService {
  private readonly logger: Logger = new Logger(ChatGptApiService.name);
  private readonly chatHistory: ChatHistoryManager;
  private readonly chat: ChatOpenaiConnectorService;

  constructor() {
    this.chatHistory = new ChatHistoryManager();
    this.chat = new ChatOpenaiConnectorService();
  }

  async startNewSession(data: CreateSessionInputDto) {
    let session = this.chatHistory.createChatSession(
      data.username,
      data.sessionName,
      data.systemMessage,
    );
    return {
      sessionId: session.uuid,
    };
  }

  deleteSession(uuid: string, username: string) {
    this.chatHistory.deleteChatSession(uuid, username);
  }

  async getAiModelResponseFromUserSession(
    uuid: string,
    username: string,
    data: GetChatGptInputDTO,
  ) {
    let userSession = this.chatHistory.getChatSession(uuid, username);

    // update chat history with human data
    userSession.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(userSession.chatHistory);

    const aiMessage = result.content.toString();
    // Store to rember in next iteration
    userSession.addAiMessage(aiMessage);

    return {
      userId: userSession.username,
      sessionId: userSession.sessionName,
      historyLength: userSession.chatHistory.length,
      ...GetChatGptOutputDTO.getInstance(aiMessage),
    };
  }

  getSessionsList(userId: string): SessionType[] {
    return this.chatHistory.getChatSessionsList(userId);
  }
}
