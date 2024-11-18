import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common'
import { TemplatesService } from '@src/modules/whatsapp/external/core/templates.service'
import { TwilioHeaders } from '@src/shared/infra/twilio/twilio-decorators'
import { SubmitTemplateDTO } from '../dto/request/submit-template.dto'

@Controller('whatsapp/external')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post('templates/submit/:sid')
  @HttpCode(HttpStatus.CREATED)
  async submitTemplate(
    @Param('sid') sid: string,
    @TwilioHeaders() headers: TwilioHeaders,
    @Body() body: SubmitTemplateDTO
  ) {
    return this.templatesService.submit(sid, body, headers)
  }

  @Get('templates/status/:sid')
  @HttpCode(HttpStatus.OK)
  async getTemplateStatus(
    @Param('sid') sid: string,
    @TwilioHeaders() headers: TwilioHeaders
  ) {
    return this.templatesService.getTemplateStatus(sid, headers)
  }
}
