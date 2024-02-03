import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpeakerSessionInputDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  sessionName: string;

  @IsString()
  @IsNotEmpty()
  personality: string;
}

export class TextChatWithSpeakerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class VerbalChatWithSpeakerInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  voice: string;
}
