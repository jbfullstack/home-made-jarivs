import { Test, TestingModule } from '@nestjs/testing';
import { ChatSecurityService } from './chat-security.service';

describe('ChatSecurityService', () => {
  let service: ChatSecurityService;

  beforeEach(async () => {
    process.env.OPENAI_API_KEY = 'fake_api_key';
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSecurityService],
    }).compile();

    service = module.get<ChatSecurityService>(ChatSecurityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
