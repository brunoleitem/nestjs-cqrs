import { Injectable } from '@nestjs/common'
import { Twilio } from 'twilio'
import { Types } from 'twilio/lib/rest/content/v1/content'

@Injectable()
export class TwilioClient {
  constructor(private readonly client: Twilio) {}

  async getAccount(accountName: string) {
    return await this.client.api.v2010.accounts.list({
      friendlyName: accountName
    })
  }

  async createSubAccount(accountName: string) {
    return await this.client.api.v2010.accounts.create({
      friendlyName: accountName
    })
  }

  /* Enviar com body causa um erro 63016
    Em caso de whatsapp deve enviar com template.
    */
  async sendMessage(_body: string, _from: string, _to: string, _sid: string) {
    return await this.client.content.v2.contentAndApprovals.list()
    // return await this.client.messages.create({ body, from: `whatsapp:${from}`, to: `whatsapp:${to}` })
  }

  async createTemplate(
    type: Types,
    friendlyName: string,
    variables: { [key: string]: string }
  ) {
    return await this.client.content.v1.contents.create({
      language: 'en',
      types: type,
      friendly_name: friendlyName,
      variables: variables
    })
  }

  async deleteTemplate(sid: string) {
    return await this.client.content.v1.contents(sid).remove()
  }

  async listTemplates() {
    return await this.client.content.v2.contents.list()
  }
}
