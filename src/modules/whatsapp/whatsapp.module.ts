import { Module } from "@nestjs/common";
import { ConfigModule } from "@src/shared/module/config/config-module";
import { HttpClientModule } from "@src/shared/module/http-client/http-client.module";
import { ExternalController } from "./http/rest/external/external.controller";
import { JwtModule } from "@src/shared/module/auth/jwt-module";
import { ExternalAccountsService } from "./core/external/accounts.service";
import { InternalAccountsService } from "./core/internal/internal.accounts.service";
import { InternalAccountsController } from "./http/rest/internal/accounts.controller";
import { TwilioClient } from "./infra/twilio.client";
import { InternalTemplateService } from "./core/internal/internal.template.service";
import { InternalTemplateController } from "./http/rest/internal/template.controller";
import { TwilioProvider } from "./infra/twilio.provider";

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot(),
    ],
    controllers: [
        ExternalController,
        InternalAccountsController,
        InternalTemplateController
    ],
    providers: [
        ExternalAccountsService,
        InternalAccountsService,
        InternalTemplateService,
        TwilioClient,
        TwilioProvider],
    exports: []
})
export class WhatsappModule { }