import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { TemplatesService } from '../../core/template.service'
import { CreateTemplateDTO } from '../dto/request/create-template.dto'
import { CreateTemplateResponseDTO } from '../dto/response/create-template-response.dto'

@Controller('whatsapp/internal/template')
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @Get()
  async listTemplate() {
    return await this.service.listTemplates()
  }

  @Post()
  async createTemplate(
    @Body() body: CreateTemplateDTO
  ): Promise<CreateTemplateResponseDTO> {
    return await this.service.createTemplate(body)
  }

  @Delete('/:sid')
  async deleteTemplate(@Param('sid') sid: string) {
    return await this.service.deleteTemplate(sid)
  }
}
