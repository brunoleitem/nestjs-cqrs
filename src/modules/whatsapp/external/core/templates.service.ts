import { Injectable } from '@nestjs/common'
import { TwilioHeaders } from '@src/shared/infra/twilio/twilio-decorators'
import { HttpClient } from '@src/shared/module/http-client/client/http.client'
import { SubmitTemplateDTO } from '../http/dto/request/submit-template.dto'

@Injectable()
// Exemplo com credentials em headers
export class TemplatesService {
  constructor(private readonly httpClient: HttpClient) {}
  async submit(sid: string, body: SubmitTemplateDTO, headers: TwilioHeaders) {
    return await this.httpClient.post(
      `https://content.twilio.com/v1/Content/${sid}/ApprovalRequests/whatsapp`,
      body,
      {
        auth: {
          username: headers.accountSid,
          password: headers.authToken
        }
      }
    )
  }

  async getTemplateStatus(sid: string, headers: TwilioHeaders) {
    return await this.httpClient.get(
      `https://content.twilio.com/v1/Content/${sid}/ApprovalRequests`,
      {
        auth: {
          username: headers.accountSid,
          password: headers.authToken
        }
      }
    )
  }
}
