import { Injectable } from '@nestjs/common'
import { TwilioClient } from '../../../../shared/infra/twilio/twilio.client'
import { CreateAccountDTO } from '../http/dto/request/create-account.dto'
import { GetAccountDTO } from '../http/dto/response/get-accounts.dto'

@Injectable()
export class AccountsService {
  constructor(private readonly client: TwilioClient) {}

  async getAccount(
    accountName: string
  ): Promise<GetAccountDTO | GetAccountDTO[]> {
    const acc = await this.client.getAccount(accountName)
    if (acc) {
      return acc.map((account) => {
        return {
          authToken: account.authToken,
          friendlyName: account.friendlyName,
          ownerAccountSid: account.ownerAccountSid,
          sid: account.sid,
          status: account.status
        }
      })
    }
  }

  async createSubAccount(accountDTO: CreateAccountDTO) {
    return await this.client.createSubAccount(accountDTO.accountName)
  }
}
