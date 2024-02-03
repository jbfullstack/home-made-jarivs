import { IsNotEmpty, IsString } from 'class-validator';

export class ControlInputDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
