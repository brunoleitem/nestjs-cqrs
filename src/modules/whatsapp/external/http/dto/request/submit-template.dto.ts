import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export class SubmitTemplateDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsEnum(['UTILITY', 'MARKETING', 'AUTHENTICATION'])
  @IsNotEmpty()
  readonly category: string
}
