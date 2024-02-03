import { ChatSession } from './chat-session';
import {
  ForbiddenException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const base_10 = 10;

export class ChatHistoryManager {
  private readonly logger: Logger = new Logger(ChatHistoryManager.name);
  private readonly chatSessions: ChatSession[] = [];
  private readonly MAX_SESSION_BY_USER = parseInt(
    process.env.MAX_SESSION_BY_USER,
    base_10,
  );

  //
  createChatSession(
    username: string,
    sessionName: string,
    systemMessage?: string,
  ): ChatSession {
    const userSessions = this.chatSessions.filter(
      (session) => session.username === username,
    );

    if (userSessions.length >= this.MAX_SESSION_BY_USER) {
      throw new UnauthorizedException('Maximum session limit reached for user');
    }

    const newSession = new ChatSession(username, sessionName, systemMessage);
    this.chatSessions.push(newSession);
    return newSession;
  }

  // delete a chat session by uuid and username
  deleteChatSession(uuid: string, username: string) {
    const sessionIndex = this.chatSessions.findIndex(
      (session) => session.uuid === uuid,
    );
    if (sessionIndex === -1) {
      throw new NotFoundException(`ChatSession ${uuid} does not exist`);
    }

    console.log(`DA`);
    if (this.chatSessions[sessionIndex].username !== username) {
      throw new ForbiddenException(
        `${username} is not the owener of chatSession ${uuid}`,
      );
    }

    this.chatSessions.splice(sessionIndex, 1);
  }

  // get a chat session by uuid
  getChatSession(uuid: string, username: string): ChatSession {
    const foundSession = this.chatSessions.find(
      (session) => session.uuid === uuid,
    );
    if (!foundSession) {
      throw new NotFoundException(`ChatSession ${uuid} does not exist`);
    }

    if (foundSession.username !== username) {
      throw new ForbiddenException(
        `${username} is not the owener of chatSession ${uuid}`,
      );
    }

    return foundSession;
  }

  // get all chat sessions for a user
  getChatSessionsList(
    userId: string,
  ): { uuid: string; sessionName: string; historyLength: number }[] {
    return this.chatSessions
      .filter((session) => session.username === userId)
      .map((session) => ({
        uuid: session.uuid,
        sessionName: session.sessionName,
        username: session.username,
        historyLength: session.chatHistory.length,
      }));
  }
}
