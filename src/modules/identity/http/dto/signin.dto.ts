import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
