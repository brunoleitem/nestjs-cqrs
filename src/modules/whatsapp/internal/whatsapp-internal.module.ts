import { Module } from "@nestjs/common";
import { ConfigModule } from "@src/shared/module/config/config-module";
import { HttpClientModule } from "@src/shared/module/http-client/http-client.module";
import { JwtModule } from "@src/shared/module/auth/jwt-module";
import { AccountsController } from "./http/rest/accounts.controller";
import { AccountsService } from "./core/accounts.service";
import { TemplatesService } from "./core/template.service";
import { TwilioProvider } from "../infra/twilio.provider";
import { TwilioClient } from "../infra/twilio.client";
import { TemplatesController } from "./http/rest/templates.controller";
@Module({
    imports: [ConfigModule.forRoot(), HttpClientModule, JwtModule.forRoot()],
    controllers: [AccountsController, TemplatesController],
    providers: [AccountsService, TemplatesService, TwilioProvider, TwilioClient],
})

export class WhatsappInternalModule { }