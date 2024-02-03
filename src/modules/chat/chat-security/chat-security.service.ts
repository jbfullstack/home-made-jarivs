import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ChatSingleSession } from '../chat-single-session';
import { ChatOpenaiConnectorService } from '../../openai/chat-openai-connector/chat-openai-connector.service';

@Injectable()
export class ChatSecurityService {
  private readonly logger: Logger = new Logger(ChatSecurityService.name);
  private readonly chatSecurityHistory: ChatSingleSession;
  private readonly chatGptConnector: ChatOpenaiConnectorService;

  constructor() {
    this.chatSecurityHistory = new ChatSingleSession(
      this.loadPromptFile(),
      'security-session',
    );
    this.chatGptConnector = new ChatOpenaiConnectorService();
  }

  private loadPromptFile(): string {
    let filePath = path.join(
      process.cwd(),
      'src',
      'modules',
      'chat',
      'chat-security',
      'prompt',
      'security.prompt',
    );

    try {
      return readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new InternalServerErrorException(
        `ChatSecurityService can't load security prompt: ${error}`,
      );
    }
  }

  // control the message and return true if the message is OK
  async controleMessage(message: string): Promise<boolean> {
    this.chatSecurityHistory.addSingleMessage(message);
    const result = await this.chatGptConnector.predictMessages(
      this.chatSecurityHistory.chatHistory,
    );

    const aiMessage = result.content;
    if (aiMessage === 'Security Check Passed: OK.') {
      return true;
    } else {
      this.logger.error(`Security control failed: \n > ${aiMessage}`);
      return false;
    }
  }
}
