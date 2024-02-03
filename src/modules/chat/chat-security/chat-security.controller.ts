import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ChatSecurityService } from './chat-security.service';
import { ControlInputDto } from './model/controle.dto';

@Controller('chat-security')
export class ChatSecurityController {
  private readonly logger: Logger = new Logger(ChatSecurityController.name);
  constructor(private readonly service: ChatSecurityService) {}

  @HttpCode(201)
  @Post('/control-message')
  controlMessage(
    @Body(new ValidationPipe({ transform: true }))
    data: ControlInputDto,
  ) {
    this.logger.log(`controlMessage: ${data.message}`);
    return this.service.controleMessage(data.message);
  }
}
