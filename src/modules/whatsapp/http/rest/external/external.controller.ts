import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@src/shared/http/guards/auth-guard";
import { ExternalAccountsService } from "../../../core/external/accounts.service";
import { ExternalTemplatesService } from "@src/modules/whatsapp/core/external/templates.service";
import { TwilioHeaders } from "@src/modules/whatsapp/infra/twilio-decorators";

@Controller("whatsapp/external")
export class ExternalController {
    constructor(private readonly templatesService: ExternalTemplatesService) { }


    @Post('templates/submit/:sid')
    @HttpCode(HttpStatus.CREATED)
    async submitTemplate(@Param("sid") sid: string, @TwilioHeaders() headers: TwilioHeaders) {
        return this.templatesService.submit(sid, headers)
    }
}