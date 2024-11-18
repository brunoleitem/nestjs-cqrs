import { Module } from "@nestjs/common";
import { JwtModule } from "@src/shared/module/auth/jwt-module";
import { HttpClientModule } from "@src/shared/module/http-client/http-client.module";
import { TemplatesService } from "./core/templates.service";
import { TemplatesController } from "./http/rest/templates.controller";

@Module({
    imports: [
        HttpClientModule,
        JwtModule.forRoot(),
    ],
    controllers: [TemplatesController],
    providers: [TemplatesService],
})

export class WhatsappExternalModule { }