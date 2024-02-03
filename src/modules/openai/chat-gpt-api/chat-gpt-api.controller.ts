import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChatGptApiService } from './chat-gpt-api.service';
import {
  CreateSessionInputDto,
  GetChatGptInputDTO,
} from './model/chat-gpt.dto';

//! TODO : Secure endpoints

@Controller('chat-gpt-api')
export class ChatGptApiController {
  private readonly logger: Logger = new Logger(ChatGptApiController.name);
  constructor(private readonly service: ChatGptApiService) {}

  @HttpCode(201)
  @Post('/start-session')
  createNewSession(
    @Body(new ValidationPipe({ transform: true }))
    data: CreateSessionInputDto,
  ) {
    return this.service.startNewSession(data);
  }

  @HttpCode(200)
  @Post('/user/:user/chat-session/:chatSessionId')
  getChatCompletionMessageFromUserSession(
    @Param('user') username,
    @Param('chatSessionId') uuid,
    @Body(new ValidationPipe({ transform: true }))
    data: GetChatGptInputDTO,
  ) {
    return this.service.getAiModelResponseFromUserSession(uuid, username, data);
  }

  @HttpCode(200)
  @Get('/user/:userId/sessions')
  getSessionsList(@Param('userId') userId) {
    const sessionIds = this.service.getSessionsList(userId);
    return sessionIds;
  }
}
