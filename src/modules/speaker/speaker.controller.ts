import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';

import { Response } from 'express';

import {
  TextChatWithSpeakerInputDTO,
  CreateSpeakerSessionInputDTO,
  VerbalChatWithSpeakerInputDTO,
} from './model/speaker.dto';
import { ChatGptApiService } from '../openai/chat-gpt-api/chat-gpt-api.service';
import { SessionType } from '../openai/chat-gpt-api/model/chat-session-response.interface';
import { DeleteSessionInputDto } from '../openai/chat-gpt-api/model/chat-gpt.dto';

//! TODO : Secure endpoints
@Controller('ai-speaker')
export class SpeakerController {
  constructor(
    private readonly speakerService: SpeakerService,
    private readonly gptService: ChatGptApiService,
  ) {}

  @HttpCode(201)
  @Post('/start-session')
  createNewSession(
    @Body(new ValidationPipe({ transform: true }))
    data: CreateSpeakerSessionInputDTO,
  ) {
    const sessionData = this.speakerService.buildSessionData(data);
    return this.gptService.startNewSession(sessionData);
  }

  @HttpCode(204)
  @Delete('/:sessionId')
  async deleteSession(
    @Param('sessionId') sessionId,
    @Body(new ValidationPipe({ transform: true }))
    data: DeleteSessionInputDto,
  ) {
    this.gptService.deleteSession(sessionId, data.username);
  }

  @HttpCode(200)
  @Get('/user/:userId/sessions')
  getSessionsList(@Param('userId') userId): SessionType[] {
    const sessionIds = this.gptService.getSessionsList(userId);
    return sessionIds;
  }

  @HttpCode(201)
  @Post('/user/:user/verbal-chatting/:chatSessionId')
  async verbalChatting(
    @Param('user') username,
    @Param('chatSessionId') uuid,
    @Body(new ValidationPipe({ transform: true }))
    data: VerbalChatWithSpeakerInputDTO,
    @Res() res: Response,
  ) {
    const audioStream = await this.speakerService.getSpokenSpeakerResponse(
      uuid,
      username,
      data,
    );

    res.setHeader('Content-Type', 'audio/mpeg; charset=binary');
    res.charset = 'binary';
    res.status(HttpStatus.OK);

    audioStream.pipe(res);
  }

  @HttpCode(201)
  @Post('/user/:user/text-chatting/:chatSessionId')
  async textChatting(
    @Param('user') username,
    @Param('chatSessionId') uuid,
    @Body(new ValidationPipe({ transform: true }))
    data: TextChatWithSpeakerInputDTO,
  ) {
    const speakerAnswer = await this.speakerService.getWrittenSpeakerResponse(
      uuid,
      username,
      data,
    );

    return {
      message: speakerAnswer,
    };
  }
}
