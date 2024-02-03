import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { ChatGptApiModule } from 'src/modules/openai/chat-gpt-api/chat-gpt-api.module';
import { TextToSpeechModule } from 'src/modules/openai/text-to-speech/text-to-speech.module';
import { ChatSecurityModule } from '../chat/chat-security/chat-security.module';

@Module({
  imports: [TextToSpeechModule, ChatGptApiModule, ChatSecurityModule],
  providers: [SpeakerService],
  controllers: [SpeakerController],
})
export class SpeakerModule {}
