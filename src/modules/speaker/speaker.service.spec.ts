import { Test, TestingModule } from '@nestjs/testing';
import { SpeakerService } from './speaker.service';
import { ChatSecurityService } from '../chat/chat-security/chat-security.service';
import { ChatGptApiService } from '../openai/chat-gpt-api/chat-gpt-api.service';
import { TextToSpeechService } from '../openai/text-to-speech/text-to-speech.service';
import { InternalServerErrorException } from '@nestjs/common';
import { AxiosRequestHeaders } from 'axios';

// Mock the environment variables
process.env.ORGANIZATION_ID = 'mock-organization-id';
process.env.OPENAI_API_KEY = 'mock-api-key';

jest.mock('fs');
jest.mock('path', () => ({
  join: jest.fn().mockReturnValue('mock/path/to/speaker.prompt'),
}));
jest.mock('axios');
jest.mock('openai', () => ({
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createTranscription: jest
      .fn()
      .mockResolvedValue({ data: { text: 'mock text' } }),
  })),
  Configuration: jest.fn(),
}));
jest.mock('../openai/chat-gpt-api/chat-gpt-api.service', () => ({
  ChatGptApiService: jest.fn().mockImplementation(() => ({
    getAiModelResponseFromUserSession: jest.fn().mockResolvedValue({
      aiMessage: 'mock AI response',
    }),
  })),
}));
jest.mock('../openai/text-to-speech/text-to-speech.service', () => ({
  TextToSpeechService: jest.fn().mockImplementation(() => ({
    textToSpeech: jest.fn().mockResolvedValue({
      data: 'mock audio stream',
    }),
  })),
}));
jest.mock('../chat/chat-security/chat-security.service', () => ({
  ChatSecurityService: jest.fn().mockImplementation(() => ({
    controleMessage: jest.fn().mockResolvedValue(true),
  })),
}));

describe('SpeakerService', () => {
  let service: SpeakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeakerService,
        // Use the actual classes here as they are already being mocked above
        ChatGptApiService,
        TextToSpeechService,
        ChatSecurityService,
      ],
    }).compile();

    service = module.get<SpeakerService>(SpeakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
  describe('loadPromptFile', () => {
    it('should read and return the content of the speaker.prompt file', async () => {
      const mockFileContent = 'Test prompt content';
      require('fs').readFileSync.mockReturnValue(mockFileContent);

      expect(service['loadPromptFile']()).toBe(mockFileContent);
      expect(require('fs').readFileSync).toHaveBeenCalledWith(
        expect.any(String),
        'utf8',
      );
    });

    it('should throw an InternalServerErrorException if the file cannot be read', async () => {
      require('fs').readFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      expect(() => service['loadPromptFile']()).toThrow(
        InternalServerErrorException,
      );
    });

    describe('getSystemMessageWithPersonality', () => {
      it('should replace placeholders with username and personality description', async () => {
        jest
          .spyOn(service, 'loadPromptFile')
          .mockReturnValue(
            'Hello ###USERNAME###, your personality is ###PERSONALITY###.',
          );

        const result = service.getSystemMessageWithPersonality(
          'John',
          'friendly',
        );

        expect(result).toContain('John');
        expect(result).toContain('friendly'); // Make sure you adjust this to match the actual expected output based on your implementation
      });
    });

    describe('getAiResponse', () => {
      it('should return the AI response if it is acceptable (chatSecurity.controleMessage() return true)', async () => {
        jest
          .spyOn(service['chatService'], 'getAiModelResponseFromUserSession')
          .mockResolvedValue({
            aiMessage: 'Hello, World!',
            userId: 'mockUserId',
            sessionId: 'mockSessionId',
            historyLength: 0,
          });
        jest
          .spyOn(service['chatSecurity'], 'controleMessage')
          .mockResolvedValue(true);

        const response = await service.getAiResponse('uuid123', 'John', {
          message: 'Hi',
        });

        expect(response).toEqual('Hello, World!');
      });

      it('should return an error message if the AI response is not acceptable (chatSecurity.controleMessage() return false)', async () => {
        jest
          .spyOn(service['chatService'], 'getAiModelResponseFromUserSession')
          .mockResolvedValue({
            aiMessage: 'Hello, World!',
            userId: 'mockUserId',
            sessionId: 'mockSessionId',
            historyLength: 0,
          });
        jest
          .spyOn(service['chatSecurity'], 'controleMessage')
          .mockResolvedValue(false);

        const response = await service.getAiResponse('uuid123', 'John', {
          message: 'Hi',
        });

        expect(response).toEqual(
          'we are sorry, an inacceptable message was generated.',
        );
      });
    });

    describe('getSpokenSpeakerResponse', () => {
      const mockAudioData = 'mock audio data';
      it('should return audio stream data', async () => {
        jest.spyOn(service, 'getAiResponse').mockResolvedValue('Hello, World!');
        jest
          .spyOn(service['textToSpeechService'], 'textToSpeech')
          .mockResolvedValue({
            data: mockAudioData,
            status: 200, // Dummy status
            statusText: 'OK', // Dummy statusText
            headers: {}, // Empty headers
            config: { headers: {} as AxiosRequestHeaders }, // Provide a valid AxiosRequestHeaders object
          });

        const response = await service.getSpokenSpeakerResponse(
          'uuid123',
          'John',
          { message: 'Hi', voice: 'Onyx' },
        );

        expect(response).toEqual(mockAudioData);
      });

      // Example for isRecording true
      it('should call storeAudioFile when isRecording is true', async () => {
        // Setup mocks as before
        jest
          .spyOn(service, 'getAiResponse')
          .mockResolvedValue('Valid response');
        jest
          .spyOn(service['textToSpeechService'], 'textToSpeech')
          .mockResolvedValue({
            data: mockAudioData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as AxiosRequestHeaders }, // Corrected mock to include headers in config
          });

        // Mock storeAudioFile to just be a spy since its functionality is not under test here
        const storeAudioFileSpy = jest
          .spyOn(service, 'storeAudioFile')
          .mockImplementation();

        // Perform the test
        await service.getSpokenSpeakerResponse(
          'uuid123',
          'John',
          { message: 'Hi', voice: 'Shimmer' },
          true, // isRecording is true
        );

        // Verify storeAudioFile was called
        expect(storeAudioFileSpy).toHaveBeenCalled();
      });
    });
  });
});
