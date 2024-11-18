import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
export class GetAccountDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly authToken: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly friendlyName: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly ownerAccountSid: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly sid: string

  @IsString()
  @IsNotEmpty()
  @Expose()
  readonly status: string
}
