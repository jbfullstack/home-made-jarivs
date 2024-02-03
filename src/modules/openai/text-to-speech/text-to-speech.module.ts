import { Module } from '@nestjs/common';
import { TextToSpeechService } from './text-to-speech.service';

@Module({
  providers: [TextToSpeechService],
  exports: [TextToSpeechService],
})
export class TextToSpeechModule {}
