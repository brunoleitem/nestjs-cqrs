import { Injectable } from '@nestjs/common'
import { TwilioClient } from '../../../../shared/infra/twilio/twilio.client'
import { CreateTemplateDTO } from '../http/dto/request/create-template.dto'
import { CreateTemplateResponseDTO } from '../http/dto/response/create-template-response.dto'

@Injectable()
export class TemplatesService {
  constructor(private readonly client: TwilioClient) {}

  async listTemplates() {
    return await this.client.listTemplates()
  }

  async createTemplate(
    body: CreateTemplateDTO
  ): Promise<CreateTemplateResponseDTO> {
    const createdTemplate = await this.client.createTemplate(
      body.template,
      body.friendlyName,
      body.variables
    )
    return {
      sid: createdTemplate.sid
    }
  }

  async getTemplate(sid: string) {
    return await this.client.getTemplate(sid)
  }

  async deleteTemplate(sid: string) {
    return await this.client.deleteTemplate(sid)
  }
}
