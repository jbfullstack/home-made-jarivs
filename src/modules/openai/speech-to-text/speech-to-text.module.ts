import { Module } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text.service';

@Module({})
export class SpeechToTextModule {
  providers: [SpeechToTextService];
  export: [SpeechToTextService];
}
