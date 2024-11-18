import { Injectable } from "@nestjs/common";
import { ConfigService } from "@src/shared/module/config/config-service";
import { HttpClient } from "@src/shared/module/http-client/client/http.client";

@Injectable()
export class ExternalAccountsService {
    constructor(private readonly configService: ConfigService, private readonly httpClient: HttpClient) { }

    async getAccounts() {
        return await this.httpClient.get('https://api.twilio.com/2010-04-01/Accounts.json', {
            auth: this.getTwilioCredentials()
        });
    }
    // Exemplo com credentials em ENV
    private getTwilioCredentials() {
        return {
            username: this.configService.get('twilio_account_sid'),
            password: this.configService.get('twilio_auth_token')
        }
    }
}