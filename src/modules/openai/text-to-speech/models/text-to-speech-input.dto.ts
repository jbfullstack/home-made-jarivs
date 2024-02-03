import { IsNotEmpty, IsString } from 'class-validator';

export class TextToSpeechInputDto {
  @IsString()
  @IsNotEmpty()
  input: string;

  @IsString()
  @IsNotEmpty()
  voice: string;
}
