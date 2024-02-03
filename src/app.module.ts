import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SpeakerModule } from './modules/speaker/speaker.module';
import { SpeechToTextService } from './modules/openai/speech-to-text/speech-to-text.service';

@Module({
  imports: [ConfigModule.forRoot(), SpeakerModule],
  controllers: [AppController],
  providers: [AppService, SpeechToTextService],
})
export class AppModule {}
