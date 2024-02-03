import { Test, TestingModule } from '@nestjs/testing';
import { SpeechToTextService } from './speech-to-text.service';

describe('SpeechToTextService', () => {
  let service: SpeechToTextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeechToTextService],
    }).compile();

    service = module.get<SpeechToTextService>(SpeechToTextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
