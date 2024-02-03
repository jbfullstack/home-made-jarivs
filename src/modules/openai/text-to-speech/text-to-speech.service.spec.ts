import { Test, TestingModule } from '@nestjs/testing';
import { TextToSpeechService } from './text-to-speech.service';

describe('TextToSpeechService', () => {
  let service: TextToSpeechService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextToSpeechService],
    }).compile();

    service = module.get<TextToSpeechService>(TextToSpeechService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
