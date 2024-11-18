import { Module } from '@nestjs/common'
import { JwtModule } from '@src/shared/module/auth/jwt-module'
import { ConfigModule } from '@src/shared/module/config/config-module'
import { HttpClientModule } from '@src/shared/module/http-client/http-client.module'
import { TwilioClient } from '../../../shared/infra/twilio/twilio.client'
import { TwilioProvider } from '../../../shared/infra/twilio/twilio.provider'
import { AccountsService } from './core/accounts.service'
import { TemplatesService } from './core/template.service'
import { AccountsController } from './http/rest/accounts.controller'
import { TemplatesController } from './http/rest/templates.controller'
@Module({
  imports: [ConfigModule.forRoot(), HttpClientModule, JwtModule.forRoot()],
  controllers: [AccountsController, TemplatesController],
  providers: [AccountsService, TemplatesService, TwilioProvider, TwilioClient]
})
export class WhatsappInternalModule {}
