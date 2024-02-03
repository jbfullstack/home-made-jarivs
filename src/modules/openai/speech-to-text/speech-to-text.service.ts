import { Injectable, Logger } from '@nestjs/common';
import { OpenAIApi, Configuration } from 'openai';

@Injectable()
export class SpeechToTextService {
  private readonly logger: Logger = new Logger(SpeechToTextService.name);
  private readonly openAiApi: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async speechToText(audioStream): Promise<string> {
    const {
      data: { text },
    } = await this.openAiApi.createTranscription(audioStream.data, 'whisper-1');
    return text;
  }
}
