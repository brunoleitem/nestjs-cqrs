import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAccountDTO {
  @IsString()
  @IsNotEmpty()
  readonly accountName: string
}
