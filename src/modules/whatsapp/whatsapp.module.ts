import { Module } from "@nestjs/common";

import { WhatsappExternalModule } from "./external/whatsapp-external.module";
import { WhatsappInternalModule } from "./internal/whatsapp-internal.module";

@Module({
    imports: [
        WhatsappExternalModule,
        WhatsappInternalModule
    ]
})
export class WhatsappModule { }