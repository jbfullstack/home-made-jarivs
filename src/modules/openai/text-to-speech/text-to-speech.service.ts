import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { TTSVoice } from './struct/tts-voice';

@Injectable()
export class TextToSpeechService {
  private readonly logger: Logger = new Logger(TextToSpeechService.name);
  private readonly ttsVoice = TTSVoice.getInstance();

  async textToSpeech(text: string, voice: string) {
    const url = `${process.env.OPEN_API__TEXT_TO_SPEECH_URL}`;
    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const data = {
      model: 'tts-1',
      input: text,
      voice: this.ttsVoice.getVoiceName(voice),
      response_format: 'mp3',
    };

    try {
      const response = await axios.post(url, data, {
        headers,
        responseType: 'stream',
      });

      return response;
    } catch (error) {
      this.logger.error(`Error in convertTextToSpeech: ${error.message}`);
      throw error;
    }
  }
}
